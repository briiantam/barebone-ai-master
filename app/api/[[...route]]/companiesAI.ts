import { z } from "zod";
import { Hono } from "hono";
import { and, eq, inArray } from "drizzle-orm";
import { createId } from "@paralleldrive/cuid2";
import { zValidator } from "@hono/zod-validator";
import { clerkMiddleware, getAuth } from "@hono/clerk-auth";

import { db } from "@/db/drizzle";
import {
  companies,
  companiesAI,
  insertCompanySchema,
  insertCompanyAISchema,
} from "@/db/schema";

import OpenAI from "openai";
import { GenerateAISummary } from "@/features/companiesAI/api/company-profile-AI/company-AI-call";
// import { UseWebScraper } from "@/features/companiesAI/api/company-profile-AI/use-web-scraper";
import { promisify } from "util";
import { exec } from "child_process";

const execAsync = promisify(exec);

function parseAISummary(summary: string) {
  const parsed: { [key: string]: string } = {};

  const keys = [
    "coIndustry1",
    "coIndustry2",
    "coIndustry3",
    "coOneLiner",
    "coTargetRegion",
    "coTargetMarket",
    "coDescription1",
    "coDescription2",
    "coDescription3",
    "coTargetCustomerProfile",
    "coCustomerProblem1",
    "coCustomerProblem2",
    "coCustomerProblem3",
    "coMarketSize",
    "coMarketLandscape",
    "coProduct1",
    "coProduct2",
    "coProduct3",
    "coDifferentation1",
    "coDifferentation2",
    "coDifferentation3",
    "coAdditionalNotes",
  ];

  keys.forEach((key) => {
    const regex = new RegExp(`${key}:\\s*([^\\n]+)`, "g");
    const match = regex.exec(summary);
    if (match) {
      parsed[key] = match[1].trim();
    }
  });

  return parsed;
}

const app = new Hono()
  .get("/", clerkMiddleware(), async (c) => {
    const auth = getAuth(c);

    if (!auth?.userId) {
      return c.json({ error: "Unauthorized" }, 401);
    }

    const data = await db
      .select({
        id: companiesAI.id,
        userId: companiesAI.userId,
        companyId: companiesAI.companyId,
        coSummary: companiesAI.coSummary,
      })
      .from(companiesAI)
      .where(eq(companiesAI.userId, auth.userId));

    return c.json({ data });
  })
  .get(
    "/:id",
    zValidator(
      "param",
      z.object({
        id: z.string().optional(),
      })
    ),
    clerkMiddleware(),
    async (c) => {
      const auth = getAuth(c);
      const { id } = c.req.valid("param");

      if (!id) {
        return c.json({ error: "Missing ID" }, 400);
      }

      if (!auth?.userId) {
        return c.json({ error: "Unauthorized" }, 401);
      }

      const [data] = await db
        .select({
          id: companiesAI.id,
          userId: companiesAI.userId,
          companyId: companiesAI.companyId,
          coSummary: companiesAI.coSummary,
        })
        .from(companiesAI)
        .where(
          and(eq(companiesAI.userId, auth.userId), eq(companiesAI.id, id))
        );

      if (!data) {
        return c.json({ error: "Not found" }, 404);
      }

      return c.json({ data });
    }
  )
  .post(
    "/",
    clerkMiddleware(),
    zValidator(
      "json",
      insertCompanyAISchema.omit({
        id: true,
        userId: true,
      })
    ),
    async (c) => {
      const auth = getAuth(c);
      const values = c.req.valid("json");

      if (!auth?.userId) {
        return c.json({ error: "Unauthorized" }, 401);
      }

      const [data] = await db
        .insert(companiesAI)
        .values({
          id: createId(),
          userId: auth.userId,
          ...values, // Ensure values does not include id and userId
        })
        .returning();

      return c.json({ data });
    }
  )

  .post(
    "/analyze",
    clerkMiddleware(),
    zValidator(
      "json",
      z.object({
        companyId: z.string(),
      })
    ),
    async (c) => {
      const auth = getAuth(c);
      const { companyId } = c.req.valid("json");
      const openai = new OpenAI({
        apiKey: process.env.OPENAI_API_KEY,
      });
      const { messages } = await c.req.json();

      if (!auth?.userId) {
        return c.json({ error: "Unauthorized" }, 403);
      }

      if (!openai.apiKey) {
        return c.json({ error: "OpenAI API Key not configured" }, 500);
      }

      try {
        console.log("Fetching company data from database...");

        // Fetch company data
        const [company] = await db
          .select({
            coName: companies.coName,
            coWebsiteUrl: companies.coWebsiteUrl,
            coDescription: companies.coDescription,
            coCountry: companies.coCountry,
            coCity: companies.coCity,
          })
          .from(companies)
          .where(
            and(eq(companies.id, companyId), eq(companies.userId, auth.userId))
          );

        if (!company) {
          return c.json({ error: "Company not found" }, 404);
        }

        const { coName, coWebsiteUrl, coDescription, coCountry, coCity } =
          company;

        console.log("Current working directory:", process.cwd());
        console.log("PATH:", process.env.PATH);
        console.log("Running Python script to analyze company profile...");

        const startTime = Date.now();

        // Run website scraper
        const { stdout: websiteStdout, stderr: websiteStderr } =
          await execAsync(
            `python3 lib/company_profile_AI/main_co_web_scraper.py "${coWebsiteUrl}"`
          );
        const websiteElapsedTime = Date.now() - startTime;
        console.log(`Website scraper execution time: ${websiteElapsedTime} ms`);

        if (websiteStderr) {
          console.error("Error from website scraper:", websiteStderr);
        }
        console.log("Website scraper output:", websiteStdout);
        const companyWebsiteContent = websiteStdout;

        // Run TechCrunch scraper
        const { stdout: techcrunchStdout, stderr: techcrunchStderr } =
          await execAsync(
            `python3 lib/company_profile_AI/main_techcrunch_scraper.py "${coName}"`
          );
        const techcrunchElapsedTime = Date.now() - startTime;
        console.log(
          `TechCrunch scraper execution time: ${techcrunchElapsedTime} ms`
        );

        if (techcrunchStderr) {
          console.error("Error from TechCrunch scraper:", techcrunchStderr);
        }
        console.log("TechCrunch scraper output:", techcrunchStdout);
        const companyArticlesContent = techcrunchStdout;

        console.log("Python scripts completed. Generating AI summary...");

        const summary = await GenerateAISummary(
          coName,
          companyWebsiteContent,
          companyArticlesContent,
          coCountry,
          coCity
        );

        console.log("AI summary generated:", summary);

        console.log("Parsing data...");

        const parsedSummary = parseAISummary(summary);

        console.log("Parsed data:", parsedSummary);

        console.log("Inserting generated summary into database...");

        const [data] = await db
          .insert(companiesAI)
          .values({
            id: createId(),
            userId: auth.userId,
            companyId: companyId,
            coIndustry1: parsedSummary.coIndustry1 || "",
            coIndustry2: parsedSummary.coIndustry2 || "",
            coIndustry3: parsedSummary.coIndustry3 || "",
            coOneLiner: parsedSummary.coOneLiner || "",
            coTargetRegion: parsedSummary.coTargetRegion || "",
            coTargetMarket: parsedSummary.coTargetMarket || "",
            coDescription1: parsedSummary.coDescription1 || "",
            coDescription2: parsedSummary.coDescription2 || "",
            coDescription3: parsedSummary.coDescription3 || "",
            coTargetCustomerProfile:
              parsedSummary.coTargetCustomerProfile || "",
            coCustomerProblem1: parsedSummary.coCustomerProblem1 || "",
            coCustomerProblem2: parsedSummary.coCustomerProblem2 || "",
            coCustomerProblem3: parsedSummary.coCustomerProblem3 || "",
            coMarketSize: parsedSummary.coMarketSize || "",
            coMarketLandscape: parsedSummary.coMarketLandscape || "",
            coProduct1: parsedSummary.coProduct1 || "",
            coProduct2: parsedSummary.coProduct2 || "",
            coProduct3: parsedSummary.coProduct3 || "",
            coDifferentation1: parsedSummary.coDifferentation1 || "",
            coDifferentation2: parsedSummary.coDifferentation2 || "",
            coDifferentation3: parsedSummary.coDifferentation3 || "",
            coAdditionalNotes: parsedSummary.coAdditionalNotes || "",
            coSummary: summary,
          })
          .returning();

        console.log("Data inserted successfully.");

        return c.json({ data });
      } catch (error) {
        console.error("Error analyzing company:", error);
        return c.json({ error: "Failed to analyze company" }, 500);
      }
    }
  )

  .post(
    "/bulk-delete",
    clerkMiddleware(),
    zValidator(
      "json",
      z.object({
        ids: z.array(z.string()),
      })
    ),
    async (c) => {
      const auth = getAuth(c);
      const values = c.req.valid("json");

      if (!auth?.userId) {
        return c.json({ error: "Unauthorized" }, 401);
      }

      const data = await db
        .delete(companiesAI)
        .where(
          and(
            eq(companiesAI.userId, auth.userId),
            inArray(companiesAI.id, values.ids)
          )
        )
        .returning({
          id: companiesAI.id,
        });

      return c.json({ data });
    }
  )
  .patch(
    "/:id",
    clerkMiddleware(),
    zValidator(
      "param",
      z.object({
        id: z.string().optional(),
      })
    ),
    zValidator("json", insertCompanyAISchema.partial()),
    async (c) => {
      const auth = getAuth(c);
      const { id } = c.req.valid("param");
      const values = c.req.valid("json");

      if (!id) {
        return c.json({ error: "Missing id" }, 400);
      }

      if (!auth?.userId) {
        return c.json({ error: "Unauthorized" }, 401);
      }

      const [data] = await db
        .update(companiesAI)
        .set(values)
        .where(and(eq(companiesAI.userId, auth.userId), eq(companiesAI.id, id)))
        .returning();

      if (!data) {
        return c.json({ error: "Not found" }, 404);
      }

      return c.json({ data });
    }
  )
  .delete(
    "/:id",
    clerkMiddleware(),
    zValidator(
      "param",
      z.object({
        id: z.string().optional(),
      })
    ),
    async (c) => {
      const auth = getAuth(c);
      const { id } = c.req.valid("param");

      if (!id) {
        return c.json({ error: "Missing id" }, 400);
      }

      if (!auth?.userId) {
        return c.json({ error: "Unauthorized" }, 401);
      }

      const [data] = await db
        .delete(companiesAI)
        .where(and(eq(companiesAI.userId, auth.userId), eq(companiesAI.id, id)))
        .returning({
          id: companiesAI.id,
        });

      if (!data) {
        return c.json({ error: "Not found" }, 404);
      }

      return c.json({ data });
    }
  );

export default app;

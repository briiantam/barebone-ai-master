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
        // Fetch company data
        const [company] = await db
          .select({
            coName: companies.coName,
            coWebsiteUrl: companies.coWebsiteUrl,
          })
          .from(companies)
          .where(
            and(eq(companies.id, companyId), eq(companies.userId, auth.userId))
          );

        if (!company) {
          return c.json({ error: "Company not found" }, 404);
        }

        const { coName, coWebsiteUrl } = company;

        // Create AI prompt with company data
        const aiPrompt = `Company Name: ${coName}\nWebsite: ${coWebsiteUrl}\n\n[Your specific prompt here]`;

        // Generate summary using AI
        const chatCompletion = await openai.chat.completions.create({
          model: "gpt-3.5-turbo",
          messages: [
            {
              role: "system",
              content: "You are an AI that generates company summaries.",
            },
            { role: "user", content: aiPrompt },
          ],
        });

        const summary = chatCompletion.choices[0].message.content;

        // Insert or update company summary in the companiesAI table

        const [data] = await db
          .insert(companiesAI)
          .values({
            id: createId(),
            userId: auth.userId,
            companyId: companyId,
            coSummary: summary,
          })
          .returning();

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

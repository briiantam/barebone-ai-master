import { z } from "zod";
import { Hono } from "hono";
import { and, eq, inArray } from "drizzle-orm";
import { createId } from "@paralleldrive/cuid2";
import { zValidator } from "@hono/zod-validator";
import { clerkMiddleware, getAuth } from "@hono/clerk-auth";

import { db } from "@/db/drizzle";
import { companies, insertCompanySchema } from "@/db/schema";

const app = new Hono()
  .get("/", clerkMiddleware(), async (c) => {
    const auth = getAuth(c);

    if (!auth?.userId) {
      return c.json({ error: "Unauthorized" }, 401);
    }

    const data = await db
      .select({
        id: companies.id,
        coName: companies.coName,
        coWebsiteUrl: companies.coWebsiteUrl,
        coDescription: companies.coDescription,
        coOneLiner: companies.coOneLiner,
        coCountry: companies.coCountry,
        coCity: companies.coCity,
        coProductStatus: companies.coProductStatus,
        coCustomerCount: companies.coCustomerCount,
        coMonthlyRevenue: companies.coMonthlyRevenue,
        coAnnualRevenue: companies.coAnnualRevenue,
        coAnnualExpense: companies.coAnnualExpense,
        coExpectedValuation: companies.coExpectedValuation,
        coFundraisingAmount: companies.coFundraisingAmount,
        coPastFundraisingInfo: companies.coPastFundraisingInfo,
        coFundingRound: companies.coFundingRound,
        coIndustry1: companies.coIndustry1,
        coIndustry2: companies.coIndustry2,
        coIndustry3: companies.coIndustry3,
      })
      .from(companies)
      .where(eq(companies.userId, auth.userId));

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
          id: companies.id,
          coName: companies.coName,
          coWebsiteUrl: companies.coWebsiteUrl,
          coDescription: companies.coDescription,
          coOneLiner: companies.coOneLiner,
          coCountry: companies.coCountry,
          coCity: companies.coCity,
          coProductStatus: companies.coProductStatus,
          coCustomerCount: companies.coCustomerCount,
          coMonthlyRevenue: companies.coMonthlyRevenue,
          coAnnualRevenue: companies.coAnnualRevenue,
          coAnnualExpense: companies.coAnnualExpense,
          coExpectedValuation: companies.coExpectedValuation,
          coFundraisingAmount: companies.coFundraisingAmount,
          coPastFundraisingInfo: companies.coPastFundraisingInfo,
          coFundingRound: companies.coFundingRound,
          coIndustry1: companies.coIndustry1,
          coIndustry2: companies.coIndustry2,
          coIndustry3: companies.coIndustry3,
        })
        .from(companies)
        .where(and(eq(companies.userId, auth.userId), eq(companies.id, id)));

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
      insertCompanySchema.omit({
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
        .insert(companies)
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
        .delete(companies)
        .where(
          and(
            eq(companies.userId, auth.userId),
            inArray(companies.id, values.ids)
          )
        )
        .returning({
          id: companies.id,
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
    zValidator("json", insertCompanySchema.partial()),
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
        .update(companies)
        .set(values)
        .where(and(eq(companies.userId, auth.userId), eq(companies.id, id)))
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
        .delete(companies)
        .where(and(eq(companies.userId, auth.userId), eq(companies.id, id)))
        .returning({
          id: companies.id,
        });

      if (!data) {
        return c.json({ error: "Not found" }, 404);
      }

      return c.json({ data });
    }
  );

export default app;

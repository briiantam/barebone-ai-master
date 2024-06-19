import { pgTable, text, numeric } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

//TODO: add in MRR, ARR, annual expenses, fundraisingamount, founder info

export const accounts = pgTable("accounts", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  userId: text("user_id").notNull(),
  websiteUrl: text("website_url"),
  industry: text("industry"),
  companyDescription: text("company_description"),
  companyOneLiner: text("company_one_liner").notNull(),
  country: text("country").notNull(),
  city: text("city").notNull(),
  logo: text("logo").notNull(),
  productStatus: text("product_status").notNull(),
  customerCount: text("customer_count"),
  revenue: text("revenue"),
  founderName: text("founder_name").notNull(),
  founderTitle: text("founder_title").notNull(),
  founderBio: text("founder_bio").notNull(),
  twitterUrl: text("twitter_url"),
  linkedinUrl: text("linkedin_url"),
  expectedValuation: numeric("expected_valuation"),
  fundraisingDetails: numeric("fundraising_details"),
  pastFundraisingInfo: text("past_fundraising_info"),
  fundingRound: text("funding_round").notNull(),
});

//read more here: https://orm.drizzle.team/docs/zod - there are a lot more functions / modifications here
export const insertAccountSchema = createInsertSchema(accounts);

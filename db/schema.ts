import { pgTable, text, boolean, integer } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

// Read more here: https://orm.drizzle.team/docs/zod - there are a lot more functions / modifications here

// export const accounts = pgTable("accounts", {
//   id: text("id").primaryKey(),
//   name: text("name").notNull(),
//   userId: text("user_id").notNull(),
// });

export const companies = pgTable("companies", {
  id: text("id").primaryKey(),
  userId: text("user_id").notNull(),
  coName: text("co_name").notNull(),
  coWebsiteUrl: text("co_website_url"),
  coNoWebsiteUrl: boolean("co_no_website_url"),
  coIndustry1: text("co_industry_1"),
  coIndustry2: text("co_industry_2"),
  coIndustry3: text("co_industry_3"),
  coDescription: text("co_description"),
  coOneLiner: text("co_one_liner"),
  coCountry: text("co_country").notNull(),
  coCity: text("co_city").notNull(),
  coProductStatus: text("co_product_status"),
  coPreRevenue: boolean("co_pre_revenue"),
  coCustomerCount: text("co_customer_count"),
  coMonthlyRevenue: text("co_monthly_revenue"),
  coAnnualRevenue: text("co_annual_revenue"),
  coAnnualExpense: text("co_annual_expense"),
  founderFirstName1: text("founder_first_name_1"),
  founderLastName1: text("founder_last_name_1"),
  founderTitle1: text("founder_title_1"),
  founderBio1: text("founder_bio_1"),
  founderTwitterUrl1: text("founder_twitter_url_1"),
  founderLinkedinUrl1: text("founder_linkedin_url_1"),
  founderFirstName2: text("founder_first_name_2"),
  founderLastName2: text("founder_last_name_2"),
  founderTitle2: text("founder_title_2"),
  founderBio2: text("founder_bio_2"),
  founderTwitterUrl2: text("founder_twitter_url_2"),
  founderLinkedinUrl2: text("founder_linkedin_url_2"),
  founderFirstName3: text("founder_first_name_3"),
  founderLastName3: text("founder_last_name_3"),
  founderTitle3: text("founder_title_3"),
  founderBio3: text("founder_bio_3"),
  founderTwitterUrl3: text("founder_twitter_url_3"),
  founderLinkedinUrl3: text("founder_linkedin_url_3"),
  founderFirstName4: text("founder_first_name_4"),
  founderLastName4: text("founder_last_name_4"),
  founderTitle4: text("founder_title_4"),
  founderBio4: text("founder_bio_4"),
  founderTwitterUrl4: text("founder_twitter_url_4"),
  founderLinkedinUrl4: text("founder_linkedin_url_4"),
  founderFirstName5: text("founder_first_name_5"),
  founderLastName5: text("founder_last_name_5"),
  founderTitle5: text("founder_title_5"),
  founderBio5: text("founder_bio_5"),
  founderTwitterUrl5: text("founder_twitter_url_5"),
  founderLinkedinUrl5: text("founder_linkedin_url_5"),
  coExpectedValuation: integer("co_expected_valuation"),
  coFundraisingAmount: integer("co_fundraising_amount"),
  coPastFundraisingInfo: text("co_past_fundraising_info"),
  coFundingRound: text("co_funding_round"),
});

export const companiesAI = pgTable("companies_AI", {
  id: text("id").primaryKey(),
  userId: text("user_id").notNull(),
  companyId: text("company_id").references(() => companies.id),
  coIndustry1: text("co_industry_1"),
  coIndustry2: text("co_industry_2"),
  coIndustry3: text("co_industry_3"),
  coOneLiner: text("co_one_liner"),
  coTargetRegion: text("co_target_region"),
  coTargetMarket: text("co_target_market"),
  coDescription1: text("co_description_1"),
  coDescription2: text("co_description_2"),
  coDescription3: text("co_description_3"),
  coTargetCustomerProfile: text("co_target_customer_profile"),
  coCustomerProblem1: text("co_customer_problem_1"),
  coCustomerProblem2: text("co_customer_problem_2"),
  coCustomerProblem3: text("co_customer_problem_3"),
  coMarketSize: text("co_market_size"),
  coMarketLandscape: text("co_market_landscape"),
  coProduct1: text("co_product_1"),
  coProduct2: text("co_product_2"),
  coProduct3: text("co_product_3"),
  coDifferentation1: text("co_differentation_1"),
  coDifferentation2: text("co_differentation_2"),
  coDifferentation3: text("co_differentation_3"),
  coAdditionalNotes: text("co_additional_notes"),
  coSummary: text("summary"),
});

export const insertCompanySchema = createInsertSchema(companies);
export const insertCompanyAISchema = createInsertSchema(companiesAI);

export const selectCompanySchema = createSelectSchema(companies);
export const selectCompanyAISchema = createSelectSchema(companiesAI);

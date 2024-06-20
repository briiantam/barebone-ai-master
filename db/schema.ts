import { pgTable, text, numeric, integer } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Read more here: https://orm.drizzle.team/docs/zod - there are a lot more functions / modifications here

// export const accounts = pgTable("accounts", {
//   id: text("id").primaryKey(),
//   name: text("name").notNull(),
//   userId: text("user_id").notNull(),
// });

export const companies = pgTable("companies", {
  id: text("id").primaryKey(),
  coName: text("co_name").notNull(),
  coWebsiteUrl: text("co_website_url"),
  coDescription: text("co_description"),
  coOneLiner: text("co_one_liner").notNull(),
  coCountry: text("co_country").notNull(),
  coCity: text("co_city").notNull(),
  coProductStatus: text("co_product_status").notNull(),
  coCustomerCount: text("co_customer_count"),
  coMonthlyRevenue: text("co_monthly_revenue"),
  coAnnualRevenue: text("co_annual_revenue"),
  coAnnualExpense: text("co_annual_expense"),
  coExpectedValuation: integer("co_expected_valuation"),
  coFundraisingAmount: integer("co_fundraising_amount"),
  coPastFundraisingInfo: text("co_past_fundraising_info"),
  coFundingRound: text("co_funding_round").notNull(),
  coIndustry1: text("co_industry_1"),
  coIndustry2: text("co_industry_2"),
  coIndustry3: text("co_industry_3"),
  userId: text("user_id").notNull(),
  founderFirstName1: text("founder_first_name_1").notNull(),
  founderLastName1: text("founder_last_name_1").notNull(),
  founderTitle1: text("founder_title_1").notNull(),
  founderBio1: text("founder_bio_1").notNull(),
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
});

export const insertCompanySchema = createInsertSchema(companies);

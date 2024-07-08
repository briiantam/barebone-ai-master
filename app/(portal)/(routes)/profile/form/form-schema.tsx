import { z } from "zod";

const urlSchema = z.string().refine(
  (value) => {
    if (value === "") return true; // Allow empty string

    // General URL format check
    const urlPattern =
      /^(https?:\/\/)?([a-zA-Z0-9.-]+\.[a-zA-Z]{2,})(:[0-9]+)?(\/[^\s]*)?$/;
    return urlPattern.test(value);
  },
  {
    message: "Invalid URL format. Must be a valid URL.",
  }
);

export const formSchema = z
  .object({
    coName: z.string().min(1, "Company Name is required"),
    coWebsiteUrl: urlSchema,
    noWebsite: z.boolean(),
    coIndustry1: z.string().optional(),
    coIndustry2: z.string().optional(),
    coIndustry3: z.string().optional(),
    coDescription: z.string().optional(),
    coOneLiner: z.string().optional(),
    coCountry: z.string().min(1, "Country is required"),
    coCity: z.string().min(1, "City is required"),
    coProductStatus: z.string().optional(),
    coCustomerCount: z.string().optional(),
    coMonthlyRevenue: z.string().optional(),
    coAnnualRevenue: z.string().optional(),
    coAnnualExpense: z.string().optional(),
    coExpectedValuation: z.number().int().optional(),
    coFundraisingAmount: z.number().int().optional(),
    coPastFundraisingInfo: z.string().optional(),
    coFundingRound: z.string().optional(),
    founderFirstName1: z.string().optional(),
    founderLastName1: z.string().optional(),
    founderTitle1: z.string().optional(),
    founderBio1: z.string().optional(),
    founderTwitterUrl1: urlSchema.optional(),
    founderLinkedinUrl1: urlSchema.optional(),
    founderFirstName2: z.string().optional(),
    founderLastName2: z.string().optional(),
    founderTitle2: z.string().optional(),
    founderBio2: z.string().optional(),
    founderTwitterUrl2: urlSchema.optional(),
    founderLinkedinUrl2: urlSchema.optional(),
    founderFirstName3: z.string().optional(),
    founderLastName3: z.string().optional(),
    founderTitle3: z.string().optional(),
    founderBio3: z.string().optional(),
    founderTwitterUrl3: urlSchema.optional(),
    founderLinkedinUrl3: urlSchema.optional(),
    founderFirstName4: z.string().optional(),
    founderLastName4: z.string().optional(),
    founderTitle4: z.string().optional(),
    founderBio4: z.string().optional(),
    founderTwitterUrl4: urlSchema.optional(),
    founderLinkedinUrl4: urlSchema.optional(),
    founderFirstName5: z.string().optional(),
    founderLastName5: z.string().optional(),
    founderTitle5: z.string().optional(),
    founderBio5: z.string().optional(),
    founderTwitterUrl5: urlSchema.optional(),
    founderLinkedinUrl5: urlSchema.optional(),
    foundersCount: z.number().min(1).max(5),
  })
  .refine(
    (data) => data.noWebsite || (data.coWebsiteUrl && data.coWebsiteUrl !== ""),
    {
      message: "Website URL is required if 'No Website' is unchecked",
      path: ["coWebsiteUrl"],
    }
  );

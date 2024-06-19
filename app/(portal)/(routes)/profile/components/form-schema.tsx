import { z } from "zod";
//TODO: add in MRR, ARR, annual expenses, fundraisingamount, founder info
export const formSchema = z.object({
  companyName: z.string().min(1, "Company Name is required"),
  websiteUrl: z.string().url().optional(),
  noWebsite: z.boolean(),
  industries: z.array(z.string()).max(3, "You can select up to 3 industries"),
  companyDescription: z.string().optional(),
  companyOneLiner: z.string().min(1, "Company One-liner is required"),
  country: z.string().min(1, "Country is required"),
  city: z.string().min(1, "City is required"),
  logo: z.string().min(1, "Logo is required"),
  productStatus: z.string().min(1, "Product Status is required"),
  customerCount: z.string().optional(),
  revenue: z.string().optional(),
  founders: z.array(
    z.object({
      name: z.string().min(1, "Name is required"),
      title: z.string().min(1, "Title is required"),
      bio: z.string().min(1, "Bio is required"),
      twitterUrl: z.string().url().optional(),
      linkedinUrl: z.string().url().optional(),
    })
  ),
  expectedValuation: z.number().optional(),
  fundraisingDetails: z.number().optional(),
  pastFundraisingInfo: z.string().optional(),
  fundingRound: z.string().min(1, "Funding Round is required"),
});

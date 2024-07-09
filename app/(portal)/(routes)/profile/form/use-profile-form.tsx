import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { formSchema } from "./form-schema";
import { FormData } from "./types"; // Ensure the correct path to types.ts

export const useProfileForm = () => {
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      coName: "",
      coWebsiteUrl: undefined,
      noWebsite: false,
      coIndustry1: undefined,
      coIndustry2: undefined,
      coIndustry3: undefined,
      coDescription: undefined,
      coOneLiner: undefined,
      coCountry: undefined,
      coCity: undefined,
      coProductStatus: undefined,
      coCustomerCount: undefined,
      coMonthlyRevenue: undefined,
      coAnnualRevenue: undefined,
      coAnnualExpense: undefined,
      coExpectedValuation: undefined,
      coFundraisingAmount: undefined,
      coPastFundraisingInfo: undefined,
      coFundingRound: undefined,
      founderFirstName1: undefined,
      founderLastName1: undefined,
      founderTitle1: undefined,
      founderBio1: undefined,
      founderTwitterUrl1: undefined,
      founderLinkedinUrl1: undefined,
      founderFirstName2: undefined,
      founderLastName2: undefined,
      founderTitle2: undefined,
      founderBio2: undefined,
      founderTwitterUrl2: undefined,
      founderLinkedinUrl2: undefined,
      founderFirstName3: undefined,
      founderLastName3: undefined,
      founderTitle3: undefined,
      founderBio3: undefined,
      founderTwitterUrl3: undefined,
      founderLinkedinUrl3: undefined,
      founderFirstName4: undefined,
      founderLastName4: undefined,
      founderTitle4: undefined,
      founderBio4: undefined,
      founderTwitterUrl4: undefined,
      founderLinkedinUrl4: undefined,
      founderFirstName5: undefined,
      founderLastName5: undefined,
      founderTitle5: undefined,
      founderBio5: undefined,
      founderTwitterUrl5: undefined,
      founderLinkedinUrl5: undefined,
      foundersCount: 1,
    },
  });

  return { form };
};

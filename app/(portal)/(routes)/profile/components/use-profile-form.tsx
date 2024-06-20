import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { formSchema } from "./form-schema";
import { FormData } from "./types"; // Ensure the correct path to types.ts

export const useProfileForm = () => {
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      coName: "",
      coWebsiteUrl: "",
      noWebsite: false,
      coIndustry1: "",
      coIndustry2: "",
      coIndustry3: "",
      coDescription: "",
      coOneLiner: "",
      coCountry: "",
      coCity: "",
      coProductStatus: "",
      coCustomerCount: "",
      coMonthlyRevenue: "",
      coAnnualRevenue: "",
      coAnnualExpense: "",
      coExpectedValuation: 0,
      coFundraisingAmount: 0,
      coPastFundraisingInfo: "",
      coFundingRound: "",
      founderFirstName1: "",
      founderLastName1: "",
      founderTitle1: "",
      founderBio1: "",
      founderTwitterUrl1: "",
      founderLinkedinUrl1: "",
      founderFirstName2: "",
      founderLastName2: "",
      founderTitle2: "",
      founderBio2: "",
      founderTwitterUrl2: "",
      founderLinkedinUrl2: "",
      founderFirstName3: "",
      founderLastName3: "",
      founderTitle3: "",
      founderBio3: "",
      founderTwitterUrl3: "",
      founderLinkedinUrl3: "",
      founderFirstName4: "",
      founderLastName4: "",
      founderTitle4: "",
      founderBio4: "",
      founderTwitterUrl4: "",
      founderLinkedinUrl4: "",
      founderFirstName5: "",
      founderLastName5: "",
      founderTitle5: "",
      founderBio5: "",
      founderTwitterUrl5: "",
      founderLinkedinUrl5: "",
    },
  });

  return { form };
};

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
      coExpectedValuation: undefined,
      coFundraisingAmount: undefined,
      coPastFundraisingInfo: "",
      coFundingRound: "",
      founderFirstName1: "",
      founderLastName1: "",
      founderTitle1: "",
      founderBio1: "",
      founderTwitterUrl1: undefined,
      founderLinkedinUrl1: undefined,
      founderFirstName2: "",
      founderLastName2: "",
      founderTitle2: "",
      founderBio2: "",
      founderTwitterUrl2: undefined,
      founderLinkedinUrl2: undefined,
      founderFirstName3: "",
      founderLastName3: "",
      founderTitle3: "",
      founderBio3: "",
      founderTwitterUrl3: undefined,
      founderLinkedinUrl3: undefined,
      founderFirstName4: "",
      founderLastName4: "",
      founderTitle4: "",
      founderBio4: "",
      founderTwitterUrl4: undefined,
      founderLinkedinUrl4: undefined,
      founderFirstName5: "",
      founderLastName5: "",
      founderTitle5: "",
      founderBio5: "",
      founderTwitterUrl5: undefined,
      founderLinkedinUrl5: undefined,
      foundersCount: 1,
    },
  });

  return { form };
};

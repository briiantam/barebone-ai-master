import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { formSchema } from "./form-schema";

export const useProfileForm = () => {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      companyName: "",
      websiteUrl: "",
      noWebsite: false,
      industries: [],
      companyDescription: "",
      companyOneLiner: "",
      country: "",
      city: "",
      logo: "",
      productStatus: "",
      customerCount: "",
      revenue: "",
      founders: [
        { name: "", title: "", bio: "", twitterUrl: "", linkedinUrl: "" },
      ],
      expectedValuation: undefined,
      fundraisingDetails: undefined,
      pastFundraisingInfo: "",
      fundingRound: "",
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "founders",
  });

  return { form, fields, append, remove };
};

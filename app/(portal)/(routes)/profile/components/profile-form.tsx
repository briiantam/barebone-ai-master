import { useProfileForm } from "./use-profile-form";
import { CompanyInfoForm } from "./sections/company-info-form";
import { OperationFinancialsForm } from "./sections/operation-financials-form";
import { FoundersTeamForm } from "./sections/founders-team-form";
import { FundraisingInfoForm } from "./sections/fundraising-info-form";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { formSchema } from "./form-schema";
import { z } from "zod";

enum FormSections {
  CompanyInfo,
  OperationFinancials,
  FoundersTeam,
  FundraisingInfo,
}

const handleSelectIndustry = (form: any, industry: string) => {
  const selectedIndustries = form.getValues("industries");
  if (selectedIndustries.includes(industry)) {
    form.setValue(
      "industries",
      selectedIndustries.filter((item: string) => item !== industry)
    );
  } else if (selectedIndustries.length < 3) {
    form.setValue("industries", [...selectedIndustries, industry]);
  }
};

export function ProfileForm() {
  const { form, fields, append, remove } = useProfileForm();
  const [currentSection, setCurrentSection] = useState(
    FormSections.CompanyInfo
  );

  const handleNext = () => {
    if (currentSection < FormSections.FundraisingInfo) {
      setCurrentSection(currentSection + 1);
    }
  };

  const handlePrevious = () => {
    if (currentSection > FormSections.CompanyInfo) {
      setCurrentSection(currentSection - 1);
    }
  };

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log(values);
  };

  return (
    <div className="max-w-3xl mx-auto overflow-y-auto px-0 md:px-2 lg:px-2 xl:px-2">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          {currentSection === FormSections.CompanyInfo && (
            <CompanyInfoForm
              form={form}
              handleSelectIndustry={(industry: string) =>
                handleSelectIndustry(form, industry)
              }
            />
          )}
          {currentSection === FormSections.OperationFinancials && (
            <OperationFinancialsForm form={form} />
          )}
          {currentSection === FormSections.FoundersTeam && (
            <FoundersTeamForm
              form={form}
              fields={fields}
              append={append}
              remove={remove}
            />
          )}
          {currentSection === FormSections.FundraisingInfo && (
            <FundraisingInfoForm form={form} />
          )}

          <div className="flex justify-between mt-4">
            {currentSection > FormSections.CompanyInfo && (
              <Button type="button" onClick={handlePrevious}>
                Previous
              </Button>
            )}
            {currentSection < FormSections.FundraisingInfo && (
              <Button type="button" onClick={handleNext}>
                Next
              </Button>
            )}
            {currentSection === FormSections.FundraisingInfo && (
              <Button type="submit">Submit</Button>
            )}
          </div>
        </form>
      </Form>
    </div>
  );
}

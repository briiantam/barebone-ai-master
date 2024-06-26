import { FormProps } from "../form/types";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Company } from "./interface";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import {
  industries,
  countries,
  productStatuses,
  customerCounts,
  monthlyRevenues,
  annualRevenues,
  annualExpenses,
  fundingRounds,
} from "@/components/constants/index";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";

interface EditCompanyFormProps extends FormProps {
  companyData: Company;
  onChange: (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => void;
  onSave: () => void;
  setValue: any;
}

export const EditCompanyForm: React.FC<EditCompanyFormProps> = ({
  control,
  companyData,
  onChange,
  onSave,
  setValue,
}) => {
  return (
    <div className="px-4 py-4">
      <DialogTitle className="my-4 text-lg border-b border-white py-2">
        Basic Company Info
      </DialogTitle>
      <div className="flex flex-col-2 items-center gap-4 justify-between my-2">
        <div className="flex flex-col gap-2 w-1/2">
          <div className="text-sm">Company Name</div>
          <Input
            type="text"
            name="coName"
            value={companyData.coName}
            onChange={onChange}
            className="mb-2"
          />
        </div>
        <div className="flex flex-col gap-2 w-1/2">
          <div className="text-sm">Website URL</div>
          <Input
            type="text"
            name="coWebsiteUrl"
            value={companyData.coWebsiteUrl || undefined}
            onChange={onChange}
            className="mb-2"
          />
        </div>
      </div>
      <div>
        <div className="flex flex-col gap-2 justify-between my-2">
          <div className="text-sm">Company One-liner</div>
          <Input
            type="text"
            name="coOneLiner"
            value={companyData.coOneLiner}
            onChange={onChange}
            className="mb-2"
          />
        </div>
      </div>
      <div className="flex flex-col-3 items-center gap-4 justify-between my-2">
        <div className="flex flex-col gap-2 w-1/2">
          <div className="text-sm">Industry 1</div>

          <FormField
            control={control}
            name="coIndustry1"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormControl>
                  <Select
                    value={companyData.coIndustry1 || ""}
                    onValueChange={(value) => {
                      const syntheticEvent = {
                        target: {
                          name: "coIndustry1",
                          value: value,
                        },
                      } as React.ChangeEvent<HTMLSelectElement>;

                      onChange(syntheticEvent);
                      field.onChange(value);
                    }}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select Industry 1" />
                    </SelectTrigger>
                    <SelectContent>
                      {industries.map((industry) => (
                        <SelectItem key={industry} value={industry}>
                          {industry}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>
              </FormItem>
            )}
          />
        </div>
        <div className="flex flex-col gap-2 w-1/2">
          <div className="text-sm">Industry 2</div>

          <FormField
            control={control}
            name="coIndustry2"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormControl>
                  <Select
                    value={companyData.coIndustry2 || ""}
                    onValueChange={(value) => {
                      const syntheticEvent = {
                        target: {
                          name: "coIndustry2",
                          value: value,
                        },
                      } as React.ChangeEvent<HTMLSelectElement>;

                      onChange(syntheticEvent);
                      field.onChange(value);
                    }}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select Industry 2" />
                    </SelectTrigger>
                    <SelectContent>
                      {industries.map((industry) => (
                        <SelectItem key={industry} value={industry}>
                          {industry}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>
              </FormItem>
            )}
          />
        </div>
        <div className="flex flex-col gap-2 w-1/2">
          <div className="text-sm">Industry 3</div>
          <FormField
            control={control}
            name="coIndustry3"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormControl>
                  <Select
                    value={companyData.coIndustry3 || ""}
                    onValueChange={(value) => {
                      const syntheticEvent = {
                        target: {
                          name: "coIndustry3",
                          value: value,
                        },
                      } as React.ChangeEvent<HTMLSelectElement>;

                      onChange(syntheticEvent);
                      field.onChange(value);
                    }}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select Industry 3" />
                    </SelectTrigger>
                    <SelectContent>
                      {industries.map((industry) => (
                        <SelectItem key={industry} value={industry}>
                          {industry}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>
              </FormItem>
            )}
          />
        </div>
      </div>

      <div>
        <div className="flex flex-col gap-2 justify-between my-2">
          <div className="text-sm">Company Description</div>
          <Textarea
            name="coDescription"
            value={companyData.coDescription || ""}
            onChange={onChange}
            className="mb-2"
          />
        </div>
      </div>
      <div className="flex flex-col-2 items-center gap-4 justify-between my-2">
        <div className="flex flex-col gap-2 w-1/2">
          <div className="text-sm">Country/Market</div>

          <FormField
            control={control}
            name="coCountry"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormControl>
                  <Select
                    value={companyData.coCountry}
                    onValueChange={(value) => {
                      const syntheticEvent = {
                        target: {
                          name: "coCountry",
                          value: value,
                        },
                      } as React.ChangeEvent<HTMLSelectElement>;

                      onChange(syntheticEvent);
                      field.onChange(value);
                    }}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select Country/Market" />
                    </SelectTrigger>
                    <SelectContent>
                      {countries.map((country) => (
                        <SelectItem key={country} value={country}>
                          {country}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>
              </FormItem>
            )}
          />
        </div>
        <div className="flex flex-col gap-2 w-1/2">
          <div className="text-sm">City</div>
          <Input
            type="text"
            name="coCity"
            value={companyData.coCity}
            onChange={onChange}
            className="mb-2"
          />
        </div>
      </div>

      <DialogTitle className="my-4 text-lg border-b border-white py-2">
        Operational & Financial Information
      </DialogTitle>
      <div>
        <div className="flex flex-col gap-2 justify-between my-2">
          <div className="text-sm">Product Status</div>
          <Input
            type="text"
            name="coProductStatus"
            value={companyData.coProductStatus}
            onChange={onChange}
            className="mb-2"
          />
        </div>
      </div>
      <div className="flex flex-col-2 items-center gap-4 justify-between my-2">
        <div className="flex flex-col gap-2 w-1/2">
          <div className="text-sm">Customers</div>
          <FormField
            control={control}
            name="coCustomerCount"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormControl>
                  <Select
                    value={companyData.coCustomerCount || ""}
                    onValueChange={(value) => {
                      const syntheticEvent = {
                        target: {
                          name: "coCustomerCount",
                          value: value,
                        },
                      } as React.ChangeEvent<HTMLSelectElement>;

                      onChange(syntheticEvent);
                      field.onChange(value);
                    }}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select Customer Count" />
                    </SelectTrigger>
                    <SelectContent>
                      {customerCounts.map((count) => (
                        <SelectItem key={count} value={count}>
                          {count}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>
              </FormItem>
            )}
          />
        </div>
        <div className="flex flex-col gap-2 w-1/2">
          <div className="text-sm">Monthly Recurring Revenue</div>

          <FormField
            control={control}
            name="coMonthlyRevenue"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormControl>
                  <Select
                    value={companyData.coMonthlyRevenue || ""}
                    onValueChange={(value) => {
                      const syntheticEvent = {
                        target: {
                          name: "coMonthlyRevenue",
                          value: value,
                        },
                      } as React.ChangeEvent<HTMLSelectElement>;

                      onChange(syntheticEvent);
                      field.onChange(value);
                    }}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select MRR" />
                    </SelectTrigger>
                    <SelectContent>
                      {monthlyRevenues.map((monthlyRevenue) => (
                        <SelectItem key={monthlyRevenue} value={monthlyRevenue}>
                          {monthlyRevenue}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>
              </FormItem>
            )}
          />
        </div>
      </div>
      <div className="flex flex-col-2 items-center gap-4 justify-between my-2">
        <div className="flex flex-col gap-2 w-1/2">
          <div className="text-sm">Annual Recurring Revenue</div>

          <FormField
            control={control}
            name="coAnnualRevenue"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormControl>
                  <Select
                    value={companyData.coAnnualRevenue || ""}
                    onValueChange={(value) => {
                      const syntheticEvent = {
                        target: {
                          name: "coAnnualRevenue",
                          value: value,
                        },
                      } as React.ChangeEvent<HTMLSelectElement>;

                      onChange(syntheticEvent);
                      field.onChange(value);
                    }}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select ARR" />
                    </SelectTrigger>
                    <SelectContent>
                      {annualRevenues.map((annualRevenue) => (
                        <SelectItem key={annualRevenue} value={annualRevenue}>
                          {annualRevenue}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>
              </FormItem>
            )}
          />
        </div>
        <div className="flex flex-col gap-2 w-1/2">
          <div className="text-sm">Annual Expenses</div>

          <FormField
            control={control}
            name="coAnnualExpense"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormControl>
                  <Select
                    value={companyData.coAnnualExpense || ""}
                    onValueChange={(value) => {
                      const syntheticEvent = {
                        target: {
                          name: "coAnnualExpense",
                          value: value,
                        },
                      } as React.ChangeEvent<HTMLSelectElement>;

                      onChange(syntheticEvent);
                      field.onChange(value);
                    }}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select Annual Expenses" />
                    </SelectTrigger>
                    <SelectContent>
                      {annualExpenses.map((annualExpense) => (
                        <SelectItem key={annualExpense} value={annualExpense}>
                          {annualExpense}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>
              </FormItem>
            )}
          />
        </div>
      </div>

      <DialogTitle className="my-4 text-lg border-b border-white py-2">
        Founders
      </DialogTitle>
      <h1 className="font-bold py-1">Founder 1</h1>
      <div className="flex flex-col-2 items-center gap-4 justify-between my-2">
        <div className="flex flex-col gap-2 w-1/2">
          <div className="text-sm">First Name</div>

          <Input
            type="text"
            name="founderFirstName1"
            value={companyData.founderFirstName1}
            onChange={onChange}
            className="mb-2"
          />
        </div>
        <div className="flex flex-col gap-2 w-1/2">
          <div className="text-sm">Last Name</div>

          <Input
            type="text"
            name="founderLastName1"
            value={companyData.founderLastName1}
            onChange={onChange}
            className="mb-2"
          />
        </div>
        <div className="flex flex-col gap-2 w-1/2">
          <div className="text-sm">Title</div>

          <Input
            type="text"
            name="founderTitle1"
            value={companyData.founderTitle1}
            onChange={onChange}
            className="mb-2"
          />
        </div>
      </div>
      <div>
        <div className="flex flex-col gap-2 justify-between my-2">
          <div className="text-sm">Bio</div>
          <Textarea
            name="founderBio1"
            value={companyData.founderBio1}
            onChange={onChange}
            className="mb-2"
          />
        </div>
      </div>
      <div className="flex flex-col-2 items-center gap-4 justify-between my-2">
        <div className="flex flex-col gap-2 w-1/2">
          <div className="text-sm">Twitter/X URL</div>
          <Input
            type="text"
            name="founderTwitterUrl1"
            value={companyData.founderTwitterUrl1 || ""}
            onChange={onChange}
            className="mb-2"
          />
        </div>
        <div className="flex flex-col gap-2 w-1/2">
          <div className="text-sm">LinkedIn URL</div>
          <Input
            type="text"
            name="founderLinkedinUrl1"
            value={companyData.founderLinkedinUrl1 || ""}
            onChange={onChange}
            className="mb-2"
          />
        </div>
      </div>

      {/* Add other founder input fields here */}
      <DialogTitle className="my-4 text-lg border-b border-white py-2">
        Fundraising Info
      </DialogTitle>
      <div className="flex flex-col-2 items-center gap-4 justify-between my-2">
        <div className="flex flex-col gap-2 w-1/2">
          <div className="text-sm">Expected Valuation (USD)</div>
          <FormField
            control={control}
            name="coExpectedValuation"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    type="text"
                    {...field}
                    value={
                      companyData.coExpectedValuation != null
                        ? new Intl.NumberFormat().format(
                            companyData.coExpectedValuation
                          )
                        : ""
                    }
                    onChange={(e) => {
                      const value = e.target.value.replace(/[^\d]/g, "");
                      const numberValue = value ? Number(value) : null;

                      field.onChange(numberValue);

                      // Create a more complete synthetic event
                      const syntheticEvent: React.ChangeEvent<HTMLInputElement> =
                        {
                          ...e,
                          target: {
                            ...e.target,
                            name: "coExpectedValuation",
                            value: numberValue as any, // Use 'any' to bypass type checking for the value
                          },
                        };

                      // Call the parent onChange function
                      onChange(syntheticEvent);
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="flex flex-col gap-2 w-1/2">
          <div className="text-sm">Fundraising Amount</div>
          <FormField
            control={control}
            name="coFundraisingAmount"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    type="text"
                    {...field}
                    value={
                      companyData.coFundraisingAmount != null
                        ? new Intl.NumberFormat().format(
                            companyData.coFundraisingAmount
                          )
                        : ""
                    }
                    onChange={(e) => {
                      const value = e.target.value.replace(/[^\d]/g, "");
                      const numberValue = value ? Number(value) : null;

                      field.onChange(numberValue);

                      // Create a more complete synthetic event
                      const syntheticEvent: React.ChangeEvent<HTMLInputElement> =
                        {
                          ...e,
                          target: {
                            ...e.target,
                            name: "coFundraisingAmount",
                            value: numberValue as any, // Use 'any' to bypass type checking for the value
                          },
                        };

                      // Call the parent onChange function
                      onChange(syntheticEvent);
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </div>
      <div>
        <div className="flex flex-col gap-2 justify-between my-2">
          <div className="text-sm">Fundraising Round</div>

          <FormField
            control={control}
            name="coFundingRound"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormControl>
                  <Select
                    value={companyData.coFundingRound || ""}
                    onValueChange={(value) => {
                      const syntheticEvent = {
                        target: {
                          name: "coFundingRound",
                          value: value,
                        },
                      } as React.ChangeEvent<HTMLSelectElement>;

                      onChange(syntheticEvent);
                      field.onChange(value);
                    }}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select Funding Round" />
                    </SelectTrigger>
                    <SelectContent>
                      {fundingRounds.map((round) => (
                        <SelectItem key={round} value={round}>
                          {round}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>
              </FormItem>
            )}
          />
        </div>
      </div>
      <div>
        <div className="flex flex-col gap-2 justify-between my-2">
          <div className="text-sm">Past Fundraising Info</div>
          <Textarea
            name="coPastFundraisingInfo"
            value={companyData.coPastFundraisingInfo || ""}
            onChange={onChange}
            className="mb-2"
          />
        </div>
      </div>

      <Button onClick={onSave}>Save</Button>
    </div>
  );
};

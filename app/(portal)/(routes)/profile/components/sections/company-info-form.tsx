import { useState } from "react"; // Import useState
import { Control, FieldValues, useWatch } from "react-hook-form"; // Import useWatch
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea"; // Added import for Textarea
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { industries, countries } from "@/components/constants/index";
import { Checkbox } from "@/components/ui/checkbox"; // Import Checkbox component

interface CompanyInfoFormProps {
  form: {
    control: Control<FieldValues>;
    setValue: any;
  };
  handleSelectIndustry: (industry: string) => void;
}

export const CompanyInfoForm: React.FC<CompanyInfoFormProps> = ({
  form,
  handleSelectIndustry,
}) => {
  const [noWebsite, setNoWebsite] = useState<boolean>(false);

  // Watch the value of the websiteUrl field
  const websiteUrl = useWatch({
    control: form.control,
    name: "websiteUrl",
  });

  return (
    <div className="mb-8 text-white space-y-4">
      <h2 className="text-2xl font-bold mb-2 text-center">
        Company Introduction
      </h2>
      <h2 className="text-md font-light mb-4 text-center">
        Introduce your company and basic information
      </h2>
      <div className="space-y-4">
        <FormField
          control={form.control}
          name="companyName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Company Name</FormLabel>
              <FormControl>
                <Input
                  placeholder="Please enter your company's name"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="websiteUrl"
          render={({ field }) => (
            <FormItem>
              <div className="flex justify-between items-center">
                <FormLabel>Website URL</FormLabel>
                <div className="flex items-center ml-1">
                  <Checkbox
                    checked={noWebsite}
                    onCheckedChange={(checked) => {
                      setNoWebsite(checked == true);
                      form.setValue("websiteUrl", "");
                    }}
                  />
                  <label className="ml-2 text-sm">No Website</label>
                </div>
              </div>
              <FormControl>
                <Input
                  placeholder="Our AI will analyze your business"
                  {...field}
                  disabled={noWebsite}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        {noWebsite && (
          <>
            <FormField
              control={form.control}
              name="industries"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Industry (Select Top 3 Most Representative)
                  </FormLabel>
                  <div className="flex flex-col sm:flex-row sm:space-x-2 space-y-2 sm:space-y-0">
                    <Select
                      onValueChange={(value) => handleSelectIndustry(value)}
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
                    <Select
                      onValueChange={(value) => handleSelectIndustry(value)}
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
                    <Select
                      onValueChange={(value) => handleSelectIndustry(value)}
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
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="companyDescription"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Company Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Describe your company in detail (we'll refine it for you)"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="companyOneLiner"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Company One-Liner</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Describe your company in one sentence"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </>
        )}
        <div className="flex flex-col md:flex-row md:space-x-2 space-y-2 md:space-y-0">
          <FormField
            control={form.control}
            name="country"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>Country/Market</FormLabel>
                <FormControl>
                  <Select onValueChange={(value) => field.onChange(value)}>
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
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="city"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>City</FormLabel>
                <FormControl>
                  <Input placeholder="City" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </div>
    </div>
  );
};

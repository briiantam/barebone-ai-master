import { useWatch } from "react-hook-form";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { industries, countries } from "@/components/constants/index";
import { Checkbox } from "@/components/ui/checkbox";
import { FormProps } from "../types";

interface CompanyInfoFormProps extends FormProps {
  setValue: any;
  handleSelectIndustry: (industry: string) => void;
}

export const CompanyInfoForm: React.FC<CompanyInfoFormProps> = ({
  control,
  setValue,
  handleSelectIndustry,
}) => {
  const noWebsite = useWatch({
    control,
    name: "noWebsite",
  });

  return (
    <div className="mb-8 text-white space-y-4">
      <h2 className="text-2xl font-bold mb-2 text-center">
        Company Information
      </h2>
      <h2 className="text-md font-light mb-4 text-center">
        Tell us more about your company
      </h2>
      <div className="space-y-4">
        <FormField
          control={control}
          name="coName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Company Name *</FormLabel>
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
          control={control}
          name="coWebsiteUrl"
          render={({ field }) => (
            <FormItem>
              <div className="flex justify-between items-center">
                <FormLabel>
                  Home / Landing Page Website URL{!noWebsite ? " *" : ""}
                </FormLabel>
                <div className="flex items-center ml-1">
                  <FormField
                    control={control}
                    name="noWebsite"
                    render={({ field: noWebsiteField }) => (
                      <Checkbox
                        checked={Boolean(noWebsiteField.value)}
                        onCheckedChange={(checked) => {
                          noWebsiteField.onChange(checked);
                          setValue("coWebsiteUrl", undefined);
                        }}
                      />
                    )}
                  />
                  <label className="ml-2 text-sm">No Website</label>
                </div>
              </div>
              <FormControl>
                <Input
                  type="url"
                  placeholder="Let us analyze your website to gain a thorough understanding of your business"
                  {...field}
                  disabled={Boolean(noWebsite)}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {noWebsite && (
          <>
            <div>
              <FormLabel>Industry (Pick 3 That Relates Most)</FormLabel>
            </div>
            <div className="flex flex-col-3 gap-2 justify-between">
              <FormField
                control={control}
                name="coIndustry1"
                render={({ field }) => (
                  <FormItem>
                    <Select
                      value={field.value}
                      onValueChange={(value) => field.onChange(value)}
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
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={control}
                name="coIndustry2"
                render={({ field }) => (
                  <FormItem>
                    <Select
                      value={field.value}
                      onValueChange={(value) => field.onChange(value)}
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
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={control}
                name="coIndustry3"
                render={({ field }) => (
                  <FormItem>
                    <Select
                      value={field.value}
                      onValueChange={(value) => field.onChange(value)}
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
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={control}
              name="coDescription"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Company Description *</FormLabel>
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
          </>
        )}

        {/* <FormField
          control={control}
          name="coOneLiner"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Company One-Liner *</FormLabel>
              <FormControl>
                <Input
                  placeholder="Describe your company in one sentence"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        /> */}
        <div className="flex flex-col md:flex-row md:space-x-2 space-y-2 md:space-y-0">
          <FormField
            control={control}
            name="coCountry"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>HQ Country/Market *</FormLabel>
                <FormControl>
                  <Select
                    value={field.value}
                    onValueChange={(value) => field.onChange(value)}
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
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name="coCity"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>HQ City *</FormLabel>
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

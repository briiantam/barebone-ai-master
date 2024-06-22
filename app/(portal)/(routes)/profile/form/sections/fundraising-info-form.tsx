import { FormProps } from "../types"; // Update the import path as necessary
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
import { fundingRounds } from "@/components/constants/index";

export const FundraisingInfoForm: React.FC<FormProps> = ({ control }) => (
  <div className="mb-8 text-white space-y-4">
    <h2 className="text-2xl font-bold mb-2 text-center">Fundraising Details</h2>
    <h2 className="text-md font-light mb-4 text-center">
      Tell us more about your fundraising round
    </h2>
    <div className="space-y-4">
      <FormField
        control={control}
        name="coExpectedValuation"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Expected Valuation (USD)</FormLabel>
            <FormControl>
              <Input
                type="text" // Use text input to allow formatted numbers
                {...field}
                value={
                  field.value !== undefined
                    ? new Intl.NumberFormat().format(field.value)
                    : ""
                }
                onChange={(e) => {
                  const value = e.target.value.replace(/,/g, "");
                  field.onChange(value ? Number(value) : "");
                }}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={control}
        name="coFundraisingAmount"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Expected Fundraising Amount (USD)</FormLabel>
            <FormControl>
              <Input
                type="text" // Use text input to allow formatted numbers
                {...field}
                value={
                  field.value !== undefined
                    ? new Intl.NumberFormat().format(field.value)
                    : ""
                }
                onChange={(e) => {
                  const value = e.target.value.replace(/,/g, "");
                  field.onChange(value ? Number(value) : "");
                }}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={control}
        name="coPastFundraisingInfo"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Past Fundraising Info</FormLabel>
            <FormControl>
              <Textarea
                placeholder="Let us know any past fundraising rounds and related details"
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={control}
        name="coFundingRound"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Funding Round</FormLabel>
            <FormControl>
              <Select
                value={field.value}
                onValueChange={(value) => field.onChange(value)}
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
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  </div>
);

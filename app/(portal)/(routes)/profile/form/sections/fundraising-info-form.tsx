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
import { Button } from "@/components/ui/button";
import { fundingRounds } from "@/components/constants/index";

function parseValuation(input: any) {
  if (typeof input !== "string") return input;

  const cleanInput = input.toLowerCase().replace(/,/g, "");

  // Match number followed optionally by k, m, b, t
  const match = cleanInput.match(/^(\d+\.?\d*)([kmbt])?$/);

  if (!match) return NaN;

  let number = parseFloat(match[1]);
  const suffix = match[2];

  if (suffix) {
    switch (suffix) {
      case "k":
      case "t":
        number *= 1000;
        break;
      case "m":
        number *= 1000000;
        break;
      case "b":
        number *= 1000000000;
        break;
    }
  }

  return number;
}

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
                type="text"
                {...field}
                value={
                  field.value !== undefined && !isNaN(field.value)
                    ? new Intl.NumberFormat().format(field.value)
                    : field.value
                }
                onChange={(e) => {
                  const inputValue = e.target.value.replace(/,/g, "");
                  // Only allow digits, dot, and k, m, b, t at the end
                  const validInput = inputValue.replace(/[^0-9.kmbt]/gi, "");
                  const parsedValue = parseValuation(validInput);

                  if (!isNaN(parsedValue)) {
                    field.onChange(parsedValue);
                  } else if (validInput === "") {
                    field.onChange("");
                  } else {
                    // If input is invalid, don't update the field
                    e.target.value =
                      field.value !== undefined
                        ? new Intl.NumberFormat().format(field.value)
                        : "";
                  }
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
                type="text"
                {...field}
                value={
                  field.value !== undefined && !isNaN(field.value)
                    ? new Intl.NumberFormat().format(field.value)
                    : field.value
                }
                onChange={(e) => {
                  const inputValue = e.target.value.replace(/,/g, "");
                  // Only allow digits, dot, and k, m, b, t at the end
                  const validInput = inputValue.replace(/[^0-9.kmbt]/gi, "");
                  const parsedValue = parseValuation(validInput);

                  if (!isNaN(parsedValue)) {
                    field.onChange(parsedValue);
                  } else if (validInput === "") {
                    field.onChange("");
                  } else {
                    // If input is invalid, don't update the field
                    e.target.value =
                      field.value !== undefined
                        ? new Intl.NumberFormat().format(field.value)
                        : "";
                  }
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

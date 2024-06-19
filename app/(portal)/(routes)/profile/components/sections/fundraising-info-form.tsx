import { Control, FieldValues } from "react-hook-form";
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

interface FundraisingInfoFormProps {
  form: {
    control: Control<FieldValues>;
  };
}

export const FundraisingInfoForm: React.FC<FundraisingInfoFormProps> = ({
  form,
}) => (
  <div className="mb-8 text-white space-y-4">
    <h2 className="text-2xl font-bold mb-2 text-center">Fundraising Details</h2>
    <h2 className="text-md font-light mb-4 text-center">
      Tell us more about your fundraising round
    </h2>
    <div className="space-y-4">
      <FormField
        control={form.control}
        name="expectedValuation"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Expected Valuation (USD)</FormLabel>
            <FormControl>
              <Input
                type="number"
                placeholder="How much are you expected to be valued at?"
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="fundraisingAmount"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Expected Fundraising Amount (USD)</FormLabel>
            <FormControl>
              <Input
                type="number"
                placeholder="How much are your expecting to fundraise this round?"
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="pastFundraisingInfo"
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
        control={form.control}
        name="fundingRound"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Funding Round</FormLabel>
            <FormControl>
              <Select onValueChange={(value) => field.onChange(value)}>
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

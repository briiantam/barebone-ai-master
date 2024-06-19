import { Control, FieldValues } from "react-hook-form";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import {
  productStatuses,
  customerCounts,
  monthlyRevenues,
  annualRevenues,
  annualExpenses,
} from "@/components/constants/index";

interface OperationFinancialsFormProps {
  form: {
    control: Control<FieldValues>;
  };
}

export const OperationFinancialsForm: React.FC<
  OperationFinancialsFormProps
> = ({ form }) => (
  <div className="mb-8 text-white space-y-4">
    <h2 className="text-2xl font-bold mb-2 text-center">
      Operational & Financial Information
    </h2>
    <h2 className="text-md font-light mb-4 text-center">
      Tell us a bit about your product and current traction
    </h2>
    <FormField
      control={form.control}
      name="productStatus"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Product Status</FormLabel>
          <FormControl>
            <Select onValueChange={(value) => field.onChange(value)}>
              <SelectTrigger>
                <SelectValue placeholder="What stage is your product development at?" />
              </SelectTrigger>
              <SelectContent>
                {productStatuses.map((status) => (
                  <SelectItem key={status} value={status}>
                    {status}
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
      name="customerCount"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Customers</FormLabel>
          <FormControl>
            <Select onValueChange={(value) => field.onChange(value)}>
              <SelectTrigger>
                <SelectValue placeholder="How many customers do you have?" />
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
          <FormMessage />
        </FormItem>
      )}
    />
    {/* TODO - schema and forms should reflect ARR, MRR and Expenses */}
    <FormField
      control={form.control}
      name="monthlyRevenue"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Monthly Recurring Revenue</FormLabel>
          <FormControl>
            <Select onValueChange={(value) => field.onChange(value)}>
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
          <FormMessage />
        </FormItem>
      )}
    />
    <FormField
      control={form.control}
      name="annualRevenue"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Annual Recurring Revenue</FormLabel>
          <FormControl>
            <Select onValueChange={(value) => field.onChange(value)}>
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
          <FormMessage />
        </FormItem>
      )}
    />
    <FormField
      control={form.control}
      name="annualExpenses"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Annual Expenses</FormLabel>
          <FormControl>
            <Select onValueChange={(value) => field.onChange(value)}>
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
          <FormMessage />
        </FormItem>
      )}
    />
  </div>
);

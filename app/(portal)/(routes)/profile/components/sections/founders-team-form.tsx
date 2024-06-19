import { Control, FieldValues, UseFieldArrayReturn } from "react-hook-form";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

interface FoundersTeamFormProps {
  form: {
    control: Control<FieldValues>;
  };
  fields: UseFieldArrayReturn["fields"];
  append: UseFieldArrayReturn["append"];
  remove: UseFieldArrayReturn["remove"];
}

export const FoundersTeamForm: React.FC<FoundersTeamFormProps> = ({
  form,
  fields,
  append,
  remove,
}) => (
  <div className="mb-8">
    <h2 className="text-2xl font-bold mb-2 text-center">Founders</h2>
    <h2 className="text-md font-light mb-4 text-center">
      Let us know more about you!
    </h2>
    {fields.map((field, index) => (
      <div key={field.id} className="space-y-4">
        <h3 className="text-lg font-medium mt-4">Founder {index + 1}</h3>
        <div className="flex flex-col md:flex-row md:space-x-2 space-y-2 md:space-y-0">
          <FormField
            control={form.control}
            name={`founders.${index}.firstName`}
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>First Name</FormLabel>
                <FormControl>
                  <Input placeholder="First Name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name={`founders.${index}.lastName`}
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>Last Name</FormLabel>
                <FormControl>
                  <Input placeholder="Last Name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name={`founders.${index}.title`}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="Title" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name={`founders.${index}.bio`}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Bio</FormLabel>
              <FormControl>
                <Textarea placeholder="Bio" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex flex-col md:flex-row md:space-x-2 space-y-2 md:space-y-0">
          <FormField
            control={form.control}
            name={`founders.${index}.twitterUrl`}
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>Twitter URL</FormLabel>
                <FormControl>
                  <Input placeholder="Twitter URL" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name={`founders.${index}.linkedinUrl`}
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>LinkedIn URL</FormLabel>
                <FormControl>
                  <Input placeholder="LinkedIn URL" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="flex justify-between py-2">
          {index > 0 && (
            <Button
              type="button"
              onClick={() => remove(index)}
              className="mr-4"
              variant="outline"
            >
              Remove Founder
            </Button>
          )}
          {fields.length < 5 && (
            <Button
              type="button"
              variant="outline"
              onClick={() =>
                append({
                  firstName: "",
                  lastName: "",
                  title: "",
                  bio: "",
                  twitterUrl: "",
                  linkedinUrl: "",
                })
              }
            >
              Add Founder
            </Button>
          )}
        </div>
      </div>
    ))}
  </div>
);

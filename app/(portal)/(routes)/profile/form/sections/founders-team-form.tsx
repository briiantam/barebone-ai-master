import { useState, useEffect } from "react";
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
import { FormProps } from "../types";
import { Button } from "@/components/ui/button"; // Import Button component

export const FoundersTeamForm: React.FC<FormProps & { setValue: any }> = ({
  control,
  setValue,
}) => {
  const [foundersCount, setFoundersCount] = useState(1);

  const watchedFoundersCount = useWatch({
    control,
    name: "foundersCount",
  });

  useEffect(() => {
    if (watchedFoundersCount !== undefined) {
      setFoundersCount(watchedFoundersCount);
    }
  }, [watchedFoundersCount]);

  const addFounder = () => {
    if (foundersCount < 5) {
      const newCount = foundersCount + 1;
      setFoundersCount(newCount);
      setValue("foundersCount", newCount);
    }
  };

  const removeFounder = () => {
    if (foundersCount > 1) {
      const newCount = foundersCount - 1;
      setFoundersCount(newCount);
      setValue("foundersCount", newCount);
    }
  };

  return (
    <div className="mb-8">
      <h2 className="text-2xl font-bold mb-2 text-center">Founders</h2>
      <h2 className="text-md font-light mb-4 text-center">
        Let us know more about you!
      </h2>

      {[...Array(foundersCount)].map((_, index) => {
        const firstNameKey = `founderFirstName${
          index + 1
        }` as keyof FormProps["control"]["_defaultValues"];
        const lastNameKey = `founderLastName${
          index + 1
        }` as keyof FormProps["control"]["_defaultValues"];
        const titleKey = `founderTitle${
          index + 1
        }` as keyof FormProps["control"]["_defaultValues"];
        const bioKey = `founderBio${
          index + 1
        }` as keyof FormProps["control"]["_defaultValues"];
        const twitterUrlKey = `founderTwitterUrl${
          index + 1
        }` as keyof FormProps["control"]["_defaultValues"];
        const linkedinUrlKey = `founderLinkedinUrl${
          index + 1
        }` as keyof FormProps["control"]["_defaultValues"];

        return (
          <div key={index} className="space-y-4">
            <h3 className="text-lg font-medium mt-4">Founder {index + 1}</h3>
            <div className="flex flex-col md:flex-row md:space-x-2 space-y-2 md:space-y-0">
              <FormField
                control={control}
                name={firstNameKey}
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel>First Name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder={`First Name`}
                        {...field}
                        value={field.value?.toString() || ""}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={control}
                name={lastNameKey}
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel>Last Name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder={`Last Name`}
                        {...field}
                        value={field.value?.toString() || ""}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={control}
              name={titleKey}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input
                      placeholder={`Title`}
                      {...field}
                      value={field.value?.toString() || ""}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name={bioKey}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Bio</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder={`Input something basic and we'll polish up for you. Better results with your LinkedIn URL!`}
                      {...field}
                      value={field.value?.toString() || ""}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex flex-col md:flex-row md:space-x-2 space-y-2 md:space-y-0">
              <FormField
                control={control}
                name={linkedinUrlKey}
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel>LinkedIn URL</FormLabel>
                    <FormControl>
                      <Input
                        type="url"
                        placeholder={`LinkedIn URL`}
                        {...field}
                        value={field.value?.toString() || undefined}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={control}
                name={twitterUrlKey}
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel>Twitter URL</FormLabel>
                    <FormControl>
                      <Input
                        type="url"
                        placeholder={`Twitter URL`}
                        {...field}
                        value={field.value?.toString() || undefined}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
        );
      })}
      <div className="flex justify-between mt-4">
        {foundersCount < 5 && (
          <Button type="button" onClick={addFounder} variant="outline">
            Add Founder
          </Button>
        )}
        {foundersCount > 1 && (
          <Button type="button" onClick={removeFounder} variant="outline">
            Remove Founder
          </Button>
        )}
      </div>
    </div>
  );
};

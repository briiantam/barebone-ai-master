import { Control } from "react-hook-form";
import { z } from "zod";
import { formSchema } from "./form-schema";

export type FormData = z.infer<typeof formSchema>;

export interface FormProps {
  control: Control<FormData>;
}

import { Control, FieldValues, UseFieldArrayReturn } from "react-hook-form";

export interface FormProps {
  control: Control<FieldValues>;
}

export interface FoundersFormProps extends FormProps {
  fields: UseFieldArrayReturn["fields"];
  append: UseFieldArrayReturn["append"];
  remove: UseFieldArrayReturn["remove"];
}

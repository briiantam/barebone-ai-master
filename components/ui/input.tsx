import * as React from "react";
import { cn } from "@/lib/utils";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string | number;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type = "text", label, ...props }, ref) => {
    const handleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
      let value = event.target.value.trim();
      if (type === "url" && value) {
        // Remove any existing protocol
        value = value.replace(/^(https?:\/\/)?(www\.)?/, "");

        // Add 'www.' if it's not present
        if (!value.startsWith("www.")) {
          value = "www." + value;
        }

        // Add 'http://' protocol
        value = "http://" + value;

        event.target.value = value;
      }
      if (props.onBlur) {
        props.onBlur(event);
      }
    };

    return (
      <div>
        {label && <label>{label}</label>}
        <input
          type={type}
          className={cn(
            "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
            className
          )}
          ref={ref}
          onBlur={handleBlur}
          {...props}
        />
      </div>
    );
  }
);
Input.displayName = "Input";

export { Input };

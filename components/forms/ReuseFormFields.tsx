import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Control, Path } from "react-hook-form";
import { z, ZodType } from "zod";

interface Props<TSchema extends ZodType> {
  control: Control<z.infer<TSchema>>;
  name: Path<z.infer<TSchema>>;
  formLabel: string;
  placeholder: string;
  type?: string;
}

export default function ReuseableFormFields<TSchema extends ZodType>({
  control,
  name,
  formLabel,
  placeholder,
  type,
}: Props<TSchema>) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{formLabel}</FormLabel>
          <FormControl>
            <Input
              placeholder={placeholder}
              type={type}
              {...field}
              className="border border-black dark:border-amber-100"
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

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
import Link from "next/link";

interface Props<TSchema extends ZodType> {
  control: Control<z.infer<TSchema>>;
  name: Path<z.infer<TSchema>>;
  formLabel: string;
  placeholder: string;
  type?: string;
  link?: {
    linkText: string;
    linkUrl: string;
  };
}

export default function ReuseableFormFields<TSchema extends ZodType>({
  control,
  name,
  formLabel,
  placeholder,
  type,
  link,
}: Props<TSchema>) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <div className="flex justify-between items-center">
            <FormLabel>{formLabel}</FormLabel>
            {link && (
              <Link
                href={link.linkUrl}
                className="font-semibold text-indigo-600 hover:text-indigo-500"
              >
                {link.linkText}
              </Link>
            )}
          </div>
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

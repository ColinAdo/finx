"use client";

import { ButtonProps } from "@/components/ui/button";
import { useFormStatus } from "react-dom";

type Props = ButtonProps & {
  children: React.ReactNode;
};

export default function SubmitButton({ children, ...props }: Props) {
  const { pending } = useFormStatus();

  return (
    <button type="submit" disabled={pending} {...props}>
      {children}
    </button>
  );
}

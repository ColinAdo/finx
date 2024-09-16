"use client";

import { Button } from "@/components/ui/button";

interface Props {
  btnType: "submit" | "reset" | "button";
  disabled: boolean;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => Promise<void>;
  children: React.ReactNode;
}

export default function FormButton({
  btnType,
  disabled,
  onClick,
  children,
}: Props) {
  return (
    <Button
      type={btnType}
      className="flex justify-center"
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </Button>
  );
}

import { Button, ButtonProps } from "@/components/ui/button";

type Props = ButtonProps & {
  children: React.ReactNode;
};

export default function ActionIcon({ children, ...buttonProps }: Props) {
  return (
    <Button
      type="submit"
      variant={"ghost"}
      size={"icon"}
      className="h-9 w-9"
      {...buttonProps}
    >
      {children}
    </Button>
  );
}

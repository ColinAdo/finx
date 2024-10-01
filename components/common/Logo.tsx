import { View } from "lucide-react";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { calSans } from "@/app/fonts";

export default function Logo() {
  return (
    <Link
      href={"/dashboard"}
      className={buttonVariants({
        className:
          "hidden md:flex navLink !mb-10 lg:hover:bg-transparent lg:!p-0",
        variant: "ghost",
        size: "lg",
      })}
    >
      <View className="h-6 w-6 shrink-0 lg:hidden" />
      <p
        className={`font-semibold text-xl hidden lg:block ${calSans.className}`}
      >
        Finx
      </p>
    </Link>
  );
}

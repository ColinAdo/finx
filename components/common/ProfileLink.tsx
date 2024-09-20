"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import { buttonVariants } from "@/components/ui/button";
import { Spinner } from "@/components/common";
import { UserAvatar } from "@/components/common";
import { useRetrieveProfileQuery } from "@/redux/features/profileSlice";

export default function ProfileLink() {
  const pathname = usePathname();
  const { data, isLoading } = useRetrieveProfileQuery();

  const href = `/dashboard/profile/${data?.profile.username}/`;
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      className={buttonVariants({
        variant: isActive ? "secondary" : "ghost",
        className: "navLink",
        size: "lg",
      })}
    >
      {isLoading ? (
        <Spinner sm />
      ) : (
        <UserAvatar
          className={`h-6 w-6 ${isActive && "border-2 border-white"}`}
        />
      )}

      <p
        className={`${cn("hidden lg:block", {
          "font-extrabold": isActive,
        })}`}
      >
        Profile
      </p>
    </Link>
  );
}

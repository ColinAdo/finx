"use client";

import { UserAvatar } from "@/components/common";
import { ProfileForm } from "@/components/profile";
import { useRetrieveProfileQuery } from "@/redux/features/profileSlice";
import { EllipsisVertical } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Messages } from "@/components/profile";

export default function EditProfile() {
  const { data: profile } = useRetrieveProfileQuery();

  if (!profile) {
    return;
  }

  return (
    <div className="px-12 h-screen lg:w-full">
      <Messages recipientProfile={profile} />
    </div>
  );
}

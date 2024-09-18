"use client";

import { ActionIcons } from "@/components/post";
import { Link, Send } from "lucide-react";
import { toast } from "sonner";

interface Props {
  postId: number;
}

function ShareButton({ postId }: Props) {
  return (
    <ActionIcons
      onClick={() => {
        navigator.clipboard.writeText(
          `${window.location.origin}/dashboard/p/${postId}`
        );
        toast.success("Link copied to clipboard", {
          icon: <Link className={"h-5 w-5"} />,
        });
      }}
    >
      <Send className={"h-6 w-6"} />
    </ActionIcons>
  );
}

export default ShareButton;

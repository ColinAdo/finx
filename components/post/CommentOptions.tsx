"use client";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";
import { SubmitButton } from "@/components/post";
import { MoreHorizontal } from "lucide-react";
import { toast } from "sonner";

interface User {
  id: number;
  username: string;
  profile_picture: string;
}

interface Comment {
  id: number;
  owner: User;
  post: number;
  comment: string | null;
  comment_image?: string | null;
  created_at: Date;
}

interface Props {
  comment: Comment;
}

export default function CommentOptions({ comment }: Props) {
  const onSubmit = () => {};
  return (
    <Dialog>
      <DialogTrigger asChild>
        <MoreHorizontal className="h-5 w-5 hidden group-hover:inline cursor-pointer dark:text-neutral-400" />
      </DialogTrigger>
      <DialogContent className="dialogContent">
        <form onSubmit={onSubmit} className="postOption">
          <input type="hidden" name="id" value={comment.id} />
          <SubmitButton className="text-red-500 font-bold disabled:cursor-not-allowed w-full p-3">
            Delete
          </SubmitButton>
        </form>

        <DialogClose className="postOption border-0 w-full p-3">
          Cancel
        </DialogClose>
      </DialogContent>
    </Dialog>
  );
}

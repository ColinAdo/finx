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
import { FormEvent } from "react";
import {
  useDeleteCommentMutation,
  useGetPostQuery,
} from "@/redux/features/postSlice";
import { useRetrieveUserQuery } from "@/redux/features/authApiSlice";

interface ProfileData {
  profile: {
    id: number;
    email: string;
    username: string;
    bio: string;
    profile_picture: string;
    website: string;
    gender: string;
  };
  following: any[];
  followers: any[];
  posts: any[];
  following_count: number;
  followers_count: number;
}

interface Comment {
  id: number;
  owner: ProfileData;
  post: number;
  comment: string | null;
  comment_image?: string | null;
  created_at: Date;
}

interface Props {
  comment: Comment;
}

export default function CommentOptions({ comment }: Props) {
  const [deleteComment] = useDeleteCommentMutation();
  const { data: user } = useRetrieveUserQuery();
  const { refetch } = useGetPostQuery();

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      await deleteComment(comment.id).unwrap();
      refetch();
      toast.success("Comment deleted successfully");
    } catch (error) {
      toast.error("Error deleting comment");
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <MoreHorizontal className="h-5 w-5 hidden group-hover:inline cursor-pointer dark:text-neutral-400" />
      </DialogTrigger>
      <DialogContent className="dialogContent">
        {comment.owner.profile.id === user?.id && (
          <form onSubmit={onSubmit} className="postOption">
            <input type="hidden" name="id" value={comment.id} />
            <SubmitButton className="text-red-500 font-bold disabled:cursor-not-allowed w-full p-3">
              Delete
            </SubmitButton>
          </form>
        )}

        <DialogClose className="postOption border-0 w-full p-3">
          Cancel
        </DialogClose>
      </DialogContent>
    </Dialog>
  );
}

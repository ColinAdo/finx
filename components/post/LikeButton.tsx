"use client";

import { cn } from "@/lib/utils";
import { Heart } from "lucide-react";
import { toast } from "sonner";
import { FormEvent, useOptimistic, useState } from "react";
import { ActionIcons } from "@/components/post";
import { useRetrieveUserQuery } from "@/redux/features/authApiSlice";
import {
  useLikePostMutation,
  useGetPostQuery,
} from "@/redux/features/postSlice";

interface User {
  id: number;
}

interface Like {
  user: User;
}

interface Post {
  id: number;
  likes: Like[];
  likes_count: number;
}

export default function LikeButton({ post }: { post: Post }) {
  const [likePost] = useLikePostMutation();
  const { refetch } = useGetPostQuery();
  const { data } = useRetrieveUserQuery();

  const initialLiked = post.likes.some((like) => like.user.id === data?.id);
  const [liked, setLiked] = useState(initialLiked);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      await likePost(post.id).unwrap();
      refetch();
      setLiked((prevLiked) => !prevLiked);
    } catch (error) {
      toast.error("Error liking post");
    }
  };

  return (
    <div className="flex flex-col">
      <form onSubmit={handleSubmit}>
        <input type="hidden" name="post" value={post.id} />

        <ActionIcons>
          <Heart
            className={cn("h-6 w-6", {
              "text-red-500 fill-red-500": liked,
              "dark:text-gray-100 text-gray-950": !liked,
            })}
          />
        </ActionIcons>
      </form>
      {post.likes_count > 0 && (
        <p className="text-sm font-bold dark:text-white">
          {post.likes_count} {post.likes_count === 1 ? "like" : "likes"}
        </p>
      )}
    </div>
  );
}

"use client";

import { cn } from "@/lib/utils";
import { FormEvent, useEffect, useState } from "react";
import { ActionIcons } from "@/components/post";
import { Bookmark } from "lucide-react";
import { toast } from "sonner";
import { useRetrieveUserQuery } from "@/redux/features/authApiSlice";
import {
  useBookmarkPostMutation,
  useGetPostQuery,
} from "@/redux/features/postSlice";

interface User {
  id: number;
}

interface Bookmark {
  user: User;
}

interface Post {
  id: number;
  bookmarks: Bookmark[];
  bookmark_count: number;
}

export default function BookmarkButton({ post }: { post: Post }) {
  const [bookmarkPost] = useBookmarkPostMutation();
  const { refetch } = useGetPostQuery();
  const { data } = useRetrieveUserQuery();

  const initialBookmark = post.bookmarks.some(
    (bookmark) => bookmark.user.id === data?.id
  );

  const [bookmarked, setBookmarked] = useState(
    localStorage.getItem(`${post.id}-bookmarked`) === "true"
      ? true
      : initialBookmark
  );

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      await bookmarkPost(post.id).unwrap();
      refetch();
      setBookmarked((prevLiked) => !prevLiked);
      localStorage.setItem(`${post.id}-bookmarked`, String(bookmarked));
    } catch (error) {
      toast.error("Error bookmarking post");
    }
  };

  useEffect(() => {
    localStorage.setItem(`${post.id}-bookmarked`, String(bookmarked));
  }, [bookmarked, post.id]);

  return (
    <form onSubmit={handleSubmit} className="ml-auto">
      <input type="hidden" name="post" value={post.id} />
      <ActionIcons>
        <Bookmark
          className={cn("h-6 w-6", {
            "dark:fill-white fill-black": bookmarked,
            "dark:text-gray-100 text-gray-950": !bookmarked,
          })}
        />
      </ActionIcons>
    </form>
  );
}

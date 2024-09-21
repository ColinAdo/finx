import { cn } from "@/lib/utils";
import { MessageCircle } from "lucide-react";
import Link from "next/link";
import {
  LikeButton,
  ActionIcons,
  ShareButton,
  BookmarkButton,
} from "@/components/post";

interface User {
  id: number;
}

interface Like {
  user: User;
}

interface Bookmark {
  user: User;
}

interface Post {
  id: number;
  fileUrl: string;
  likes: Like[];
  likes_count: number;
  bookmarks: Bookmark[];
  bookmark_count: number;
  comments_count: number;
}

interface Props {
  post: Post;
  className?: string;
}

function PostActions({ post, className }: Props) {
  return (
    <div className={cn("relative flex items-start w-full gap-x-2", className)}>
      <LikeButton post={post} />
      <div className="flex items-center space-x-2">
        <Link
          href={
            post.comments_count > 0
              ? `/dashboard/c/${post.id}`
              : `/dashboard/p/${post.id}`
          }
        >
          <ActionIcons>
            <MessageCircle className={"h-6 w-6"} />
          </ActionIcons>
        </Link>
        {post.comments_count > 0 && (
          <p className="text-sm font-bold dark:text-white">
            {post.comments_count}
          </p>
        )}
      </div>
      <ShareButton postId={post.id} />
      <BookmarkButton post={post} />
    </div>
  );
}

export default PostActions;

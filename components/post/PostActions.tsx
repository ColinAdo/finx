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
  likes: Like[];
  likes_count: number;
  bookmarks: Bookmark[];
  bookmark_count: number;
}

interface Props {
  post: Post;
  className?: string;
}

function PostActions({ post, className }: Props) {
  return (
    <div className={cn("relative flex items-start w-full gap-x-2", className)}>
      <LikeButton post={post} />
      <Link href={`/dashboard/p/${post.id}`}>
        <ActionIcons>
          <MessageCircle className={"h-6 w-6"} />
        </ActionIcons>
      </Link>
      <ShareButton postId={post.id} />
      <BookmarkButton post={post} />
    </div>
  );
}

export default PostActions;
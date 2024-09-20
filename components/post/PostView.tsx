"use client";

// import CommentForm from "@/components/CommentForm";
import { PostActions } from "@/components/post";
import { UserAvatar } from "@/components/common";
// import ViewPost from "@/components/ViewPost";
import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useMount } from "@/hooks";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useRef } from "react";
import { useRetrieveProfileQuery } from "@/redux/features/profileSlice";
import { MiniPost, Comment, CommentForm } from "@/components/post";
import { ViewPost } from "@/components/post";

interface User {
  id: number;
  username: string;
  profile_picture: string;
}

interface PostComment {
  id: number;
  owner: User;
  post: number;
  comment: string | null;
  comment_image?: string | null;
  created_at: Date;
}

interface Like {
  id: number;
  user: User;
  post: number;
  created_at: Date | null;
}

interface Bookmark {
  id: number;
  user: User;
  post: number;
  created_at: Date | null;
}

interface Post {
  id: number;
  author: User;
  fileUrl: string;
  caption: string | null;
  created_at: Date;
  comments: PostComment[];
  comments_count: number;
  likes: Like[];
  likes_count: number;
  bookmarks: Bookmark[];
  bookmark_count: number;
}

interface Props {
  postId: number;
  post: Post;
  className?: string;
  inputRef?: React.Ref<HTMLInputElement>;
}

export default function PostView({ postId, post }: Props) {
  const { data } = useRetrieveProfileQuery();
  const pathname = usePathname();
  const isPostModal = pathname === `/dashboard/p/${postId}`;
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const username = post?.author.username;
  const href = `/dashboard/${username}`;
  const mount = useMount();

  if (!mount) return null;

  return (
    <Dialog open={isPostModal} onOpenChange={(open) => !open && router.back()}>
      <DialogContent className="flex gap-0 flex-col md:flex-row items-start p-0 md:max-w-3xl lg:max-w-5xl xl:max-w-6xl h-full max-h-[500px] lg:max-h-[700px] xl:max-h-[800px]">
        <div className="flex flex-col justify-between md:h-full md:order-2 w-full max-w-md">
          <DialogHeader className="flex border-b space-y-0 space-x-2.5 flex-row items-center py-4 pl-3.5 pr-6">
            <Link href={href}>
              <UserAvatar />
            </Link>
            <Link href={href} className="font-semibold text-sm">
              {username}
            </Link>
          </DialogHeader>
          <ScrollArea className="hidden md:inline border-b flex-1 py-1.5">
            <MiniPost post={post} />
            {post.comments_count > 0 && (
              <>
                {post.comments.map((comment) => {
                  return (
                    <Comment
                      key={comment.id}
                      comment={comment}
                      inputRef={inputRef}
                    />
                  );
                })}
              </>
            )}
          </ScrollArea>
          <ViewPost className="hidden md:flex border-b" />
          <div className="px-2 hidden md:block mt-auto border-b p-2.5">
            <PostActions post={post} />
            <time className="text-[11px]  uppercase text-zinc-500 font-medium">
              {new Date(post.created_at).toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
              })}
            </time>
          </div>
          <CommentForm
            postId={post.id}
            profilePic={post.author.profile_picture}
            className="hidden md:inline-flex"
            inputRef={inputRef}
          />
        </div>
        <div className="relative overflow-hidden h-96 md:h-[500px] lg:h-[700px] xl:h-[800px] max-w-3xl w-full">
          <Image
            src={post?.fileUrl || "default.png"}
            fill
            objectFit="cover"
            alt="Post Image"
            className="md:rounded-l-md object-cover"
          />
        </div>

        <div className="flex flex-col lg:collapse md:collapse w-full">
          <PostActions post={post} className="md:hidden border-b p-2.5" />
          <CommentForm
            profilePic={post.author.profile_picture}
            postId={post.id}
            className="md:hidden"
            inputRef={inputRef}
          />
          <ViewPost className="md:hidden" />
        </div>
      </DialogContent>
    </Dialog>
  );
}

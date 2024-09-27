"use client";

import Link from "next/link";
import { PostOptions } from "@/components/post";
import { UserAvatar } from "@/components/common";
import Timestamp from "./Timestamp";

interface User {
  id: number;
  username: string;
  profile_picture: string;
  email: string;
  profession: string;
  github: string;
  instagram: string;
  linkedin: string;
  x: string;
}

interface Comment {
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
  comments: Comment[];
  comments_count: number;
  likes: Like[];
  likes_count: number;
  bookmarks: Bookmark[];
  bookmark_count: number;
}

interface Props {
  post: Post;
}

function MiniPost({ post }: Props) {
  const username = post.author.username;
  const href = `/dashboard/${username}`;

  return (
    <div className="group flex items-start space-x-2.5">
      <Link href={href}>
        <UserAvatar user={post.author} />
      </Link>
      <div className="flex-1">
        <div className="flex items-center justify-between space-x-1.5 leading-none text-sm">
          <Link href={href} className="font-semibold mx-0">
            {username}
          </Link>
          <small>{post.comments_count > 1 && "Comments"}</small>
          <div className="flex items-center space-x-2.5">
            <Timestamp createdAt={post.created_at} />
            <PostOptions
              post={post}
              userId={post.author.id}
              className="hidden group-hover:inline"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default MiniPost;

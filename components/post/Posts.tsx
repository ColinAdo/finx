"use client";

import Image from "next/image";
import Link from "next/link";
// import Comments from "./Comments";
import { Card } from "@/components/ui/card";
import { PostOptions } from "@/components/post";
import { useGetPostQuery } from "@/redux/features/postSlice";
import { Spinner } from "@/components/common";
import { Avatar } from "@/components/ui/avatar";
import { Timestamp, PostActions } from "@/components/post";

export default function Post() {
  const { data: posts, isLoading } = useGetPostQuery();

  if (isLoading) {
    return (
      <div className="flex justify-center my-8">
        <Spinner lg />
      </div>
    );
  }

  return (
    <div>
      {posts?.map((post) => (
        <div className="flex flex-col space-y-2.5">
          <div className="flex items-center justify-between px-3 sm:px-0">
            <div className="flex space-x-3 items-center">
              <Link href={`/dashboard/profile/username`}>
                <Avatar className="relative h-6 w-6 cursor-pointer">
                  <Image
                    src={`${post.author.profile_picture}`}
                    fill
                    alt={`username's avatar`}
                    className="rounded-full object-cover"
                  />
                </Avatar>
              </Link>
              <div className="text-sm">
                <p className="space-x-1">
                  <span className="font-semibold">{post.author.username}</span>
                  <span
                    className="font-medium text-neutral-500 dark:text-neutral-400
                      text-xs
                    "
                  >
                    •
                  </span>
                  <Timestamp createdAt={post.created_at} />
                </p>
                <p className="text-xs text-black dark:text-white font-medium">
                  Dubai, United Arab Emirates
                </p>
              </div>
            </div>
            <PostOptions post={post} userId={post.author.id} />
          </div>
          <Card className="relative h-[450px] w-full overflow-hidden rounded-none sm:rounded-md">
            <Image
              src={`${post.fileUrl}`}
              alt="Post Image"
              fill
              className="sm:rounded-md object-cover"
            />
          </Card>
          <PostActions post={post} className="px-3 sm:px-0" />
          {post.caption && (
            <div className="text-sm leading-none flex items-center space-x-2 font-medium px-3 sm:px-0">
              <Link href={`/dashboard/username`} className="font-bold">
                {post.author.username}
              </Link>
              <p>{post.caption}</p>
            </div>
          )}
          Comment
        </div>
      ))}
    </div>
  );
}
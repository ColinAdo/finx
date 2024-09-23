"use client";

import { MorePosts, PostView } from "@/components/post";
import { useRetrievePostQuery } from "@/redux/features/postSlice";
import { Suspense } from "react";
import { SinglePostSkeleton } from "@/components/common/Skeletons";
import { Spinner } from "@/components/common";
import { Separator } from "@/components/ui/separator";

interface Props {
  params: {
    id: number;
  };
}

export default function PostModal({ params: { id } }: Props) {
  const { data: post } = useRetrievePostQuery(id);

  if (!post) {
    return;
  }

  return (
    <div>
      <Suspense fallback={<SinglePostSkeleton />}>
        <PostView postId={id} post={post} />
      </Suspense>

      <Separator className="hidden lg:block my-12 max-w-3xl lg:max-w-4xl mx-auto" />

      <Suspense fallback={<Spinner sm />}>
        <MorePosts post={post} />
      </Suspense>
    </div>
  );
}

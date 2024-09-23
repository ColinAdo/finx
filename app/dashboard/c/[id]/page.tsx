"use client";

import { CommentView } from "@/components/post";
import { useRetrievePostQuery } from "@/redux/features/postSlice";
import { Suspense } from "react";
import { SinglePostSkeleton } from "@/components/common/Skeletons";

interface Props {
  params: {
    id: number;
  };
}

export default function CommentModal({ params: { id } }: Props) {
  const { data: post } = useRetrievePostQuery(id);

  if (!post) {
    return;
  }

  return (
    <div>
      <Suspense fallback={<SinglePostSkeleton />}>
        <CommentView postId={id} post={post} />
      </Suspense>
    </div>
  );
}

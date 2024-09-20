"use client";

import PostView from "@/components/post/PostView";
import { notFound } from "next/navigation";
import { useRetrievePostQuery } from "@/redux/features/postSlice";

interface Props {
  params: {
    id: number;
  };
}

export default function PostModal({ params: { id } }: Props) {
  const { data: post } = useRetrievePostQuery(id);

  if (!post) {
    return;
    // return <h2>Error fetching</h2>; notFound();
  }

  return <PostView postId={id} post={post} />;
}

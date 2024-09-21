"use client";

import { PostView } from "@/components/post";
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
  }

  return <PostView postId={id} post={post} />;
}

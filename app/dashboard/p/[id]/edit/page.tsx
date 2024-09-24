"use client";

import { EditPost } from "@/components/post";
import { useRetrievePostQuery } from "@/redux/features/postSlice";

type Props = {
  params: {
    id: number;
  };
};

export default function EditPostPage({ params: { id } }: Props) {
  const { data: post } = useRetrievePostQuery(id);

  if (!post) {
    return;
  }

  return <EditPost postId={id} post={post} />;
}

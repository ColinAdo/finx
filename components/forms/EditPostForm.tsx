"use client";

import { AspectRatio } from "@/components/ui/aspect-ratio";
import { useState, FormEvent } from "react";
import { useMount } from "@/hooks";
import { toast } from "sonner";
import Image from "next/image";
import {
  useUpdatePostMutation,
  useGetPostQuery,
} from "@/redux/features/postSlice";
import { FormButton, Spinner } from "@/components/common";
import { useRouter } from "next/navigation";

interface Post {
  id: number;
  fileUrl: string;
  caption: string;
}

interface Props {
  post: Post;
}

export default function EditPostForm({ post }: Props) {
  const [updatePost, { isLoading }] = useUpdatePostMutation();
  const { refetch } = useGetPostQuery();
  const router = useRouter();
  const mount = useMount();

  const [caption, setCaption] = useState(post.caption || "");

  if (!mount) return null;

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      await updatePost({
        postId: post.id,
        caption,
      }).unwrap();

      refetch();
      router.push("/dashboard");
      toast.success("Post updated successfully!");
    } catch (error) {
      toast.error("Failed to update the post.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {post?.fileUrl && (
        <div className="h-80 md:h-[400px] overflow-hidden rounded-md">
          <AspectRatio ratio={1 / 1} className="relative h-full">
            {post?.fileUrl.endsWith(".mp4") ? (
              <video
                controls
                className="rounded-md object-cover"
                width="100%"
                height="auto"
              >
                <source src={post?.fileUrl} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            ) : (
              <Image
                src={post?.fileUrl}
                alt="Post preview"
                fill
                className="rounded-md object-cover"
              />
            )}
          </AspectRatio>
        </div>
      )}

      <div>
        <label
          htmlFor="caption"
          className="block text-sm font-bold my-2 text-black dark:text-white"
        >
          Caption
        </label>
        <input
          type="text"
          id="caption"
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
          placeholder="Write a caption..."
          className="mt-1 block w-full hover:border-none rounded-md border-gray-300 shadow-sm focus:border-black dark:bg-black text-black dark:text-white focus:ring dark:focus:ring-white "
        />
      </div>

      <div className="flex justify-between">
        <FormButton btnType="submit" disabled={isLoading}>
          {isLoading ? <Spinner sm /> : "Update Post"}
        </FormButton>
      </div>
    </form>
  );
}

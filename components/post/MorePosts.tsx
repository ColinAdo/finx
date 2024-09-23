import Link from "next/link";
import { PostsGrid } from "@/components/post";
import { useGetUserPostQuery } from "@/redux/features/postSlice";

interface User {
  username: string;
}

interface Post {
  id: number;
  author: User;
  comments_count: number;
  likes_count: number;
  bookmark_count: number;
}

interface Props {
  post: Post;
}

export default function MorePosts({ post }: Props) {
  const { data: posts } = useGetUserPostQuery(post.id);

  if (!posts) {
    return;
  }

  return (
    <div className="flex flex-col space-y-3 max-w-3xl lg:max-w-4xl mx-auto pb-20">
      <p className="font-semibold text-sm text-neutral-600 dark:text-neutral-400">
        More posts from{" "}
        <Link
          href={`/dashboard/${post.author.username}`}
          className="dark:text-white text-black hover:opacity-50"
        >
          {post.author.username}
        </Link>{" "}
      </p>

      <PostsGrid posts={posts} />
    </div>
  );
}

import { HeartIcon, MessageCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface User {
  id: number;
  username: string;
  profile_picture: string;
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
  posts: Post[];
}

export default function PostsGrid({ posts }: Props) {
  if (posts?.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center space-y-3 max-w-3xl lg:max-w-4xl mx-auto pb-20">
        <p className="font-semibold text-sm text-neutral-400">No more posts.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-3 gap-0.5">
      {posts?.map((post) => (
        <Link
          href={`/dashboard/p/${post.id}`}
          key={post.id}
          className="relative flex items-center justify-center h-44 md:h-64 lg:h-80 group col-span-1"
        >
          <Image
            src={post.fileUrl}
            fill
            alt="Post preview"
            className="object-cover -z-10 transition group-hover:filter group-hover:blur-[2px] group-hover:brightness-90"
          />
          <div className="opacity-0 group-hover:opacity-100 flex transition items-center justify-center space-x-6">
            {post.likes.length > 0 && (
              <div className="flex items-center font-bold space-x-1">
                <HeartIcon className="text-white fill-white" />
                <p className="text-white">{post.likes.length}</p>
              </div>
            )}

            {post.comments.length > 0 && (
              <div className="flex items-center font-bold space-x-1">
                <MessageCircle className="text-white fill-white" />
                <p className="text-white">{post.comments.length}</p>
              </div>
            )}
          </div>
        </Link>
      ))}
    </div>
  );
}

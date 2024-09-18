import { apiSlice } from "../services/apiSlice";

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
}

const postSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createPost: builder.mutation({
      query: ({ caption, fileUrl }) => ({
        url: "/posts/",
        method: "POST",
        body: { caption, fileUrl },
      }),
    }),
    getPost: builder.query<Post[], void>({
      query: () => ({
        url: "/posts/",
      }),
    }),
    deletePost: builder.mutation<void, number>({
      query: (postId) => ({
        url: `/posts/${postId}/`,
        method: "DELETE",
      }),
    }),
  }),
});

export const { useCreatePostMutation, useGetPostQuery, useDeletePostMutation } =
  postSlice;

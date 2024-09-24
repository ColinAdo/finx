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
    getUserPost: builder.query<void, number>({
      query: (postId) => ({
        url: `/posts/${postId}/author-posts/`,
      }),
    }),
    retrievePost: builder.query<void, number>({
      query: (postId) => ({
        url: `/posts/${postId}/`,
      }),
    }),
    deletePost: builder.mutation<void, number>({
      query: (postId) => ({
        url: `/posts/${postId}/`,
        method: "DELETE",
      }),
    }),
    updatePost: builder.mutation({
      query: ({ postId, caption }) => ({
        url: `/posts/${postId}/`,
        method: "PUT",
        body: { caption },
      }),
    }),
    likePost: builder.mutation<void, number>({
      query: (postId) => ({
        url: `/like/${postId}/`,
        method: "POST",
      }),
    }),
    bookmarkPost: builder.mutation<void, number>({
      query: (postId) => ({
        url: `/bookmark/${postId}/`,
        method: "POST",
      }),
    }),
    commentOnPost: builder.mutation({
      query: ({ post, comment, comment_image }) => ({
        url: "/comment/",
        method: "POST",
        body: { post, comment, comment_image },
      }),
    }),
    deleteComment: builder.mutation({
      query: (commentId) => ({
        url: `/comment/${commentId}/`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useCreatePostMutation,
  useGetPostQuery,
  useRetrievePostQuery,
  useDeletePostMutation,
  useLikePostMutation,
  useBookmarkPostMutation,
  useCommentOnPostMutation,
  useGetUserPostQuery,
  useUpdatePostMutation,
  useDeleteCommentMutation,
} = postSlice;

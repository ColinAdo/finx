import { apiSlice } from "../services/apiSlice";

const postSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createPost: builder.mutation({
      query: ({ caption, fileUrl }) => ({
        url: "/posts/",
        method: "POST",
        body: { caption, fileUrl },
      }),
    }),
  }),
});

export const { useCreatePostMutation } = postSlice;

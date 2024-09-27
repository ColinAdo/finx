import { apiSlice } from "../services/apiSlice";

interface ProfileData {
  profile: {
    id: number;
    email: string;
    username: string;
    profile_picture: string;
    profession: string;
    github: string;
    instagram: string;
    linkedin: string;
    x: string;
  };
  following: any[];
  followers: any[];
  posts: any[];
  following_count: number;
  followers_count: number;
}

const profileSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    retrieveProfile: builder.query<ProfileData, void>({
      query: () => "/profile/me/",
    }),
    retrieveUsersProfile: builder.query<ProfileData, string>({
      query: (username) => `/users/p/${username}/`,
    }),
    updateProfile: builder.mutation({
      query: ({
        userId,
        email,
        username,
        profile_picture,
        profession,
        github,
        instagram,
        linkedin,
        x,
      }) => ({
        url: `/profile/${userId}/`,
        method: "PUT",
        body: {
          email,
          username,
          profile_picture,
          profession,
          github,
          instagram,
          linkedin,
          x,
        },
      }),
    }),
    followProfile: builder.mutation({
      query: (profileId) => ({
        url: `/connect/${profileId}/`,
        method: "POST",
      }),
    }),
  }),
});

export const {
  useRetrieveProfileQuery,
  useRetrieveUsersProfileQuery,
  useUpdateProfileMutation,
  useFollowProfileMutation,
} = profileSlice;

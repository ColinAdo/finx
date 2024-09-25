import { apiSlice } from "../services/apiSlice";

interface ProfileData {
  profile: {
    id: number;
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
  }),
});

export const { useRetrieveProfileQuery, useRetrieveUsersProfileQuery } =
  profileSlice;

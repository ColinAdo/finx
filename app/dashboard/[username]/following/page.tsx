"use client";

import { FollowingModal } from "@/components/profile";
import { useRetrieveUsersProfileQuery } from "@/redux/features/profileSlice";

interface Props {
  params: {
    username: string;
  };
}

export default function FollowersPage({ params: { username } }: Props) {
  const { data } = useRetrieveUsersProfileQuery(username);

  const following = data?.following;
  if (!data) {
    return;
  }

  return <FollowingModal following={following} username={username} />;
}

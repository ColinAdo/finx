"use client";
// import { auth } from "@/auth";
// import FollowButton from "@/components/FollowButton";
// import ProfileAvatar from "@/components/ProfileAvatar";
// import ProfileHeader from "@/components/ProfileHeader";
// import ProfileTabs from "@/components/ProfileTabs";
// import UserAvatar from "@/components/UserAvatar";
import { Button, buttonVariants } from "@/components/ui/button";
// import { fetchProfile } from "@/lib/data";
import { MoreHorizontal, Settings } from "lucide-react";
import Link from "next/link";
import { useRetrieveUsersProfileQuery } from "@/redux/features/profileSlice";
import { useRetrieveUserQuery } from "@/redux/features/authApiSlice";
import { ProfileAvatar, ProfileHeader } from "@/components/profile";
import { UserAvatar } from "@/components/common";

type Props = {
  params: {
    username: string;
  };
  children: React.ReactNode;
};

export default function ProfileLayout({
  children,
  params: { username },
}: Props) {
  const { data: profile } = useRetrieveUsersProfileQuery(username);
  const { data: user } = useRetrieveUserQuery();
  const isCurrentUser = profile?.profile.id === user?.id;
  //   the followerId here is the id of the user who is following the profile
  //   const isFollowing = profile?.followedBy.some(
  //     (user) => user.followerId === session?.user.id
  //   );

  if (!profile) {
    return;
  }
  return (
    <>
      <ProfileHeader username={profile.profile.username} />
      <div className="max-w-4xl mx-auto">
        <div className="flex gap-x-5 md:gap-x-10 px-4">
          <ProfileAvatar user={profile?.profile}>
            <UserAvatar className="w-20 h-20 md:w-36 md:h-36 cursor-pointer" />
          </ProfileAvatar>

          <div className="md:px-10 space-y-4">
            <div className="grid grid-cols-2 md:grid-cols-4 items-center gap-3">
              <p className="font-semibold text-xl">
                {profile.profile.username}
              </p>
              {isCurrentUser ? (
                <>
                  <Button
                    size={"icon"}
                    variant={"ghost"}
                    className="md:order-last"
                  >
                    <Settings />
                  </Button>
                  <Link
                    href={`/dashboard/edit-profile`}
                    className={buttonVariants({
                      className: "!font-bold",
                      variant: "secondary",
                      size: "sm",
                    })}
                  >
                    Edit profile
                  </Link>
                  <Button
                    variant={"secondary"}
                    className="font-bold"
                    size={"sm"}
                  >
                    View archive
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    size={"icon"}
                    variant={"ghost"}
                    className="md:order-last"
                  >
                    <MoreHorizontal />
                  </Button>
                  {/* <FollowButton
                    isFollowing={isFollowing}
                    profileId={profile.id}
                  /> */}
                  <Button
                    variant={"secondary"}
                    className="font-bold"
                    size={"sm"}
                  >
                    Message
                  </Button>
                </>
              )}
            </div>

            <div className="flex items-center gap-x-7">
              <p className="font-medium">
                <strong>{profile.posts.length} posts</strong>
              </p>

              <Link
                href={`/dashboard/${profile.profile.username}/followers`}
                className="font-medium"
              >
                <strong>{profile.followers_count}</strong> followers
              </Link>

              <Link
                href={`/dashboard/${profile.profile.username}/following`}
                className="font-medium"
              >
                <strong>{profile.following_count}</strong> following
              </Link>
            </div>

            <div className="text-sm">
              <div className="font-bold my-2">{profile.profile.username}</div>
              {profile.profile.profession && (
                <p>{profile.profile.profession}</p>
              )}
              {profile.profile.github && <p>{profile.profile.github}</p>}
              {profile.profile.linkedin && <p>{profile.profile.linkedin}</p>}
            </div>
          </div>
        </div>

        {/* <ProfileTabs profile={profile} isCurrentUser={isCurrentUser} /> */}

        {children}
      </div>
    </>
  );
}

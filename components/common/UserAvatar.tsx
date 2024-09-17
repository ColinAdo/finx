import { Avatar } from "@/components/ui/avatar";
import { Spinner } from "@/components/common";
import Image from "next/image";
import Link from "next/link";
import { useRetrieveProfileQuery } from "@/redux/features/profileSlice";
import { AvatarProps } from "@radix-ui/react-avatar";

type Props = Partial<AvatarProps>;

export default function UserAvatar({ ...avaterProps }: Props) {
  const { data: profile, isLoading } = useRetrieveProfileQuery();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center">
        <Spinner sm />
      </div>
    );
  }
  console.log("Context data: ", profile);

  const profileUrl = `/dashboard/profile/${profile?.profile.username}/`;

  return (
    <Link href={profileUrl}>
      <Avatar className="relative h-6 w-6 cursor-pointer">
        <Image
          src={profile?.profile.profile_picture || "/default-avatar.png"}
          fill
          alt={`${profile?.profile.username}'s avatar`}
          className="rounded-full object-cover"
        />
      </Avatar>
    </Link>
  );
}

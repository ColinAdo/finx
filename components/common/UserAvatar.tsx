import { Avatar } from "@/components/ui/avatar";
import { Spinner } from "@/components/common";
import Image from "next/image";
import Link from "next/link";
import { useRetrieveProfileQuery } from "@/redux/features/profileSlice";
import { AvatarProps } from "@radix-ui/react-avatar";

type Props = Partial<AvatarProps>;

export default function UserAvatar({ ...avaterProps }: Props) {
  const { data: profile } = useRetrieveProfileQuery();

  const profileUrl = `/dashboard/profile/${profile?.profile.username}/`;

  return (
    <Link href={profileUrl}>
      <Avatar className="relative h-6 w-6 cursor-pointer">
        {profile?.profile.profile_picture ? (
          <Image
            src={profile?.profile.profile_picture}
            fill
            alt={`${profile?.profile.username}'s avatar`}
            className="rounded-full object-cover"
          />
        ) : (
          <Spinner sm />
        )}
      </Avatar>
    </Link>
  );
}

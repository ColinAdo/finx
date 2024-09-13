import { Avatar } from "@/components/ui/avatar";
import { Spinner } from "@/components/common";
import Image from "next/image";
import Link from "next/link";
import { useRetrieveProfileQuery } from "@/redux/features/profileSlice";
import { AvatarProps } from "@radix-ui/react-avatar";

type Props = Partial<AvatarProps>;

export default function UserAvatar({ ...avaterProps }: Props) {
  const { data, isLoading } = useRetrieveProfileQuery();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center">
        <Spinner sm />
      </div>
    );
  }

  const profileUrl = `/dashboard/profile/${data?.profile.owner}/`;

  return (
    <Link href={profileUrl}>
      <Avatar className="relative h-6 w-6 cursor-pointer">
        <Image
          src={data?.profile.profile_picture || "/default-avatar.png"}
          fill
          alt={`${data?.profile.owner}'s avatar`}
          className="rounded-full object-cover"
        />
      </Avatar>
    </Link>
  );
}

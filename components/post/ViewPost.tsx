import { cn } from "@/lib/utils";
import Link from "next/link";

interface Props {
  className?: string;
  href: string;
}

function ViewPost({ className, href }: Props) {
  return (
    <div className={cn("flex p-3", className)}>
      <Link
        href={href}
        className="text-sky-500 hover:text-sky-700 font-semibold text-sm"
      >
        View post
      </Link>
    </div>
  );
}

export default ViewPost;

"use client";

import { usePathname, useRouter } from "next/navigation";
import { FormDialog } from "@/components/common";
import { EditPostForm } from "@/components/forms";

interface Post {
  id: number;
  fileUrl: string;
  caption: string;
}

interface Props {
  postId: number;
  post: Post;
}

export default function Page({ postId, post }: Props) {
  const router = useRouter();
  const pathname = usePathname();

  const isCreatePage = pathname === `/dashboard/p/${postId}/edit`;
  const onOpenChange = (open = isCreatePage) => {
    !open && router.back();
  };

  return (
    <div>
      <FormDialog
        requiredRoute={isCreatePage}
        onOpenChange={onOpenChange}
        dialogTitle="Edit post"
      >
        <EditPostForm post={post} />
      </FormDialog>
    </div>
  );
}

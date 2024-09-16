"use client";

import { usePathname, useRouter } from "next/navigation";
import { FormDialog } from "@/components/common";
import { CreatePostForm } from "@/components/forms";

export default function Page() {
  const router = useRouter();
  const pathname = usePathname();

  const isCreatePage = pathname === "/dashboard/create";
  const onOpenChange = (open = isCreatePage) => {
    !open && router.back();
  };

  return (
    <div>
      <FormDialog
        requiredRoute={isCreatePage}
        onOpenChange={onOpenChange}
        dialogTitle="Create new post"
      >
        <CreatePostForm />
      </FormDialog>
    </div>
  );
}

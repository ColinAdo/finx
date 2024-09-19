import { Suspense } from "react";
import { Posts } from "@/components/post";

export default function Page() {
  return (
    <main className="flex w-full flex-grow">
      <div className="flex flex-col flex-1 gap-y-8 max-w-lg mx-auto pb-20">
        <Suspense>
          <Posts />
        </Suspense>
      </div>
    </main>
  );
}

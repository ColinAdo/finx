"use client";

import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useMount } from "@/hooks";
import { CreatePost } from "@/lib/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Bell, CameraIcon } from "lucide-react";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { useEdgeStore } from "@/lib/edgestore";
import { useState } from "react";

export default function Page() {
  const [file, setFile] = useState<File>();
  const [progress, setProgress] = useState(0);
  const [fileUrl, setfileUrl] = useState<{
    url: string;
  }>();
  const { edgestore } = useEdgeStore();

  const pathname = usePathname();
  const isCreatePage = pathname === "/dashboard/create";
  const router = useRouter();
  const mount = useMount();
  const form = useForm<z.infer<typeof CreatePost>>({
    resolver: zodResolver(CreatePost),
    defaultValues: {
      caption: "",
    },
  });

  if (!mount) return null;

  const handleSubmit = (data: z.infer<typeof CreatePost>) => {
    router.push("/");
  };

  return (
    <div>
      <Dialog
        open={isCreatePage}
        onOpenChange={(open) => !open && router.back()}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create new post</DialogTitle>
          </DialogHeader>

          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleSubmit)}
              className="space-y-4"
            >
              {fileUrl ? (
                <div className="h-80 md:h-[300px] overflow-hidden rounded-md">
                  <AspectRatio ratio={1 / 1} className="relative h-full">
                    {fileUrl?.url.endsWith(".mp4") ? (
                      <video
                        controls
                        className="rounded-md object-cover"
                        width="100%"
                        height="auto"
                      >
                        <source src={fileUrl?.url} type="video/mp4" />
                        Your browser does not support the video tag.
                      </video>
                    ) : (
                      <Image
                        src={fileUrl?.url}
                        alt="Post preview"
                        fill
                        className="rounded-md object-cover"
                      />
                    )}
                  </AspectRatio>
                </div>
              ) : (
                <FormField
                  control={form.control}
                  name="fileUrl"
                  render={({ field, fieldState }) => (
                    <FormItem>
                      <FormControl>
                        <>
                          <label
                            htmlFor="fileInput"
                            className="flex justify-center cursor-pointer max-w-full p-3"
                          >
                            <CameraIcon className="flex justify-center items-center dark:text-gray-200 text-gray-900" />
                            <input
                              id="fileInput"
                              type="file"
                              className="hidden"
                              onChange={(e) => {
                                setFile(e.target.files?.[0]);
                              }}
                            />
                          </label>

                          <div className="h-[6px] max-w-full border rounded overflow-hidden">
                            <div
                              className="h-full bg-white transition-all duration-150"
                              style={{
                                width: `${progress}%`,
                              }}
                            />
                          </div>
                        </>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}

              {!!fileUrl && (
                <FormField
                  control={form.control}
                  name="caption"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel htmlFor="caption">Caption</FormLabel>
                      <FormControl>
                        <Input
                          type="caption"
                          id="caption"
                          placeholder="Write a caption..."
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}

              <div className="flex justify-between">
                <Button
                  type="submit"
                  className="flex justify-center"
                  disabled={!!fileUrl}
                  onClick={async () => {
                    if (file) {
                      const res = await edgestore.publicFiles.upload({
                        file,
                        // input: { type: "post" },
                        onProgressChange: (progress) => {
                          setProgress(progress);
                        },
                      });
                      // save your data here
                      setfileUrl({
                        url: res.url,
                        // thumbnailUrl: res.thumbnailUrl,
                      });
                    }
                  }}
                >
                  Next
                </Button>
                <Button
                  type="submit"
                  className="flex justify-center"
                  disabled={!fileUrl}
                >
                  Post
                </Button>
              </div>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
}

"use client";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  useRetrieveProfileQuery,
  useUpdateProfileMutation,
} from "@/redux/features/profileSlice";
import { useMount } from "@/hooks";
import { FormEvent, useState } from "react";
import { toast } from "sonner";
import { Spinner, UserAvatar } from "@/components/common";
import { useRetrieveUserQuery } from "@/redux/features/authApiSlice";
import { CameraIcon } from "lucide-react";
import { useEdgeStore } from "@/lib/edgestore";

interface User {
  id: number;
  email: string;
  username: string;
  profile_picture: string;
  profession: string;
  github: string;
  instagram: string;
  linkedin: string;
  x: string;
}

interface ProfilerProps {
  user: User;
  children: React.ReactNode;
}

export default function ProfileAvatar({ children, user }: ProfilerProps) {
  const [updateProfile] = useUpdateProfileMutation();
  const { refetch } = useRetrieveProfileQuery();
  const { data } = useRetrieveUserQuery();
  const isCurrentUser = data?.id === user.id;

  const [open, setOpen] = useState(false);
  const [progress, setProgress] = useState(0);
  const [file, setFile] = useState<File | null>(null);
  const [fileUrl, setFileUrl] = useState(user.profile_picture || " ");
  const [isUploading, setIsUploading] = useState(false);
  const { edgestore } = useEdgeStore();
  const mount = useMount();

  if (!mount) return null;

  console.log("Is Current user =====:", isCurrentUser);

  if (!isCurrentUser)
    return <UserAvatar user={user} className="w-20 h-20 md:w-36 md:h-36" />;

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];

    if (selectedFile) {
      setFile(selectedFile);
      setIsUploading(true);
      const res = await edgestore.publicFiles.upload({
        file: selectedFile,
        onProgressChange: (progress) => {
          setProgress(progress);
        },
      });

      setFileUrl(res.url);
      setIsUploading(false);
    }
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!fileUrl) {
      toast.error("No file uploaded!");
      return;
    }

    if (isUploading) {
      toast.error("Please wait for the file to finish uploading.");
      return;
    }

    try {
      await updateProfile({
        userId: user.id,
        email: user.email,
        username: user.username,
        profile_picture: fileUrl,
        profession: user.profession,
        github: user.github,
        instagram: user.instagram,
        linkedin: user.linkedin,
        x: user.x,
      }).unwrap();

      toast.success("Profile updated successfully");
      setOpen(!open);
      refetch();
      setFile(null);
    } catch (err) {
      toast.error("Profile update failed!");
      console.log("Update Failed:", err);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>

      <DialogContent className="dialogContent">
        <DialogHeader>
          <DialogTitle className="mx-auto font-medium text-xl py-5">
            Change Profile Photo
          </DialogTitle>
        </DialogHeader>

        {isCurrentUser && (
          <form onSubmit={handleSubmit}>
            <label>
              <div className="flex flex-col justify-center py-2 items-center cursor-pointer text-sky-500">
                <CameraIcon />
              </div>
              <input
                id="profile_picture"
                type="file"
                className="hidden"
                onChange={handleFileChange}
              />
            </label>

            {file && (
              <>
                <div className="h-[6px] max-w-full border rounded overflow-hidden">
                  <div
                    className="h-full bg-green-500 transition-all duration-150"
                    style={{ width: `${progress}%` }}
                  />
                </div>
                <div className="flex justify-center">
                  <button
                    type="submit"
                    disabled={isUploading}
                    className={`mt-4 p-2 flex justify-center items-center ${
                      isUploading ? "opacity-50" : ""
                    }`}
                  >
                    {isUploading ? <Spinner sm /> : "Submit"}
                  </button>
                </div>
              </>
            )}
          </form>
        )}

        <DialogClose className="postOption border-0 w-full p-3">
          Cancel
        </DialogClose>
      </DialogContent>
    </Dialog>
  );
}

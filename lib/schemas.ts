import { z } from "zod";

export const RegisterSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  email: z
    .string()
    .min(12, {
      message: "email must be at least 12 characters.",
    })
    .email(),
  password: z.string().min(8, {
    message: "password must be at least 8 characters.",
  }),
  re_password: z.string().min(8, {
    message: "password must be at least 8 characters.",
  }),
});

export const LoginSchema = z.object({
  email: z
    .string()
    .min(12, {
      message: "email must be at least 12 characters.",
    })
    .email(),
  password: z.string().min(8, {
    message: "password must be at least 8 characters.",
  }),
});

export const PasswordResetSchema = z.object({
  email: z
    .string()
    .min(12, {
      message: "email must be at least 12 characters.",
    })
    .email(),
});

export const PasswordResetConfirmSchema = z.object({
  new_password: z.string().min(8, {
    message: "password must be at least 8 characters.",
  }),
  re_new_password: z.string().min(8, {
    message: "password must be at least 8 characters.",
  }),
});

export const PostSchema = z.object({
  id: z.number(),
  fileUrl: z.string().url(),
  caption: z.string().optional(),
});

export const CreatePost = PostSchema.omit({ id: true });
export const UpdatePost = PostSchema;
export const DeletePost = PostSchema.pick({ id: true });

export const LikeSchema = z.object({
  postId: z.string(),
});

export const BookmarkSchema = z.object({
  postId: z.string(),
});

export const CommentSchema = z.object({
  id: z.number(),
  post: z.number(),
  comment: z.string().optional(),
  comment_image: z.string().optional(),
});

export const CreateComment = CommentSchema.omit({ id: true });
export const UpdateComment = CommentSchema;
export const DeleteComment = CommentSchema.pick({ id: true });

export const UserSchema = z.object({
  id: z.string(),
  username: z.string().optional(),
  name: z.string().optional(),
  image: z.string().optional(),
  bio: z.string().max(150).optional(),
  website: z.string().optional(),
  gender: z.string().optional(),
});

export const UpdateUser = UserSchema;
export const DeleteUser = UserSchema.pick({ id: true });
export const FollowUser = UserSchema.pick({ id: true });

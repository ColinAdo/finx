"use client";

import { usePassowrdResetConfirm } from "@/hooks";
import { Form } from "@/components/forms";

interface Props {
  uid: string;
  token: string;
}

export default function PasswordResetForm({ uid, token }: Props) {
  const { new_password, re_new_password, isLoading, onChange, onSubmit } =
    usePassowrdResetConfirm(uid, token);
  const config = [
    {
      lebalText: "New password",
      lebalId: "new_password",
      type: "password",
      value: new_password,
      required: true,
    },
    {
      lebalText: "New password confirm",
      lebalId: "re_new_password",
      type: "password",
      value: re_new_password,
      required: true,
    },
  ];
  return (
    <Form
      btnText="Reset password"
      config={config}
      isLoading={isLoading}
      onChange={onChange}
      onSubmit={onSubmit}
    />
  );
}

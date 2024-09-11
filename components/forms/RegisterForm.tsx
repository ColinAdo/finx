"use client";

import { useRegister } from "@/hooks";
import { Form } from "@/components/forms";

export default function RegiserForm() {
  const {
    username,
    email,
    password,
    re_password,
    isLoading,
    onChange,
    onSubmit,
  } = useRegister();
  const config = [
    {
      lebalText: "Username",
      lebalId: "username",
      type: "text",
      value: username,
      required: true,
    },
    {
      lebalText: "Email address",
      lebalId: "email",
      type: "email",
      value: email,
      required: true,
    },
    {
      lebalText: "Password",
      lebalId: "password",
      type: "password",
      value: password,
      required: true,
    },
    {
      lebalText: "Confirm password",
      lebalId: "re_password",
      type: "password",
      value: re_password,
      required: true,
    },
  ];
  return (
    <Form
      btnText="Sign up"
      config={config}
      isLoading={isLoading}
      onChange={onChange}
      onSubmit={onSubmit}
    />
  );
}

"use client";

import { useLogin } from "@/hooks";
import { Form } from "@/components/forms";

export default function LoginForm() {
  const { email, password, isLoading, onChange, onSubmit } = useLogin();
  const config = [
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
      link: {
        linkText: "Forgot password?",
        linkUrl: "/password-reset",
      },
      required: true,
    },
  ];
  return (
    <Form
      btnText="Sign in"
      config={config}
      isLoading={isLoading}
      onChange={onChange}
      onSubmit={onSubmit}
    />
  );
}

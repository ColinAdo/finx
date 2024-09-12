"use client";

import { usePassowrdReset } from "@/hooks";
import { Form } from "@/components/forms";

export default function PasswordResetForm() {
  const { email, isLoading, onChange, onSubmit } = usePassowrdReset();
  const config = [
    {
      lebalText: "Email address",
      lebalId: "email",
      type: "email",
      value: email,
      required: true,
    },
  ];
  return (
    <Form
      btnText="Request password reset"
      config={config}
      isLoading={isLoading}
      onChange={onChange}
      onSubmit={onSubmit}
    />
  );
}

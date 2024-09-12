import { useState, ChangeEvent, FormEvent } from "react";
import { toast } from "react-toastify";
import { usePasswordRestMutation } from "@/redux/features/authApiSlice";

export default function usePassowrdReset() {
  const [passwordReset, { isLoading }] = usePasswordRestMutation();

  const [email, setEmail] = useState("");

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    passwordReset(email)
      .unwrap()
      .then(() => {
        toast.success("Please check your email for a link");
      })
      .catch(() => {
        toast.error("Failed to request reset password!");
      });
  };
  return {
    email,
    isLoading,
    onChange,
    onSubmit,
  };
}

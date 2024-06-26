"use client";
import { Button, Input } from "@nextui-org/react";
import Link from "next/link";
import { FieldValues, useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import axios from "axios";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { UseMutationOptions, useMutation } from "@tanstack/react-query";
import { User } from "@/types";
import { getBaseUrl } from "@/lib/utils/getBaseUrl";

export default function Login() {
  const { handleLogin } = useAuth();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const loginMutation = async (data: User) => {
    const res = await axios.post(getBaseUrl() + "/api/login", data);
    return res.data;
  };

  const mutation = useMutation({
    mutationFn: loginMutation,
    onSuccess: (data: FieldValues) => {
      console.log("data", data);
      router.push("/");
      const email = data.userEmail;
      const userId = data.userId;
      const premium = data.premium;
      handleLogin(email, userId, premium);
      toast.success("Signed in");
      console.log("data", data);
    },
    onError: (error) => {
      console.error(error.message);
    },
  });

  const onSubmit = (data: FieldValues) => {
    mutation.mutate(data as User);
  };

  return (
    <>
      <h1 className="text-center font-semibold text-xl">Sign in</h1>
      <form className="flex flex-col gap-5" onSubmit={handleSubmit(onSubmit)}>
        <Input
          {...register("email", {
            required: "This field is required",
          })}
          type="email"
          label="Email"
          isInvalid={!!errors.email}
        />
        <ErrorMessage
          errors={errors}
          name="email"
          render={({ message }) => (
            <p className="text-red-500 text-sm font-semibold">{message}</p>
          )}
        ></ErrorMessage>
        <Input
          {...register("password", { required: "This field is required" })}
          type="password"
          label="Password"
          isInvalid={!!errors.password}
        />
        <ErrorMessage
          errors={errors}
          name="password"
          render={({ message }) => (
            <p className="text-red-500 text-sm font-semibold">{message}</p>
          )}
        ></ErrorMessage>
        <Button
          isLoading={mutation.isPending}
          type="submit"
          className="w-full"
          color="primary"
        >
          Login
        </Button>
      </form>
      <p className="text-sm text-center">
        Not a member yet?{" "}
        <Link className="underline text-blue-600" href="/plan">
          Sign up
        </Link>{" "}
        here
      </p>
    </>
  );
}

"use client";
import { Button, Input } from "@nextui-org/react";
import Link from "next/link";
import { FieldValues, useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import axios from "axios";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { User } from "@/types";
import { getBaseUrl } from "@/lib/utils/URL";

export default function Login() {
  const [isLoading, setIsLoading] = useState(false);
  const { handleLogin, isAuthenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isAuthenticated) {
      router.push("/home");
    }
  }, [isAuthenticated, router]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm();

  const loginMutation = async (data: User) => {
    setIsLoading(true);
    const res = await axios.post(getBaseUrl() + "/api/login", data);
    return res.data;
  };

  const mutation = useMutation(loginMutation, {
    onSuccess: (data) => {
      router.push("/home");
      setIsLoading(false);
      const token = data.token;
      const email = getValues("email");
      const userId = data.userId;
      const premium = data.premium;
      handleLogin(email, token, userId, premium);
      toast.success("Signed in");
      console.log("data", data);
    },
    onError: (error) => {
      setIsLoading(false);
      console.error(error);
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
          {...register("email", { required: "This field is required" })}
          type="email"
          label="Email"
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
        />
        <ErrorMessage
          errors={errors}
          name="password"
          render={({ message }) => (
            <p className="text-red-500 text-sm font-semibold">{message}</p>
          )}
        ></ErrorMessage>
        <Button
          isLoading={isLoading}
          type="submit"
          className="w-full"
          color="primary"
        >
          Login
        </Button>
      </form>
      <p className="text-sm text-center">
        Not a member yet?{" "}
        <Link className="underline text-blue-600" href="/register">
          Sign up
        </Link>{" "}
        here
      </p>
    </>
  );
}

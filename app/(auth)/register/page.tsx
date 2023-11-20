"use client";
import { Button, Input } from "@nextui-org/react";
import Link from "next/link";
import { FieldValues, useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useMutation } from "@tanstack/react-query";
import { RegisterUser } from "@/types";
import { getBaseUrl } from "@/lib/utils/URL";

export default function Register() {
  const [isLoading, setIsLoading] = useState(false);
  const { isAuthenticated } = useAuth();
  const router = useRouter();
  useEffect(() => {
    if (isAuthenticated) {
      router.push("/");
    }
  }, [isAuthenticated, router]);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const registerMutation = async (data: RegisterUser) => {
    setIsLoading(true);
    const res = await axios.post(getBaseUrl() + "/api/register", data);
    return res.data;
  };

  const mutation = useMutation(registerMutation, {
    onSuccess: (data) => {
      setIsLoading(false);
      router.push("/login");
      toast.success("Signed up");
    },
    onError: (error) => {
      setIsLoading(false);
      console.error(error);
    },
  });

  const onSubmit = (data: FieldValues) => {
    mutation.mutate(data as RegisterUser);
  };

  const validiatePassword = (value: string) => {
    const password = watch("password");
    return password === value || "Passwords no not match";
  };

  return (
    <>
      <h1 className="text-center font-semibold text-xl">Register</h1>
      <form className="flex flex-col gap-5" onSubmit={handleSubmit(onSubmit)}>
        <Input
          {...register("userName", { required: "This field is required" })}
          type="text"
          label="Username"
        />
        <ErrorMessage
          errors={errors}
          name="userName"
          render={({ message }) => (
            <p className="text-red-500 text-sm font-semibold">{message}</p>
          )}
        ></ErrorMessage>
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
          {...register("password", {
            required: "This field is required",
          })}
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
        <Input
          {...register("Cpassword", {
            required: "This field is required",
            validate: validiatePassword,
          })}
          type="password"
          label="Confirm Password"
        />
        <ErrorMessage
          errors={errors}
          name="Cpassword"
          render={({ message }) => (
            <p className="text-red-500 text-sm font-semibold">{message}</p>
          )}
        ></ErrorMessage>
        <Input {...register("image")} type="text" label="Image (optional)" />
        <Button
          isLoading={isLoading}
          type="submit"
          className="w-full"
          color="primary"
        >
          Sign up
        </Button>
      </form>
      <p className="text-sm text-center">
        Already a member?{" "}
        <Link className="underline text-blue-600" href="/login">
          Sign in
        </Link>{" "}
        here
      </p>
    </>
  );
}

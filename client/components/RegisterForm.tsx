"use client";
import { Button, Input } from "@nextui-org/react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const RegisterForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { isAuthenticated } = useAuth();
  const router = useRouter();
  useEffect(() => {
    if (isAuthenticated) {
      router.push("/");
    }
  }, [isAuthenticated, router]);
  const formData = {
    userName: "",
    email: "",
    password: "",
    image: null,
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm(formData);

  const registerMutation = async (data) => {
    setIsLoading(true);
    const res = await axios.post("https://forums-api.onrender.com/users/register", data);
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

  const onSubmit = (data) => {
    mutation.mutate(data);
  };

  return (
    <div className="mx-auto max-w-[30rem] mt-10 rounded-xl border shadow-lg p-10 flex flex-col gap-10">
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
        <Input
          {...register("Cpassword", { required: "This field is required" })}
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
          color="secondary"
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
    </div>
  );
};

export default RegisterForm;
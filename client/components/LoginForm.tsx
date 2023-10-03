"use client";
import { Button, Input } from "@nextui-org/react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import axios from "axios";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { useMutation } from "@tanstack/react-query";

const LoginForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { handleLogin, isAuthenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isAuthenticated) {
      router.push("/");
    }
  }, [isAuthenticated, router]);

  const formData = {
    email: "",
    password: "",
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm(formData);

  const loginMutation = async (data) => {
    setIsLoading(true);
    const res = await axios.post("http://localhost:7700/users/login", data);
    return res.data;
  };

  const mutation = useMutation(loginMutation, {
    onSuccess: (data) => {
      setIsLoading(false);
      const token = data.token;
      const email = getValues("email");
      handleLogin(email, token);
      toast.success("Signed in");
      router.push("/");
    },
    onError: (error) => {
      setIsLoading(false);
      console.error(error);
    }
  });

  const onSubmit = (data) => {
    mutation.mutate(data);
  };

  return (
    <div className="mx-auto max-w-[30rem] mt-10 rounded-xl border shadow-lg p-10 flex flex-col gap-10">
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
          color="secondary"
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
    </div>
  );
};

export default LoginForm;

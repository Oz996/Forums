"use client";
import { Categories, Post } from "@/types";
import { Button, Input, Select, SelectItem, Textarea } from "@nextui-org/react";
import { FieldValues, useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { getBaseUrl } from "@/lib/utils/URL";

const CreateForm = () => {
  const router = useRouter();
  const { isAuthenticated, userId } = useAuth();

  const categories: Categories[] = [
    { id: 0, value: "red", name: "Red" },
    { id: 1, value: "blue", name: "Blue" },
    { id: 2, value: "yellow", name: "Yellow" },
  ];

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Post>();

  const newPostMutation = async (data: Post) => {
    if (!isAuthenticated) return router.push("/login");

    const postData = {
      ...data,
      userId,
    };
    const res = await axios.post(getBaseUrl() + "/api/posts/", postData);
    return res.data;
  };

  const { mutate, isLoading } = useMutation(newPostMutation, {
    onSuccess: (data) => {
      router.push("/home");
    },
    onError: (error) => {
      console.error(error);
    },
  });

  const onSubmit = async (data: FieldValues) => {
    mutate(data as Post);
  };

  return (
    <div className="mx-auto max-w-[30rem] mt-10 rounded-xl border shadow-lg p-10">
      <h1 className="text-center font-semibold text-xl"></h1>
      <form className="flex flex-col gap-5" onSubmit={handleSubmit(onSubmit)}>
        <Select
          {...register("category", { required: "Select a category" })}
          label="Select Category"
        >
          {categories.map((category) => (
            <SelectItem key={category.value} value={category.value}>
              {category.name}
            </SelectItem>
          ))}
        </Select>
        <ErrorMessage
          errors={errors}
          name="category"
          render={({ message }) => (
            <p className="text-red-500 text-sm font-semibold">{message}</p>
          )}
        ></ErrorMessage>

        <Input
          {...register("title", { required: "This field is required" })}
          type="text"
          label="Title"
        />
        <ErrorMessage
          errors={errors}
          name="title"
          render={({ message }) => (
            <p className="text-red-500 text-sm font-semibold">{message}</p>
          )}
        ></ErrorMessage>
        <Textarea
          {...register("body", { required: "This field is required" })}
          type="text"
          label="Description"
          labelPlacement="inside"
        />
        <ErrorMessage
          errors={errors}
          name="body"
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
          Post
        </Button>
      </form>
    </div>
  );
};

export default CreateForm;

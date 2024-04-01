"use client";
import { Categories, Post } from "@/types";
import { Button, Input, Select, SelectItem, Textarea } from "@nextui-org/react";
import { FieldValues, useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { useAuth } from "@/hooks/useAuth";
import { getBaseUrl } from "@/lib/utils/getBaseUrl";

const CreateForm = () => {
  const router = useRouter();
  const { premium, userId } = useAuth();

  const categories: Categories[] = [
    { id: 0, value: "red", name: "Red" },
    { id: 1, value: "blue", name: "Blue" },
    { id: 2, value: "yellow", name: "Yellow" },
    { id: 3, value: "orange", name: "Orange", disabled: false },
  ];

  if (!premium) {
    categories.at(-1)!.disabled = true;
    categories.at(-1)!.name += " - Premium only";
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Post>();

  const newPostMutation = async (data: Post) => {
    const postData = {
      ...data,
      userId,
    };
    const res = await axios.post(getBaseUrl() + "/api/posts/", postData);
    return res.data;
  };

  const mutation = useMutation({
    mutationFn: newPostMutation,
    onSuccess: () => {
      router.push("/");
    },
    onError: (error) => {
      console.error(error.message);
    },
  });

  const onSubmit = async (data: FieldValues) => {
    mutation.mutate(data as Post);
  };

  return (
    <div className="mx-auto max-w-[30rem] mt-10 rounded-xl border shadow-lg p-10">
      <h1 className="text-center font-semibold text-xl"></h1>
      <form className="flex flex-col gap-5" onSubmit={handleSubmit(onSubmit)}>
        <Select
          isInvalid={!!errors.category}
          {...register("category", { required: "Select a category" })}
          label="Select Category"
        >
          {categories.map((category) => (
            <SelectItem
              isDisabled={category.disabled}
              className={
                category.value === "orange" && premium ? "text-orange-400" : ""
              }
              key={category.value}
              value={category.value}
            >
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
          {...register("title", { required: "Title is required" })}
          type="text"
          label="Title"
          isInvalid={!!errors.title}
        />
        <ErrorMessage
          errors={errors}
          name="title"
          render={({ message }) => (
            <p className="text-red-500 text-sm font-semibold">{message}</p>
          )}
        ></ErrorMessage>
        <Textarea
          {...register("body", { required: "Description is required" })}
          type="text"
          label="Description"
          labelPlacement="inside"
          isInvalid={!!errors.body}
        />
        <ErrorMessage
          errors={errors}
          name="body"
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
          Post
        </Button>
      </form>
    </div>
  );
};

export default CreateForm;

"use client";
import { useAuth } from "@/hooks/useAuth";
import { getBaseUrl } from "@/lib/utils/URL";
import { ProfileComment, User } from "@/types";
import { ErrorMessage } from "@hookform/error-message";
import {
  Avatar,
  Button,
  Card,
  CardBody,
  CardHeader,
  Divider,
  Textarea,
} from "@nextui-org/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import Link from "next/link";

interface props {
  user: User;
  params: { id: string };
}

const Guestbook = ({ user, params }: props) => {
  const [isLoading, setIsLoading] = useState(false);
  const { isAuthenticated, userId } = useAuth();
  const router = useRouter();

  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const commentMutation = async (data: ProfileComment) => {
    const postData = {
      ...data,
      userId,
    };
    if (!isAuthenticated) return router.push("/login");

    const res = await axios.post(
      getBaseUrl() + `/api/user/${params.id}`,
      postData
    );
    return res.data;
  };

  const mutation = useMutation(commentMutation, {
    onSuccess: () => {
      toast.success("Comment posted");
      queryClient.invalidateQueries(["user"]);
      reset();
    },
    onError: (error) => {
      console.error(error);
    },
    onSettled: () => {
      setIsLoading(false);
    },
  });

  const onSubmit = (data: FieldValues) => {
    mutation.mutate(data as ProfileComment);
  };

  const comments = user?.ProfileCommentReceived;

  return (
    <div className="flex flex-col gap-5 lg:max-h-[31rem]">
      <h2 className="text-center text-xl font-semibold">Guestbook</h2>
      <div className="overflow-y-scroll h-full p-2 flex flex-col gap-5 bg-zinc-100 rounded-2xl">
        {comments?.map((comment) => (
          <div key={comment?.id} className="flex gap-3">
            <Link href={comment?.sender?.id}>
              <Avatar src={comment?.sender?.image} alt="" />
            </Link>
            <div className="flex flex-col w-full bg-white p-4 rounded-lg">
              <div className="flex gap-2 items-end">
                <Link href={comment?.sender?.id}>
                  <p className="font-semibold">{comment?.sender?.userName}</p>
                </Link>
                <p className="ml-auto text-sm text-zinc-600">
                  {comment?.createdAt.slice(0, 10)}
                </p>
              </div>
              <Divider className="my-3" />
              <div>
                <p className="pt-2">{comment?.body}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full flex flex-col items-end gap-1 mt-auto"
      >
        <Textarea
          type="text"
          {...register("body", { required: "Comment can not be empty" })}
          placeholder="Leave a comment..."
        />
        <div className="flex flex-col lg:flex-row gap-3 lg:gap-0 justify-between items-center w-full">
          <ErrorMessage
            errors={errors}
            name="body"
            render={({ message }) => (
              <p className="text-red-500 text-sm font-semibold">{message}</p>
            )}
          ></ErrorMessage>
          <Button
            type="submit"
            className="capitalize lg:ml-auto"
            color="primary"
          >
            post comment
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Guestbook;

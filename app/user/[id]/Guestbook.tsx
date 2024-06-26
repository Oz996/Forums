"use client";
import { useAuth } from "@/hooks/useAuth";
import { getBaseUrl } from "@/lib/utils/getBaseUrl";
import { ProfileComment, User } from "@/types";
import { ErrorMessage } from "@hookform/error-message";
import { Button, Divider, Textarea } from "@nextui-org/react";
import {
  InvalidateQueryFilters,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import axios from "axios";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import Link from "next/link";
import { useTheme } from "next-themes";
import classnames from "classnames";
import UserAvatar from "@/components/UserAvatar";

interface props {
  user: User;
  params: { id: string };
}

const Guestbook = ({ user, params }: props) => {
  const [isLoading, setIsLoading] = useState(false);
  const { isAuthenticated, userId } = useAuth();
  const { theme } = useTheme();
  const router = useRouter();

  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    reset,
    watch,
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

  const mutation = useMutation({
    mutationFn: commentMutation,
    onSuccess: () => {
      toast.success("Comment posted");
      queryClient.invalidateQueries(["user"] as InvalidateQueryFilters);
      reset();
    },
    onError: (error) => {
      console.error(error.message);
    },
    onSettled: () => {
      setIsLoading(false);
    },
  });

  const onSubmit = (data: FieldValues) => {
    mutation.mutate(data as ProfileComment);
  };

  const comments = user?.ProfileCommentReceived;

  const textField = watch("body");
  const textIsEmpty =
    textField?.trim() === "" ||
    textField?.length === 0 ||
    textField?.length == null;

  const disabledButton = textIsEmpty || isLoading;

  console.log("comments2", comments);
  console.log("user2", user);

  return (
    <div className="flex flex-col gap-5 lg:max-h-[31rem]">
      <h2 className="text-center text-xl font-semibold">Guestbook</h2>
      <div
        className={classnames({
          "overflow-y-scroll h-full p-2 flex flex-col gap-5 bg-zinc-100 rounded-2xl":
            true,
          "bg-zinc-900": theme === "dark",
        })}
      >
        {comments?.map((comment) => (
          <div key={comment?.id} className="flex gap-3">
            <Link href={comment?.sender?.id}>
              <UserAvatar
                user={comment?.sender}
                image={comment?.sender?.image}
                className="h-10 w-10"
              />
            </Link>
            <div
              className={classnames({
                "flex flex-col w-full bg-white p-4 rounded-lg": true,
                "bg-zinc-700": theme === "dark",
              })}
            >
              <div className="flex gap-2 items-end">
                <Link href={comment?.sender?.id}>
                  <p className="font-semibold">{comment?.sender?.userName}</p>
                </Link>
                <p
                  className={classnames({
                    "ml-auto text-sm": true,
                    "text-white": theme === "dark",
                  })}
                >
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
          isInvalid={!!errors.body}
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
            isDisabled={disabledButton}
            type="submit"
            color={disabledButton ? "default" : "primary"}
            className="lg:ml-auto"
          >
            Post Comment
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Guestbook;

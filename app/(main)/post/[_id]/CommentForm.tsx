"use client";
import { Button, Spinner, Textarea } from "@nextui-org/react";
import { FieldValues, useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import axios from "axios";
import { Comment } from "@/types";
import { useAuth } from "@/hooks/useAuth";
import { getBaseUrl } from "@/lib/utils/URL";
import classNames from "classnames";

interface props {
  params: {
    _id: string;
  };
  isLoading?: boolean;
}

const CommentForm = ({ params, isLoading }: props) => {
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm();

  const queryClient = useQueryClient();
  const { userId } = useAuth();

  const commentMutation = async (data: Comment) => {
    const postData = {
      ...data,
      userId,
    };
    const res = await axios.post(
      getBaseUrl() + `/api/comment/${params._id}`,
      postData
    );
    return res.data;
  };

  const { mutate, isLoading: formLoading } = useMutation(commentMutation, {
    onSuccess: () => {
      toast.success("Comment posted");
      queryClient.invalidateQueries(["post"]);
      reset();
    },
    onError: (error) => {
      console.error(error);
    },
  });

  const onSubmit = (data: FieldValues) => {
    mutate(data as Comment);
  };

  const comment = watch("body");
  const commentIsEmpty = comment?.trim() === "" || comment?.length === 0;

  const disabled = commentIsEmpty || isLoading || formLoading;

  return (
    <section className="p-10 md:rounded-xl border">
      <h2 className="font-semibold text-lg">Add Comment</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Textarea
          {...register("body", {
            required: "Comment can not be empty",
            maxLength: {
              value: 1000,
              message: "Comment cannot be over 1000 characters",
            },
          })}
          type="text"
        />
        <ErrorMessage
          name="body"
          errors={errors}
          render={({ message }) => (
            <p className="text-red-500 text-sm font-semibold">{message}</p>
          )}
        ></ErrorMessage>

        <div className="flex justify-end mt-5 items-center">
          <Button
            disabled={disabled}
            type="submit"
            color={disabled ? "default" : "primary"}
            className={classNames({
              "cursor-pointer py-6": true,
              "cursor-not-allowed": disabled,
            })}
          >
            {formLoading && <Spinner size="sm" color="primary" />}
            Post Comment
          </Button>
        </div>
      </form>
    </section>
  );
};

export default CommentForm;

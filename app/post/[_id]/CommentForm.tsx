"use client";
import { Button, Spinner, Textarea } from "@nextui-org/react";
import { FieldValues, useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import {
  InvalidateQueryFilters,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { toast } from "react-toastify";
import axios from "axios";
import { Comment } from "@/types";
import { useAuth } from "@/hooks/useAuth";
import { getBaseUrl } from "@/lib/utils/getBaseUrl";

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
  const { userId, isAuthenticated } = useAuth();

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

  const mutation = useMutation({
    mutationFn: commentMutation,
    onSuccess: () => {
      toast.success("Comment posted");
      queryClient.invalidateQueries(["post"] as InvalidateQueryFilters);
      reset();
    },
    onError: (error) => {
      console.error(error.message);
    },
  });

  const onSubmit = (data: FieldValues) => {
    mutation.mutate(data as Comment);
  };

  const comment = watch("body");
  const commentIsEmpty =
    comment?.trim() === "" || comment?.length === 0 || comment?.length == null;
  console.log(comment?.length);

  const disabledButton = commentIsEmpty || isLoading || mutation.isPending;

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
          isDisabled={!isAuthenticated}
          placeholder={!isAuthenticated ? "Sign in to post a comment" : ""}
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
            isDisabled={disabledButton}
            type="submit"
            color={disabledButton ? "default" : "primary"}
            className="py-6"
          >
            {mutation.isPending && <Spinner size="sm" color="primary" />}
            Post Comment
          </Button>
        </div>
      </form>
    </section>
  );
};

export default CommentForm;

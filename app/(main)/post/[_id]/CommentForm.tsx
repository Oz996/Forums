"use client";
import { Button, Textarea } from "@nextui-org/react";
import { FieldValues, useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import axios from "axios";
import { Comment } from "@/types";
import { useAuth } from "@/hooks/useAuth";
import { getBaseUrl } from "@/lib/utils/URL";

const CommentForm = ({ params }: { params: { _id: string } }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const queryClient = useQueryClient();
  const { token, userId } = useAuth();

  const commentMutation = async (data: Comment) => {
    const postData = {
      ...data,
      userId,
    };
    const res = await axios.post(
      getBaseUrl() + `/api/post/${params._id}`,
      postData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return res.data;
  };

  const mutation = useMutation(commentMutation, {
    onSuccess: () => {
      toast.success("Comment posted");
      queryClient.invalidateQueries(["post"]);
      reset();
    },
    onError: (error) => {
      console.error(error);
    },
    onSettled: () => {},
  });

  const onSubmit = (data: FieldValues) => {
    mutation.mutate(data as Comment);
  };
  return (
    <section className="p-10 md:rounded-xl border">
      <h2 className="font-bold text-xl">Add Comment</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Textarea
          {...register("body", { required: "Comment can not be empty" })}
          type="text"
        />
        <ErrorMessage
          name="body"
          errors={errors}
          render={({ message }) => (
            <p className="text-red-500 text-sm font-semibold">{message}</p>
          )}
        ></ErrorMessage>

        <div className="flex justify-between mt-5 items-center">
          <p>Characters left</p>
          <Button type="submit" color="primary" className="py-6">
            Post Comment
          </Button>
        </div>
      </form>
    </section>
  );
};

export default CommentForm;

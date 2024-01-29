"use client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import UserCard from "@/components/UserCard";
import { getPost } from "../../../api/services/api";
import CommentForm from "@/app/(main)/post/[_id]/CommentForm";
import { Button, Input, Textarea, Skeleton } from "@nextui-org/react";
import { useAuth } from "@/hooks/useAuth";
import { FieldValues, useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { PostForm, Comment, Post, ICommentForm } from "@/types";
import { getBaseUrl } from "@/lib/utils/URL";
import DeleteModal from "@/components/DeleteModal";
import { ErrorMessage } from "@hookform/error-message";
import Comments from "./Comments";
import { formatDate } from "@/lib/utils/formatDate";

export default function Page({ params }: { params: { _id: string } }) {
  const [editing, setEditing] = useState(false);
  const queryClient = useQueryClient();
  const { userId } = useAuth();
  const { data, isLoading } = useQuery({
    queryKey: ["post"],
    queryFn: () => getPost(params._id),
  });

  const post: Post = data;

  const editedPost = post?.createdAt !== post?.editedAt;

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();

  const handleEditPost = () => {
    setValue("title", post?.title || "");
    setValue("body", post?.body || "");
    setEditing((prev) => !prev);
  };

  const editPostMutation = async (postData: PostForm) => {
    await axios.put(getBaseUrl() + `/api/post/${params._id}`, postData);
  };

  const postMutation = useMutation(editPostMutation, {
    onSuccess: () => {
      toast.success("Post updated");
    },
    onError: (error) => {
      console.error(error);
    },
    onSettled: () => {
      setEditing(false);
      queryClient.invalidateQueries(["post"]);
    },
  });

  const onPostSubmit = (postData: FieldValues) => {
    postMutation.mutate(postData as PostForm);
  };

  console.log("post", post);

  return (
    <section className="md:max-w-[62rem] mx-auto container flex flex-col gap-10 md:gap-3">
      <div className="flex flex-col md:flex-row rounded-xl border">
        <div>
          <UserCard data={data} isLoading={isLoading} />
        </div>
        <div className="flex flex-col p-10 w-full">
          <div className="flex flex-col md:flex-row justify-between">
            {!editing ? (
              <div>
                <Skeleton
                  className={
                    isLoading
                      ? "rounded-lg w-full md:w-[30rem] lg:w-[40rem]"
                      : ""
                  }
                  isLoaded={!isLoading}
                >
                  <h1 className="text-2xl font-semibold mb-10">
                    {post?.title}
                  </h1>
                </Skeleton>
                {!editing && (
                  <div className="flex my-6 items-center gap-3">
                    {!isLoading && (
                      <p className="text-gray-500 text-sm">
                        Created at {formatDate(data?.createdAt)}
                      </p>
                    )}

                    {editedPost && (
                      <p className="text-gray-500 text-sm italic pr-2">
                        Edited at {formatDate(data?.editedAt)}
                      </p>
                    )}
                  </div>
                )}
                <Skeleton
                  className={
                    isLoading
                      ? "rounded-lg h-[12rem] w-full md:w-[30rem] lg:w-[40rem]"
                      : ""
                  }
                  isLoaded={!isLoading}
                >
                  <p>{post?.body}</p>
                </Skeleton>
              </div>
            ) : (
              <form className="w-full" onSubmit={handleSubmit(onPostSubmit)}>
                <Input
                  {...register("title", { required: "Title is required" })}
                  label="Title"
                  variant="underlined"
                  className="mb-5"
                  defaultValue=" "
                />
                <ErrorMessage
                  name="title"
                  errors={errors}
                  render={({ message }) => (
                    <p className="text-red-500 text-sm font-semibold">
                      {message}
                    </p>
                  )}
                ></ErrorMessage>
                <Textarea
                  {...register("body", { required: "Body is required" })}
                  label="Description"
                  variant="underlined"
                  className="w-full"
                />
                <ErrorMessage
                  name="body"
                  errors={errors}
                  render={({ message }) => (
                    <p className="text-red-500 text-sm font-semibold">
                      {message}
                    </p>
                  )}
                ></ErrorMessage>
                <Button variant="ghost" type="submit">
                  Confirm
                </Button>
              </form>
            )}
          </div>
          {userId === post?.user?.id && (
            <div className="flex justify-end border-t mt-5">
              <Button variant="light" className="mt-2" onClick={handleEditPost}>
                {!editing ? "Edit" : "Cancel"}
              </Button>
              <DeleteModal type="post" id={params._id} />
            </div>
          )}
        </div>
      </div>

      {/* Comments */}
      <Comments post={post} />
      <CommentForm params={params} isLoading={isLoading} />
    </section>
  );
}

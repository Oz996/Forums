"use client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import UserCard from "@/components/UserCard";
import { getPost } from "../../../api/api";
import CommentForm from "@/app/(main)/post/[_id]/CommentForm";
import { Button, Input, Textarea, Skeleton } from "@nextui-org/react";
import { useAuth } from "@/hooks/useAuth";
import DeleteModal from "@/app/(main)/post/[_id]/DeletePostModal";
import { FieldValues, useForm } from "react-hook-form";
import { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { EditData, PostData, Comment, Post } from "@/types";
import { getBaseUrl } from "@/lib/utils/URL";

export default function Page({ params }: { params: { _id: string } }) {
  const [editing, setEditing] = useState(false);
  const queryClient = useQueryClient();
  const { userEmail, userId } = useAuth();
  const { data, isLoading } = useQuery({
    queryKey: ["post"],
    queryFn: () => getPost(params._id),
  });

  const post: Post = data;
  const date = post?.createdAt?.slice(0, 10);
  const updated = post?.editedAt?.slice(0, 10);

  const edited = post?.createdAt !== post?.editedAt;
  console.log(data);

  const { token } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();

  const handleEditClick = () => {
    setValue("title", post?.title || "");
    setValue("body", post?.body || "");
    setEditing((prev) => !prev);
  };

  const editMutation = async (data: EditData) => {
    await axios.put(getBaseUrl() + `/api/post/${params._id}`, data, {
      headers: { Authorization: `Bearer ${token}` },
    });
  };

  const deleteCommentMutation = async (
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    await axios.delete(getBaseUrl() + `/api/post/${params._id}/comments/${9}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  };

  const mutation = useMutation(editMutation, {
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

  const onSubmit = (data: FieldValues) => {
    mutation.mutate(data as EditData);
  };

  return (
    <section className="md:max-w-[62rem] mx-auto container flex flex-col gap-10 md:gap-3">
      <div className="flex flex-col md:flex-row rounded-xl border">
        <div>
          <UserCard data={data} />
        </div>
        <div className="flex flex-col p-10 w-full">
          <div className="flex flex-col md:flex-row justify-between">
            {!editing ? (
              <div>
                <Skeleton className="rounded-lg" isLoaded={!isLoading}>
                  <h1 className="text-2xl font-semibold mb-10">
                    {post?.title}
                  </h1>
                </Skeleton>
                {!editing && (
                  <div className="flex my-6 items-center gap-3">
                    <Skeleton className="rounded-lg" isLoaded={!isLoading}>
                      <p className="text-gray-500 text-sm">Created at {date}</p>
                    </Skeleton>
                    <Skeleton className="rounded-lg" isLoaded={!isLoading}>
                      {edited && (
                        <p className="text-gray-500 text-sm italic pr-2">
                          Edited at {updated}
                        </p>
                      )}
                    </Skeleton>
                  </div>
                )}
                <Skeleton className="rounded-lg" isLoaded={!isLoading}>
                  <p>{post?.body}</p>
                </Skeleton>
              </div>
            ) : (
              <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
                <Input
                  {...register("title")}
                  label="Title"
                  variant="underlined"
                  className="mb-5"
                  defaultValue=" "
                />
                <Textarea
                  {...register("body")}
                  label="Description"
                  variant="underlined"
                  className="w-full"
                />
                <Button variant="ghost" type="submit">
                  Confirm
                </Button>
              </form>
            )}
          </div>
          {userEmail === post?.user?.email && (
            <div className="flex justify-end border-t mt-5">
              <Button
                variant="light"
                className="mt-2"
                onClick={handleEditClick}
              >
                {!editing ? "Edit" : "Cancel"}
              </Button>
              <DeleteModal id={params._id} />
            </div>
          )}
        </div>
      </div>
      {post?.comments?.map((data: Comment) => (
        <div
          key={data.id}
          className="flex flex-col md:flex-row md:rounded-xl border w-full ml-auto md:w-[80%]"
        >
          <div>
            <UserCard data={data} />
          </div>
          <div className="flex flex-col p-10 w-full">
            <p>{data?.body}</p>
            {userEmail === post?.user?.email && (
              <div className="flex justify-end border-t mt-5">
                <Button variant="light" className="mt-2">
                  {!editing ? "Edit" : "Confirm"}
                </Button>
                <Button
                  color="danger"
                  variant="light"
                  className="mt-2"
                  onClick={deleteCommentMutation}
                >
                  Delete
                </Button>
              </div>
            )}
            <p className="text-gray-500 text-sm my-6">
              Created at {data?.createdAt.slice(0, 10)}
            </p>
          </div>
        </div>
      ))}
      <CommentForm params={params} />
    </section>
  );
}

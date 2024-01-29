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

export default function Page({ params }: { params: { _id: string } }) {
  const [editing, setEditing] = useState(false);
  const [editingComment, setEditingComment] = useState(false);
  const [commentId, setCommentId] = useState("");
  const queryClient = useQueryClient();
  const { userId } = useAuth();
  const { data, isLoading } = useQuery({
    queryKey: ["post"],
    queryFn: () => getPost(params._id),
  });

  const post: Post = data;
  const date = post?.createdAt?.slice(0, 10);
  const updated = post?.editedAt?.slice(0, 10);

  const editedPost = post?.createdAt !== post?.editedAt;
  console.log(data);

  const commentsList = post?.comments;

  console.log(commentsList);

  const {
    register: postRegister,
    handleSubmit: postHandleSubmit,
    formState: { errors: postErrors },
    setValue: setPostValue,
  } = useForm();

  const {
    register: commentRegister,
    handleSubmit: commentHandleSubmit,
    formState: { errors: commentErrors },
    setValue: setCommentValue,
  } = useForm();

  // Post logic

  const handleEditPost = () => {
    setPostValue("title", post?.title || "");
    setPostValue("body", post?.body || "");
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

  console.log("id", commentId);

  // Comment logic

  const handleEditComment = (id: string) => {
    const comment = post?.comments.find((comment) => comment.id === id);
    console.log("comment", comment);
    setCommentValue("comment", comment?.body);
    console.log("body", comment?.body);
    if (comment) {
      setCommentId(comment?.id);
    }
    setEditingComment((prev) => !prev);
  };

  const editCommentMutation = async (commentData: ICommentForm) => {
    await axios.put(getBaseUrl() + `/api/comment/${commentId}`, commentData);
  };

  const commentMutation = useMutation(editCommentMutation, {
    onSuccess: () => {
      toast.success("Comment updated");
    },
    onError: (error) => {
      console.error(error);
    },
    onSettled: () => {
      setEditingComment(false);
      queryClient.invalidateQueries(["post"]);
    },
  });

  const onCommentSubmit = (data: FieldValues) => {
    commentMutation.mutate(data as ICommentForm);
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
                      <p className="text-gray-500 text-sm">Created at {date}</p>
                    )}

                    {editedPost && (
                      <p className="text-gray-500 text-sm italic pr-2">
                        Edited at {updated}
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
              <form
                className="w-full"
                onSubmit={postHandleSubmit(onPostSubmit)}
              >
                <Input
                  {...postRegister("title", { required: "Title is required" })}
                  label="Title"
                  variant="underlined"
                  className="mb-5"
                  defaultValue=" "
                />
                <ErrorMessage
                  name="title"
                  errors={postErrors}
                  render={({ message }) => (
                    <p className="text-red-500 text-sm font-semibold">
                      {message}
                    </p>
                  )}
                ></ErrorMessage>
                <Textarea
                  {...postRegister("body", { required: "Body is required" })}
                  label="Description"
                  variant="underlined"
                  className="w-full"
                />
                <ErrorMessage
                  name="body"
                  errors={postErrors}
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
      {post?.comments?.map((data: Comment) => (
        <div
          key={data.id}
          className="flex flex-col md:flex-row md:rounded-xl border w-full"
        >
          <div>
            <UserCard data={data} />
          </div>
          <div className="flex flex-col p-10 w-full">
            {editingComment && commentId === data.id ? (
              <form onSubmit={commentHandleSubmit(onCommentSubmit)}>
                <Textarea
                  {...commentRegister("comment", {
                    required: "Comment can not be empty",
                    maxLength: {
                      value: 1000,
                      message: "Comment cannot be over 1000 characters",
                    },
                  })}
                  type="text"
                />
                <ErrorMessage
                  name="comment"
                  errors={commentErrors}
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
            ) : (
              <p>{data?.body}</p>
            )}
            {userId === data?.user?.id && (
              <div className="flex justify-end border-t mt-5">
                <Button
                  onClick={() => handleEditComment(data?.id)}
                  variant="light"
                  className="mt-2"
                  type="submit"
                >
                  {!editingComment ? "Edit" : "Cancel"}
                </Button>
                <DeleteModal type="comment" id={data?.id} />
              </div>
            )}
            <div className="flex my-6 items-center gap-3">
              <p className="text-gray-500 text-sm ">
                Created at {data?.createdAt.slice(0, 10)}
              </p>
              {data?.createdAt !== data?.editedAt && (
                <p className="text-gray-500 text-sm italic pr-2">
                  Edited at {data?.editedAt.slice(0, 10)}
                </p>
              )}
            </div>
          </div>
        </div>
      ))}
      <CommentForm params={params} isLoading={isLoading} />
    </section>
  );
}

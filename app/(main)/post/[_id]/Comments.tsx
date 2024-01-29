import DeleteModal from "@/components/DeleteModal";
import UserCard from "@/components/UserCard";
import { useAuth } from "@/hooks/useAuth";
import { getBaseUrl } from "@/lib/utils/URL";
import { formatDate } from "@/lib/utils/formatDate";
import { Comment, ICommentForm, Post } from "@/types";
import { ErrorMessage } from "@hookform/error-message";
import { Button, Textarea } from "@nextui-org/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { toast } from "react-toastify";

interface props {
  post: Post;
}

const Comments = ({ post }: props) => {
  const [editingComment, setEditingComment] = useState(false);
  const [commentId, setCommentId] = useState("");
  const { userId } = useAuth();
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();

  const handleEditComment = (id: string) => {
    const comment = post?.comments.find((comment) => comment.id === id);
    console.log("comment", comment);
    setValue("comment", comment?.body);
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
  return (
    <>
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
              <form onSubmit={handleSubmit(onCommentSubmit)}>
                <Textarea
                  {...register("comment", {
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
                Created at {formatDate(data?.createdAt)}
              </p>
              {data?.createdAt !== data?.editedAt && (
                <p className="text-gray-500 text-sm italic pr-2">
                  Edited at {formatDate(data?.editedAt)}
                </p>
              )}
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default Comments;

"use client";
import { getUser } from "@/app/api/api";
import DeleteUserModal from "@/components/DeleteUserModal";
import PostCard from "@/components/PostCard";
import UserCard from "@/components/UserCard";
import { useAuth } from "@/hooks/useAuth";
import { Comment, Post, UserData } from "@/types/types";
import { FaInfo } from "react-icons/fa";
import {
  Avatar,
  Button,
  Card,
  Input,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@nextui-org/react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import { ErrorMessage } from "@hookform/error-message";
import { FieldValues, useForm } from "react-hook-form";
import { toast } from "react-toastify";

export default function User({ params }: { params: { id: string } }) {
  const [editing, setEditing] = useState(false);
  const { data } = useQuery({
    queryKey: ["user"],
    queryFn: () => getUser(params.id),
  });
  const { userEmail, token } = useAuth();
  const queryClient = useQueryClient();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();
  console.log(data);
  const handleEditClick = () => {
    setValue("email", user?.email || "");
    setValue("userName", user?.userName || "");
    setEditing((prev) => !prev);
  };

  const userMutation = async (data: UserData) => {
    const res = await axios.put(
      `http://localhost:3000/api/user/${params.id}`,
      data,
      { headers: { Authorization: `Bearer ${token}` } }
    );
  };

  const mutation = useMutation(userMutation, {
    onSuccess: () => {
      setEditing(false);
      toast.success("User updated");
    },
    onError: (error) => {
      console.error(error);
    },
    onSettled: () => {
      queryClient.invalidateQueries(["user"]);
    },
  });

  const onSubmit = (data: FieldValues) => {
    mutation.mutate(data as UserData);
  };
  const user = data?.data;
  const numberOfPosts = user?.posts?.length;
  const email = user?.email;
  const isUser = userEmail === email;
  const newbie = numberOfPosts < 1;
  const member = numberOfPosts > 0 && numberOfPosts < 3;
  const regular = numberOfPosts >= 3;

  return (
    <section className="pt-24 pb-10">
      <div className="md:max-w-[62rem] mx-auto flex flex-col gap-5">
        <Card className="md:p-10 md:px-20 p-3">
          <div className="flex justify-between flex-col gap-4 mx-auto">
            <Avatar className="mx-auto w-28 h-28 mb-8" src={user?.image} />
            {!editing ? (
              <div>
                <div className="grid grid-cols-2 gap-2">
                  <div className="flex gap-1 items-center">
                    <p className="font-semibold">Rank</p>
                    <Popover placement="right">
                      <PopoverTrigger>
                        <Button
                          isIconOnly
                          className="rounded-full"
                          size="sm"
                          color="primary"
                          variant="light"
                        >
                          <FaInfo />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent>
                        <div className="px-1 py-2">
                          <div className="text-small font-bold">User rank</div>
                          <div className="text-tiny">
                            Users rank is based of off number of posts
                          </div>
                        </div>
                      </PopoverContent>
                    </Popover>
                  </div>
                  <p
                    className={`font-semibold ${
                      member
                        ? "text-blue-600"
                        : regular
                        ? "text-purple-600"
                        : ""
                    }`}
                  >
                    {newbie
                      ? "Newbie"
                      : member
                      ? "Member"
                      : regular
                      ? "Regular"
                      : ""}
                  </p>
                  <p className="font-semibold">Posts</p>
                  <p>{user?.posts.length}</p>
                  {isUser && (
                    <>
                      <p className="font-semibold">Email</p> <p>{email}</p>
                    </>
                  )}
                  <p className="font-semibold">Username</p>
                  <p>{user?.userName}</p>
                  <p className="font-semibold">Joined</p>
                  <p>{user?.createdAt.slice(0, 10)}</p>
                  {isUser && (
                    <>
                      <Button
                        onClick={handleEditClick}
                        className="font-semibold rounded-full"
                        color="primary"
                        variant="light"
                      >
                        Edit
                      </Button>
                      <DeleteUserModal params={params} />
                    </>
                  )}
                </div>
              </div>
            ) : (
              <div className="md:w-[17rem] w-full">
                <form
                  className="flex flex-col gap-3"
                  onSubmit={handleSubmit(onSubmit)}
                >
                  <Input
                    {...register("email", {
                      required: "Email cannot be empty",
                    })}
                    label="Email"
                    defaultValue=" "
                  />
                  <ErrorMessage
                    errors={errors}
                    name="email"
                    render={({ message }) => (
                      <p className="text-red-500 text-sm font-semibold">
                        {message}
                      </p>
                    )}
                  ></ErrorMessage>
                  <Input
                    {...register("userName", {
                      required: "Username cannot be empty",
                    })}
                    defaultValue=" "
                    label="Username"
                  />
                  <ErrorMessage
                    errors={errors}
                    name="userName"
                    render={({ message }) => (
                      <p className="text-red-500 text-sm font-semibold">
                        {message}
                      </p>
                    )}
                  ></ErrorMessage>
                  <div className="flex">
                    <Button
                      className="w-[70%] rounded-full"
                      type="submit"
                      color="secondary"
                    >
                      Submit
                    </Button>
                    <Button
                      className="w-[30%] rounded-full"
                      color="danger"
                      variant="light"
                      onClick={() => setEditing(false)}
                    >
                      Cancel
                    </Button>
                  </div>
                </form>
              </div>
            )}
          </div>
        </Card>
        <div>
          {user?.posts.length === 0 ? (
            <h2 className="text-center text-xl font-semibold mb-5">No posts</h2>
          ) : (
            <h2 className="text-center text-xl font-semibold mb-5">
              {isUser ? "Your Posts" : "Users Posts"}
            </h2>
          )}
          {user?.posts?.map((post: Post) => (
            <PostCard key={post?.id} post={post} />
          ))}
        </div>
        <div>
          {user?.comments.length === 0 ? (
            <h2 className="text-center text-xl font-semibold mb-5">
              No comments
            </h2>
          ) : (
            <h2 className="text-center text-xl font-semibold mb-5">
              {isUser ? "Your Latest Comments" : "Users Latest Comments"}
            </h2>
          )}
          {user?.comments?.map((comment: Comment) => (
            <div key={comment?.id}>
              <p>{comment?.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

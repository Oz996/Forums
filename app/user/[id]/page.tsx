"use client";
import { getUser } from "@/services/services";
import { useAuth } from "@/hooks/useAuth";
import { UserData } from "@/types";
import { FaInfo } from "react-icons/fa";
import {
  Button,
  Card,
  Input,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Skeleton,
} from "@nextui-org/react";
import {
  InvalidateQueryFilters,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import { ErrorMessage } from "@hookform/error-message";
import { FieldValues, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { getBaseUrl } from "@/lib/utils/getBaseUrl";
import classnames from "classnames";
import Guestbook from "./Guestbook";
import DeleteModal from "@/components/DeleteModal";
import UserAvatar from "@/components/UserAvatar";
import UserPosts from "./UserPosts";

export default function User({ params }: { params: { id: string } }) {
  const [editing, setEditing] = useState(false);
  const { data: user, isLoading } = useQuery({
    queryKey: ["user"],
    queryFn: () => getUser(params.id),
  });
  const { userEmail } = useAuth();
  const queryClient = useQueryClient();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const handleEditClick = () => {
    setValue("email", user?.email || "");
    setValue("userName", user?.userName || "");
    setEditing((prev) => !prev);
  };

  const userMutation = async (data: UserData) => {
    const res = await axios.put(getBaseUrl() + `/api/user/${params.id}`, data);
    console.log(res);
  };

  console.log("user", user);

  const mutation = useMutation({
    mutationFn: userMutation,
    onSuccess: () => {
      setEditing(false);
      toast.success("User updated");
      queryClient.invalidateQueries(["user"] as InvalidateQueryFilters);
    },
    onError: (error) => {
      console.error(error);
    },
    onSettled: () => {},
  });

  const onSubmit = (data: FieldValues) => {
    mutation.mutate(data as UserData);
  };
  const numberOfPosts = user?.posts?.length;
  const email = user?.email;
  const isUser = userEmail === email;
  const newbie = numberOfPosts < 1;
  const member = numberOfPosts > 0 && numberOfPosts < 3;
  const regular = numberOfPosts >= 3;

  return (
    <section className="pb-10">
      <div className="md:max-w-[62rem] mx-auto flex flex-col gap-5">
        <Card className="md:p-10 p-3 grid grid-cols-1 gap-10 lg:gap-0 lg:grid-cols-2 lg:h-[35rem]">
          <div className="flex flex-col gap-4 justify-center items-center">
            <UserAvatar
              isLoading={isLoading}
              image={user?.image}
              user={user}
              className="mx-auto w-28 h-28"
            />
            {!editing ? (
              <div>
                <div className="grid grid-cols-2 gap-2">
                  <div
                    className={classnames({
                      "flex gap-1 items-center": true,
                      "w-[10rem]": isLoading,
                    })}
                  >
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
                  {!isLoading ? (
                    <p
                      className={classnames({
                        "font-semibold self-center": true,
                        "text-blue-600": member,
                        "text-purple-600": regular,
                      })}
                    >
                      {newbie
                        ? "Newbie"
                        : member
                        ? "Member"
                        : regular
                        ? "Regular"
                        : ""}
                    </p>
                  ) : (
                    <Skeleton className="w-full h-6 rounded-full" />
                  )}

                  <p className="font-semibold">Posts</p>
                  {!isLoading ? (
                    <p>{user?.posts.length}</p>
                  ) : (
                    <Skeleton className="w-full h-6 rounded-full" />
                  )}
                  {isUser && (
                    <>
                      <p className="font-semibold">Email</p> <p>{email}</p>
                    </>
                  )}
                  <p className="font-semibold">Username</p>
                  {!isLoading ? (
                    <p>{user?.userName}</p>
                  ) : (
                    <Skeleton className="w-full h-6 rounded-full" />
                  )}
                  <p className="font-semibold">Joined</p>
                  {!isLoading ? (
                    <p>{user?.createdAt.slice(0, 10)}</p>
                  ) : (
                    <Skeleton className="w-full h-6 rounded-full" />
                  )}
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
                      <DeleteModal type={"user"} id={params.id} />
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
                    type="email"
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
                    type="text"
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
                      color="primary"
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
          <Guestbook user={user} params={params} />
        </Card>
        <UserPosts
          posts={user?.posts}
          comments={user?.comments}
          isUser={isUser}
        />
      </div>
    </section>
  );
}

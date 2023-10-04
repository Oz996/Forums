"use client";
import { getUser } from "@/app/api/api";
import DeleteUserModal from "@/components/DeleteUserModal";
import { useAuth } from "@/hooks/useAuth";
import { UserData } from "@/types/types";
import { Avatar, Button, Card, Input } from "@nextui-org/react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { toast } from "react-toastify";

export default function User({ params }: { params: { user: string } }) {
  console.log(params.user);
  const [editing, setEditing] = useState(false);
  const { data } = useQuery({
    queryKey: ["user"],
    queryFn: () => getUser(params.user),
  });

  const { userEmail, token } = useAuth();
  const queryClient = useQueryClient();
  console.log(data);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const handleEditClick = () => {
    setValue("email", data?.data?.email || "");
    setValue("userName", data?.data?.userName || "");
    setEditing((prev) => !prev);
  };

  const userMutation = async (data: UserData) => {
    const res = await axios.put(
      `https://forums-api.onrender.com/users/${params.user}`,
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

  return (
    <section className="pt-24">
      <div className="max-w-[62rem] mx-auto">
        <Card className="p-10 px-20">
          <div className="flex justify-between">
            <div className="grid grid-cols-2">
              <Avatar
                size="lg"
                className="mb-2"
                src={data?.data?.image}
              ></Avatar>
              <Input type="file">Change Image</Input>
              {!editing ? (
                <>
                  <p className="font-semibold">Email</p>
                  <p>{data?.data?.email}</p>
                  <p className="font-semibold">Username</p>
                  <p> {data?.data?.userName}</p>
                </>
              ) : (
                <form
                  onSubmit={handleSubmit(onSubmit)}
                  className="flex flex-col gap-3"
                >
                  <Input
                    {...register("email", { required: "Cannot be empty" })}
                    label="Email"
                    defaultValue=" "
                  />
                  <Input
                    {...register("userName", { required: "Cannot be empty" })}
                    label="Username"
                    defaultValue=" "
                  />
                  <Button color="secondary" type="submit">
                    Submit
                  </Button>
                </form>
              )}
              {!editing && (
                <>
                  <p className="mt-1">Member since</p>
                  <p className="mt-1">{data?.data?.createdAt?.slice(0, 10)}</p>
                </>
              )}
            </div>
            <div>
              {userEmail === data?.data?.email && (
                <DeleteUserModal id={data?.data?._id} />
              )}
            </div>
          </div>
          {userEmail === data?.data?.email && (
            <Button
              onClick={handleEditClick}
              color="primary"
              variant="light"
              className="mt-5 w-[3rem] font-semibold"
            >
              Edit
            </Button>
          )}
        </Card>
      </div>
    </section>
  );
}

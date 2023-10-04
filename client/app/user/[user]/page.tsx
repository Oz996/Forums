"use client";
import { getUser } from "@/app/api/api";
import DeleteUserModal from "@/components/DeleteUserModal";
import { useAuth } from "@/hooks/useAuth";
import { Avatar, Button, Card } from "@nextui-org/react";
import { useQuery } from "@tanstack/react-query";

export default function User({ params }: { params: { user: string } }) {
  console.log(params.user);
  const { data } = useQuery({
    queryKey: ["user"],
    queryFn: () => getUser(params.user),
  });

  const { userEmail } = useAuth();
  console.log(data);

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
              <Button>Change Image</Button>
              <p className="font-semibold">Email</p>
              <p>{data?.data?.email}</p>
              <p className="font-semibold">Username</p>
              <p> {data?.data?.userName}</p>
              <p className="mt-1">Member since</p>{" "}
              <p className="mt-1">{data?.data?.createdAt?.slice(0, 10)}</p>
            </div>
            <div>
              {userEmail === data?.data?.email && (
                <DeleteUserModal id={data?.data?._id} />
              )}
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
}

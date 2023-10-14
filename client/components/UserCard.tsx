import { Post, User } from "@/types/types";
import {
  Avatar,
  Badge,
  Card,
  CardBody,
  CardHeader,
  Skeleton,
} from "@nextui-org/react";
import Link from "next/link";

interface props {
  data: {
    user: User;
    posts?: Post[];
  };
  isLoading: boolean;
}

const UserCard = ({ data, isLoading }: props) => {
  const newbie = data?.posts && data?.posts?.length < 1;
  const member =
    data?.posts && data?.posts?.length > 0 && data?.posts?.length < 3;
  const regular = data?.posts && data?.posts?.length >= 3;

  // console.log(data);
  return (
    <Card className="p-5 min-w-[15rem] h-full shadow-none border-b-1 border-gray-300 md:border-none">
      <CardHeader className="flex justify-center">
        <Skeleton className="rounded-full" isLoaded={!isLoading}>
          <Badge>
            <Link href={`/user/${data?.user?._id}`}>
              <Avatar size="lg" src={data?.user?.image} />
            </Link>
          </Badge>
        </Skeleton>
      </CardHeader>
      <CardBody className="text-center">
        <p>{data?.user?.userName}</p>
        <p
          className={`font-semibold ${
            member ? "text-blue-600" : regular ? "text-purple-600" : ""
          }`}
        >
          {newbie ? "Newbie" : member ? "Member" : regular ? "Regular" : ""}
        </p>
        <p></p>
        <p>Posts: {data?.posts?.length}</p>
        <p>Joined: {data?.user?.createdAt?.slice(0, 10)}</p>
      </CardBody>
    </Card>
  );
};

export default UserCard;

import { User } from "@/types";
import { Avatar, Badge, Card, CardBody, CardHeader } from "@nextui-org/react";
import Link from "next/link";
import classnames from "classnames";
import UserAvatar from "./UserAvatar";

interface props {
  data: {
    user: User;
  };
}

const UserCard = ({ data }: props) => {
  const numberOfPosts = data?.user?.posts?.length;
  const newbie = numberOfPosts < 1;
  const member = numberOfPosts > 0 && numberOfPosts < 3;
  const regular = numberOfPosts >= 3;
  const isNew =
    Date.now() - new Date(data?.user?.createdAt).getTime() <
    1000 * 60 * 60 * 24 * 1;
  return (
    <Card className="p-5 min-w-[15rem] h-full shadow-none border-b-1 border-gray-300 md:border-none">
      <CardHeader className="flex justify-center">
        {isNew ? (
          <Badge content="new" color="danger">
            <Link href={`/user/${data?.user?.id}`}>
              <UserAvatar image={data?.user?.image} />
            </Link>
          </Badge>
        ) : (
          <Link href={`/user/${data?.user?.id}`}>
            <UserAvatar image={data?.user?.image} />
          </Link>
        )}
      </CardHeader>
      <CardBody className="text-center">
        <p>{data?.user?.userName}</p>
        <p
          className={classnames({
            "font-semibold": true,
            "text-blue-600": member,
            "text-purple-600": regular,
          })}
        >
          {newbie ? "Newbie" : member ? "Member" : regular ? "Regular" : ""}
        </p>
        <p></p>
        <p>Posts: {numberOfPosts}</p>
        <p>Joined: {data?.user?.createdAt?.slice(0, 10)}</p>
      </CardBody>
    </Card>
  );
};

export default UserCard;

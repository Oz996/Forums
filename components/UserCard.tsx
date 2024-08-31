import { User } from "@/types";
import { Card, CardBody, CardHeader } from "@nextui-org/react";
import Link from "next/link";
import classnames from "classnames";
import UserAvatar from "./UserAvatar";

interface props {
  user: User;
}

const UserCard = ({ user }: props) => {
  const numberOfPosts = user?.posts?.length;
  const newbie = numberOfPosts < 1;
  const member = numberOfPosts > 0 && numberOfPosts < 3;
  const regular = numberOfPosts >= 3;

  return (
    <Card className="p-5 min-w-[15rem] h-full shadow-none border-b-1 border-gray-300 md:border-none">
      <CardHeader className="flex justify-center">
        <Link href={`/user/${user?.id}`}>
          <UserAvatar image={user?.image} user={user} />
        </Link>
      </CardHeader>
      <CardBody className="text-center">
        <p>{user?.userName}</p>
        <p
          className={classnames({
            "font-semibold": true,
            "text-blue-600": member,
            "text-purple-600": regular,
          })}
        >
          {newbie ? "Newbie" : member ? "Member" : regular ? "Regular" : ""}
        </p>{" "}
        <p>Posts: {numberOfPosts}</p>{" "}
        <p>Joined: {user?.createdAt?.slice(0, 10)}</p>
      </CardBody>
    </Card>
  );
};

export default UserCard;

import { User } from "@/types/types";
import { Avatar, Badge, Card, CardBody, CardHeader } from "@nextui-org/react";
import Link from "next/link";

interface props {
  user: User;
}

const UserCard = ({ data }: { data: props }) => {
  // console.log(data);
  return (
    <Card className="p-5 min-w-[15rem] h-full shadow-none border-b-1 border-gray-300 md:border-none">
      <CardHeader className="flex justify-center">
        <Badge>
          <Link href={`/user/${data?.user?._id}`}>
            <Avatar size="lg" src={data?.user?.image} />
          </Link>
        </Badge>
      </CardHeader>
      <CardBody className="text-center">
        <p>{data?.user?.userName}</p>
        <p>Rank:</p>
        <p></p>
        <p>Posts:</p>
        <p>Joined:</p>
      </CardBody>
    </Card>
  );
};

export default UserCard;

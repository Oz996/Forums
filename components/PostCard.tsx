import { Post } from "@/types";
import { Avatar, Card, CardHeader, Chip, Divider } from "@nextui-org/react";
import { useTheme } from "next-themes";
import Image from "next/image";
import Link from "next/link";
import classnames from "classnames";
import UserAvatar from "./UserAvatar";
import { isNew } from "@/lib/utils/newDate";

const PostCard = ({ post }: { post: Post }) => {
  const { theme } = useTheme();
  const newPost = isNew(post);

  return (
    <Link href={`/post/${post?.id}`}>
      <Card
        className={classnames({
          "p-10 m-3 mx-auto flex flex-col border-b-8 max-md:rounded hover:scale-[100.5%] duration-200":
            true,
          "border-b-blue-500": post?.category === "blue",
          "border-b-red-500": post?.category === "red",
          "border-b-yellow-400": post?.category === "yellow",
          "border-b-orange-500": post?.category === "orange",
          "hover:bg-gray-800": theme === "dark",
          "hover:bg-gray-100": theme !== "dark",
        })}
      >
        <CardHeader className="flex gap-5 mb-2">
          <div>
            <UserAvatar user={post?.user} image={post?.user?.image} />
          </div>
          <div className="flex flex-col gap-2">
            <p className="text-xl font-semibold">{post?.title}</p>
            <p className="text-sm text-gray-500">
              Posted by {post?.user?.userName}
            </p>
          </div>
          <div className="flex justify-start sm:justify-end items-center gap-1 ml-auto">
            <Image
              src="/message.svg"
              alt="message icon"
              width={35}
              height={35}
            />
            <p className="font-semibold">{post?.comments?.length}</p>
          </div>
        </CardHeader>
        <Divider />
        <div className="lg:px-20 mt-10 line-clamp-3">
          <p className="mb-3">{post?.body}</p>
          {newPost && (
            <Chip
              className={classnames({
                "text-white uppercase": true,
                "bg-red-500": post?.category === "red",
                "bg-blue-500": post?.category === "blue",
                "bg-yellow-500": post?.category === "yellow",
                "bg-orange-500": post?.category === "orange",
              })}
            >
              new
            </Chip>
          )}
        </div>
      </Card>
    </Link>
  );
};

export default PostCard;

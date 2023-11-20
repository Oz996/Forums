import { Post } from "@/types";
import { Avatar, Card, CardHeader, Chip } from "@nextui-org/react";
import { useTheme } from "next-themes";
import Image from "next/image";
import Link from "next/link";
import classnames from "classnames";

const PostCard = ({ post }: { post: Post }) => {
  const substring = () => {
    const body = post?.body;
    const bodyLength = post?.body.length > 200;
    if (bodyLength) {
      return body.substring(0, 200) + "...";
    }
    return body;
  };

  const body = substring();
  console.log(post);
  const { theme } = useTheme();

  const isNew =
    Date.now() - new Date(post?.createdAt).getTime() < 1000 * 60 * 60 * 24 * 1;

  return (
    <Link href={`/post/${post?.id}`}>
      <Card
        className={classnames({
          "p-10 m-3 mx-auto flex flex-col border-b-8 max-md:rounded hover:scale-[100.5%] duration-200":
            true,
          "border-b-blue-500": post?.category === "blue",
          "border-b-red-500": post?.category === "red",
          "border-b-yellow-400": post?.category === "yellow",
          "hover:bg-gray-800": theme === "dark",
          "hover:bg-gray-100": theme !== "dark",
        })}
      >
        <CardHeader className="grid sm:grid-cols-3">
          <div>
            <Avatar size="lg" src={post?.user?.image} />
          </div>
          <div className="flex flex-col gap-2">
            <p className="text-xl font-semibold">{post?.title}</p>
            <p className="text-sm text-gray-500">
              Posted by {post?.user?.userName}
            </p>
          </div>
          <div className="flex justify-start sm:justify-end items-center gap-1">
            <Image
              src="/message.svg"
              alt="message icon"
              width={35}
              height={35}
            />
            <p className="font-semibold">{post?.comments?.length}</p>
          </div>
        </CardHeader>
        <div className="lg:px-20 mt-10">
          <p className="mb-3">{body}</p>
          {isNew && (
            <Chip
              className={classnames({
                "text-white uppercase": true,
                "bg-red-500": post?.category === "red",
                "bg-blue-500": post?.category === "blue",
                "bg-yellow-500": post?.category === "yellow",
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

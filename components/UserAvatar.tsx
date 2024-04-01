"use client";
import { isNew } from "@/lib/utils/newDate";
import { User } from "@/types";
import { Avatar, Badge, Skeleton } from "@nextui-org/react";
import { FaStar } from "react-icons/fa";
import React from "react";
import { usePathname } from "next/navigation";

interface props {
  image: string;
  user: User;
  className?: string;
  isLoading?: boolean;
}

const UserAvatar = ({ image, className, user, isLoading }: props) => {
  const newUser = isNew(user);
  const path = usePathname();
  const userPage = path.startsWith("/user");

  if (isLoading)
    return (
      <Skeleton
        className={`${className ? className : "h-14 w-14"} rounded-full`}
      />
    );

  return (
    <Badge
      isOneChar
      size="lg"
      content={<FaStar className="text-white" />}
      color="warning"
      placement={userPage ? "bottom-right" : "top-right"}
      isInvisible={!user?.premium}
    >
      <Badge
        size="lg"
        content="new"
        color="primary"
        placement={userPage ? "bottom-left" : "top-left"}
        isInvisible={!newUser}
      >
        <Avatar
          className={className}
          size="lg"
          src={
            image === ""
              ? "https://cdn-icons-png.flaticon.com/512/149/149071.png"
              : image
          }
        />
      </Badge>
    </Badge>
  );
};

export default UserAvatar;

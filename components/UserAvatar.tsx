import { Avatar } from "@nextui-org/react";
import React from "react";

interface props {
  image: string;
  className?: string;
}

const UserAvatar = ({ image, className }: props) => {
  return (
    <Avatar
      className={className}
      size="lg"
      src={
        image === ""
          ? "https://cdn-icons-png.flaticon.com/512/149/149071.png"
          : image
      }
    />
  );
};

export default UserAvatar;

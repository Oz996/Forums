import { Avatar } from "@nextui-org/react";
import React from "react";

const UserAvatar = ({ image }: { image: string }) => {
  return (
    <Avatar
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

"use client";
import { useRouter } from "next/navigation";
import React from "react";
import { IoIosArrowBack } from "react-icons/io";

const BackArrow = () => {
  const router = useRouter();

  return (
    <div
      className="flex gap-1 items-center absolute top-[5rem] left-[33rem] cursor-pointer"
      onClick={() => router.back()}
    >
      <IoIosArrowBack size={22} />
      <p>Go back</p>
    </div>
  );
};

export default BackArrow;

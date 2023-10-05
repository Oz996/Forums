"use client";
import { useQuery } from "@tanstack/react-query";
import { getPosts } from "./api/api";
import PostCard from "@/components/PostCard";
import { Spinner } from "@nextui-org/react";
import { Post } from "@/types/types";

export default function Home() {
  const { data, isLoading } = useQuery({
    queryKey: ["posts"],
    queryFn: getPosts,
  });
  
  const posts = data?.data || [];
  console.log(posts);

  if (isLoading)
    return (
      <div className="flex justify-center items-center pt-24">
        <Spinner label="Loading..." color="secondary" />
      </div>
    );

  return (
    <section className="flex min-h-screen flex-col items-center justify-between md:p-24 pt-24">
      <div className="max-w-[62rem]">
        {posts?.map((post: Post) => (
          <PostCard key={post._id} post={post} />
        ))}
      </div>
    </section>
  );
}

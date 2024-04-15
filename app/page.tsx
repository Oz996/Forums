"use client";
import { useQuery } from "@tanstack/react-query";
import { getPosts } from "../services/services";
import PostCard from "@/components/PostCard";
import { Post } from "@/types";
import { useState } from "react";
import SearchPost from "./SearchPost";
import PostsSkeleton from "./PostsSkeleton";

export default function Home() {
  const [search, setSearch] = useState("");
  const { data: posts, isLoading } = useQuery({
    queryKey: ["posts"],
    queryFn: getPosts,
  });

  console.log(search);
  console.log(posts);

  return (
    <section className="flex min-h-screen flex-col items-center">
      <div className="lg:max-w-[62rem] w-full">
        <SearchPost setSearch={setSearch} />
      </div>

      <div className="lg:max-w-[62rem] w-full">
        {isLoading && <PostsSkeleton />}
        {posts
          ?.filter((post: Post) => {
            return (
              search.trim() === "" ||
              post?.title.toLowerCase().includes(search.toLowerCase()) ||
              post?.category.toLowerCase().includes(search.toLowerCase())
            );
          })
          .map((post: Post) => (
            <PostCard key={post.id} post={post} />
          ))}
      </div>
    </section>
  );
}

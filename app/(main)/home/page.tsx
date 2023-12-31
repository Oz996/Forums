"use client";
import { useQuery } from "@tanstack/react-query";
import { getPosts } from "../../api/api";
import PostCard from "@/components/PostCard";
import { Card, Input, Select, SelectItem, Spinner } from "@nextui-org/react";
import { Categories, Post } from "@/types";
import { useState } from "react";

export default function Home() {
  const [search, setSearch] = useState("");
  const { data, isLoading } = useQuery({
    queryKey: ["posts"],
    queryFn: getPosts,
  });

  const posts = data || [];

  const categories: Categories[] = [
    { id: 0, value: "", name: "All" },
    { id: 1, value: "red", name: "Red" },
    { id: 2, value: "blue", name: "Blue" },
    { id: 3, value: "yellow", name: "Yellow" },
  ];

  return (
    <section className="flex min-h-screen flex-col items-center">
      <div className="md:w-[62rem] w-full">
        <Card className="p-10">
          <div className="flex flex-col md:flex-row gap-3">
            <div className="md:w-[30%]">
              <Select label="Select Category">
                {categories.map((category) => (
                  <SelectItem key={category.value} value={category.value}>
                    {category.name}
                  </SelectItem>
                ))}
              </Select>
            </div>
            <div className="md:w-[70%]">
              <Input
                onChange={(e) => setSearch(e.target.value)}
                label="Search for post..."
              />
            </div>
          </div>
        </Card>
      </div>
      {isLoading ? (
        <div className="flex justify-center items-center pt-24">
          <Spinner label="Loading..." color="secondary" />
        </div>
      ) : (
        <div className="lg:max-w-[62rem] w-full">
          {posts
            ?.filter((post: Post) => {
              const searchPost =
                search.trim() === "" ||
                post?.title.toLowerCase().includes(search.toLowerCase());
              return searchPost;
            })
            .map((post: Post) => (
              <PostCard key={post.id} post={post} />
            ))}
        </div>
      )}
    </section>
  );
}

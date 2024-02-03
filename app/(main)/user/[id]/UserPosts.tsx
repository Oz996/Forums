import PostCard from "@/components/PostCard";
import { Comment, Post } from "@/types";
import React from "react";

interface props {
  posts: Post[];
  comments: Comment[];
  isUser: boolean;
}

const UserPosts = ({ posts, comments, isUser }: props) => {
  return (
    <>
      <div>
        {posts?.length === 0 ? (
          <h2 className="text-center text-xl font-semibold mb-5">No posts</h2>
        ) : (
          <h2 className="text-center text-xl font-semibold mb-5">
            {isUser ? "Your Posts" : "Users Posts"}
          </h2>
        )}
        {posts?.map((post: Post) => (
          <PostCard key={post?.id} post={post} />
        ))}
      </div>
      <div>
        {comments?.length === 0 ? (
          <h2 className="text-center text-xl font-semibold mb-5">
            No comments
          </h2>
        ) : (
          <h2 className="text-center text-xl font-semibold mb-5">
            {isUser ? "Your Latest Comments" : "Users Latest Comments"}
          </h2>
        )}
        {comments?.map((comment: Comment) => (
          <div key={comment?.id}>
            <p>{comment?.body}</p>
          </div>
        ))}
      </div>
    </>
  );
};

export default UserPosts;

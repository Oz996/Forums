import prisma from "@/lib/prisma";
import { Post } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const post = await prisma.post.findUnique({
      where: {
        id: params.id,
      },
      include: {
        comments: {
          include: {
            post: true,
            user: true,
          },
        },
        user: {
          include: {
            posts: true,
          },
        },
      },
    });
    return NextResponse.json(post, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to retrieve post" },
      { status: 500 }
    );
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const Body = await req.json();
    const { body, title } = Body;
    const updatedPost = await prisma.post.update({
      where: {
        id: params.id,
      },
      data: {
        title,
        body,
        editedAt: new Date(),
      },
    });
    return NextResponse.json(updatedPost, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Failed to edit post", error },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const postComments = await prisma.comment.deleteMany({
      where: {
        postId: params.id,
      },
    });

    const deletePost = await prisma.post.delete({
      where: {
        id: params.id,
      },
    });
    return NextResponse.json({ message: "Post deleted" }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Failed to delete post", error },
      { status: 500 }
    );
  }
}

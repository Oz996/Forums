import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const Body = await req.json();
    const { body, userId } = Body;

    const comment = await prisma.comment.create({
      data: {
        body,
        post: {
          connect: { id: params.id },
        },
        user: {
          connect: { id: userId },
        },
      },
    });
    return NextResponse.json(comment, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Failed to post comment", error },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    console.log("params", params);
    const deleteComment = await prisma.comment.delete({
      where: {
        id: params.id,
      },
    });
    return NextResponse.json({ message: "Comment deleted" }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Failed to delete comment" },
      { status: 500 }
    );
  }
}

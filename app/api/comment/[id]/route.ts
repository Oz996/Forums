import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { isAuthenticated } from "../../isAuthenticated";

export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    if (isAuthenticated(req)) {
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
    } else {
      return NextResponse.json(
        { message: "Authentication failed" },
        { status: 401 }
      );
    }
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
    if (isAuthenticated(req)) {
      const deleteComment = await prisma.comment.delete({
        where: {
          id: params.id,
        },
      });
      return NextResponse.json({ message: "Comment deleted" }, { status: 200 });
    } else {
      return NextResponse.json(
        { message: "Authentication failed" },
        { status: 401 }
      );
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Failed to delete comment" },
      { status: 500 }
    );
  }
}

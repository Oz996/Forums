import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: params.id,
      },
      include: {
        comments: true,
        posts: {
          include: {
            comments: true,
          },
        },
      },
    });

    if (!user)
      return NextResponse.json({ message: "User not found" }, { status: 404 });

    return NextResponse.json(user, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Failed to retreive user", error },
      { status: 500 }
    );
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await req.json();
    const { email, userName, password } = body;

    const updatedUser = await prisma.user.update({
      where: {
        id: params.id,
      },
      data: {
        email,
        userName,
        password,
      },
    });
    return NextResponse.json(updatedUser, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Failed to update user credentials", error },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  console.log("params", params);
  try {
    const deleteUsersPosts = await prisma.post.deleteMany({
      where: {
        userId: params.id,
      },
    });
    const deleteUsersComments = await prisma.comment.deleteMany({
      where: {
        userId: params.id,
      },
    });
    const deleteUser = await prisma.user.delete({
      where: {
        id: params.id,
      },
    });
    return NextResponse.json(
      { message: "User has been deleted" },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Failed to delete user", error },
      { status: 500 }
    );
  }
}

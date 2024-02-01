import prisma from "@/lib/prisma/";
import jwt from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";
import { isAuthenticated } from "../isAuthenticated";

export async function GET() {
  try {
    const posts = await prisma.post.findMany({
      include: {
        comments: true,
        user: true,
      },
      orderBy: {
        id: "desc",
      },
    });
    return NextResponse.json(posts, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Failed to retrieve posts", error },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    if (isAuthenticated(req)) {
      const Body = await req.json();
      const { title, body, category, userId } = Body;

      if (!title || !body || !category) {
        return NextResponse.json({ message: "Invalid post" }, { status: 400 });
      }

      const newPost = await prisma.post.create({
        data: {
          title,
          body,
          category,
          user: {
            connect: { id: userId },
          },
        },
        include: {
          comments: true,
        },
      });
      return NextResponse.json(newPost, { status: 201 });
    } else {
      return NextResponse.json(
        { message: "Authentication failed" },
        { status: 401 }
      );
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Failed to create the post", error },
      { status: 500 }
    );
  }
}

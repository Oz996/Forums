import prisma from "@/lib/prisma";
import { User } from "@/types";
import { hash } from "bcrypt";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body: User = await req.json();
    const { userName, email, password, image } = body;

    const hashedPassword = await hash(password, 10);

    const newUser = await prisma.user.create({
      data: {
        userName,
        email,
        password: hashedPassword,
        image,
      },
    });
    return NextResponse.json(newUser, { status: 201 });
  } catch (error: any) {
    if (error.code === "P2002") {
      return NextResponse.json(
        { message: "Email is already registered" },
        { status: 409 }
      );
    }
    return NextResponse.json(
      { message: "Failed to create user", error },
      { status: 500 }
    );
  }
}

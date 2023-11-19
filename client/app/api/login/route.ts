import prisma from "@/lib/prisma";
import { User } from "@/types/types";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export async function POST(req: NextRequest) {
  try {
    const body: User = await req.json();
    const { email, password } = body;

    const user = await prisma.user.findUnique({
      where: {
        email,
      },
      include: {
        comments: true,
        posts: true,
      },
    });

    if (!user) return null;

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) return null;

    const secretKey = process.env.SECRET_KEY;

    const token = jwt.sign({ userId: user?.id }, secretKey!, {
      expiresIn: "1h",
    });

    return NextResponse.json({ token, userId: user.id });
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to authenticate user", error },
      { status: 500 }
    );
  }
}

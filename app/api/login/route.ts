import prisma from "@/lib/prisma";
import { User } from "@/types";
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

    if (!user)
      return NextResponse.json({ message: "User not found" }, { status: 404 });

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return NextResponse.json(
        { message: "Invalid password" },
        { status: 401 }
      );
    }

    const secretKey = process.env.SECRET_KEY;
    const premium = user.premium ? true : false;

    const tokenData = {
      userId: user.id,
      premium,
    };

    const token = jwt.sign(tokenData, secretKey!, {
      expiresIn: "1h",
    });

    // return NextResponse.json({ token, userId: user.id, premium: isPremium });

    const res = NextResponse.json({
      success: true,
      userId: user.id,
      premium,
      userEmail: email,
    });
    res.cookies.set("token", token, { httpOnly: true, secure: true });
    res.cookies.set("authenticated", "true", { secure: true });
    return res;
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to authenticate user", error },
      { status: 500 }
    );
  }
}

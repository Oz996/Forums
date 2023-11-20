import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const memberships = await prisma.membership.findMany();
    return NextResponse.json(memberships, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Failed to retrieve membership options" },
      { status: 500 }
    );
  }
}

import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const res = NextResponse.json({ success: true });

    res.cookies.delete("token");
    res.cookies.set("authenticated", "false");
    return res;
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to logout user", error },
      { status: 500 }
    );
  }
}

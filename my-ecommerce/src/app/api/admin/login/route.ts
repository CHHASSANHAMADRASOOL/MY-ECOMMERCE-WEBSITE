import { prisma } from "@/lib/prisma/prisma";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
  try {
    const { HASSAN, DUA } = await req.json();

    if (!HASSAN || !DUA) {
      return NextResponse.json(
        { success: false, message: "All fields are required" },
        { status: 400 }
      );
    }

    // Find Admin
    const admin = await prisma.admin.findUnique({
      where: { username: HASSAN },
    });

    if (!admin) {
      return NextResponse.json(
        { success: false, message: "Invalid credentials" },
        { status: 401 }
      );
    }

    // Compare Hashed Password
    const isPasswordValid = await bcrypt.compare(DUA, admin.password);

    if (!isPasswordValid) {
      return NextResponse.json(
        { success: false, message: "Invalid credentials" },
        { status: 401 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Login Successful",
      admin: {
        id: admin.id,
        username: admin.username,
      },
    });

  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Server Error" },
      { status: 500 }
    );
  }
}
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dbConnect from "@/lib/dbConnect";
import User from "@/models/userModel";

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";

export async function POST(req: Request) {
  try {
    await dbConnect();
    const { email, password } = await req.json();

    // Check if email and password are provided
    if (!email || !password) {
      return NextResponse.json(
        {
          status: "validation_error",
          data: {
            email: email ? [] : ["Email is required."],
            password: password ? [] : ["Password is required."],
          },
        },
        { status: 400 }
      );
    }

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json(
        {
          status: "error",
          error_message: "User not found!",
        },
        { status: 404 }
      );
    }

    // Validate password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return NextResponse.json(
        {
          status: "error",
          error_message: "Invalid credentials!",
        },
        { status: 401 }
      );
    }

    // Generate JWT token
    const token = jwt.sign({ userId: user._id, email: user.email }, JWT_SECRET, {
      expiresIn: "7d",
    });

    return NextResponse.json({
      status: "success",
      message: "Login successful",
      access_token: token,
      data: {
        _id: user._id,
        email: user.email,
        name: user.name,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json(
      {
        status: "error",
        error_message: "Internal server error",
      },
      { status: 500 }
    );
  }
}

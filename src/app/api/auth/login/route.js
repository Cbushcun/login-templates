/**
 * @description User login API Route.
 */
// /src/app/api/auth/login/route.js
import { connectDB, insertSession } from "@/lib/db";
import bcrypt from "bcrypt";
import { v4 as uuidv4 } from "uuid";
import User from "@/models/Users";
import { NextResponse } from "next/server";
import { createToken } from "@/lib/tokens";

export async function POST(req) {
	await connectDB();

	const formData = await req.formData();
	const email = formData.get("email")?.toString().trim().toLowerCase();
	const password = formData.get("password")?.toString();

	if (!email || !password) {
		return NextResponse.json("Email and password are required.", {
			status: 400,
		});
	}

	const existingUser = await User.findOne({ email });
	if (!existingUser) {
		return NextResponse.json("Invalid email or password.", { status: 401 });
	}

	const isPasswordValid = await bcrypt.compare(password, existingUser.password);

	if (isPasswordValid) {
		// Here you would normally create a session or JWT token
		const sessionId = uuidv4();

		const accessToken = createToken(
			{ userId: existingUser._id, sessionId },
			"15m"
		);

		const refreshToken = createToken(
			{ userId: existingUser._id, sessionId },
			"7d"
		);

		await insertSession(
			sessionId,
			existingUser._id,
			refreshToken,
			req,
			existingUser.role
		);

		const res = NextResponse.redirect(new URL("/profile", req.url));
		res.cookies.set("accessToken", accessToken, {
			httpOnly: true,
			secure: process.env.PRODUCTION,
			sameSite: "Strict",
			maxAge: 15 * 60, // 15 minutes
			path: "/",
		});

		res.cookies.set("refreshToken", refreshToken, {
			httpOnly: true,
			secure: process.env.NODE_ENV === "production",
			sameSite: "Strict",
			maxAge: 7 * 24 * 60 * 60, // 7 days
			path: "/",
		});

		return res;
	}
}

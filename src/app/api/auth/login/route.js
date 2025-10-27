/**
 * @description User login API Route.
 */
// /src/app/api/auth/login/route.js
import { connectDB } from "@/lib/db";
import bcrypt from "bcrypt";
import { v4 as uuidv4 } from "uuid";
import jwt from "jsonwebtoken";
import User from "@/models/Users";
import Session from "@/models/Sessions";
import { NextResponse } from "next/server";

export async function POST(req) {
	await connectDB();

	const formData = await req.formData();
	const email = formData.get("email")?.toString().trim().toLowerCase();
	const password = formData.get("password")?.toString();

	if (!email || !password) {
		return new Response("Email and password are required.", { status: 400 });
	}

	const existingUser = await User.findOne({ email });
	if (!existingUser) {
		return new Response("Invalid email or password.", { status: 401 });
	}

	const isPasswordValid = await bcrypt.compare(password, existingUser.password);

	if (isPasswordValid) {
		// Here you would normally create a session or JWT token
		const sessionId = uuidv4();

		const accessToken = jwt.sign(
			{ userId: existingUser._id, sessionId },
			process.env.JWT_SECRET,
			{ expiresIn: "15m" }
		);

		const refreshToken = jwt.sign(
			{ userId: existingUser._id, sessionId },
			process.env.JWT_SECRET,
			{
				expiresIn: "7d",
			}
		);

		const newSession = new Session({
			_id: sessionId,
			userId: existingUser._id,
			refreshToken,
			ipAddress: req.ip || "Unknown",
			userAgent: req.headers.get("user-agent") || "Unknown",
			role: existingUser.role,
		});
		await newSession.save();

		const res = NextResponse.json("Login successful.", { status: 200 });
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

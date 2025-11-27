/**
 * @description User login API Route.
 */
// /src/app/api/auth/login/route.js
import { connectDB, insertSession } from "@/lib/db";
import bcrypt from "bcrypt";
import { v4 as uuidv4 } from "uuid";
import User from "@/models/Users";
import { NextResponse } from "next/server";
import { createJwt } from "@/lib/tokens";
import { cookieParams } from "@/lib/cookies";

const isDev = process.env.NODE_ENV === "development";

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

	try {
		const loginSuccess = await db.authenticateLogin(email, password).success;
		isDev ? console.log("Login attempt for: ", email) : null;
	} catch (err) {
		return NextResponse.json("Internal Server Error. Please try again later.", {
			status: 500,
		});
	}

	// implement logic for successful login using db class

	const isPasswordValid = await bcrypt.compare(password, existingUser.password);

	if (isPasswordValid) {
		const sessionId = uuidv4();
		const res = NextResponse.redirect(new URL("/profile", req.url));
		const accessToken = createJwt(
			{ userId: existingUser._id, sessionId },
			"15m"
		);
		const refreshToken = createJwt(
			{ userId: existingUser._id, sessionId },
			"7d"
		);
		const hashedRefreshToken = await bcrypt.hash(refreshToken, 12);
		const ipAddress = req.ip || "Unknown";
		const userAgent = req.headers.get("user-agent") || "Unknown";

		res.cookies.set("accessToken", "", { ...cookieParams, maxAge: 0 });
		res.cookies.set("refreshToken", "", { ...cookieParams, maxAge: 0 });

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

		await insertSession(
			sessionId,
			existingUser._id,
			hashedRefreshToken,
			ipAddress,
			userAgent,
			existingUser.role
		);

		return res;
	}
	return NextResponse.json("Invalid email or password.", { status: 401 });
}

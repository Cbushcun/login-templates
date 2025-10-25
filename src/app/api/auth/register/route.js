import { connectDB } from "@/lib/db";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import User from "@/models/Users";
import Session from "@/models/Sessions";
import jwt from "jsonwebtoken";
import { v4 as uuidv4 } from "uuid";

export async function POST(request) {
	try {
		await connectDB();

		const formData = await request.formData();
		const username = formData.get("username")?.toString().trim();
		const email = formData.get("email")?.toString().trim().toLowerCase();
		const password = formData.get("password")?.toString();
		console.log(formData);

		if (!username || !email || !password) {
			return NextResponse.json(
				{ error: "All fields are required." },
				{ status: 400 }
			);
		}

		const existingUser = await User.findOne({ email });
		if (existingUser) {
			return NextResponse.json(
				{ error: "Email is already registered." },
				{ status: 400 }
			);
		}
		const hashedPassword = await bcrypt.hash(password, 12);

		const newUser = new User({
			username,
			email,
			password: hashedPassword,
		});
		await newUser.save();
		const sessionId = uuidv4();
		const refreshToken = jwt.sign(
			{ userId: newUser._id, sessionId },
			process.env.JWT_SECRET,
			{
				expiresIn: "7d",
			}
		);
		const newSession = new Session({
			sessionId,
			userId: newUser._id,
			refreshToken,
			ipAddress: request.ip || "Unknown",
			userAgent: request.headers.get("user-agent") || "Unknown",
			role: newUser.role,
		});
		await newSession.save();
		return NextResponse.json(
			{ message: "User registered successfully." },
			{ status: 201 }
		);
	} catch (error) {
		console.error("Registration error:", error);
		return NextResponse.json(
			{ error: "Internal Server Error: " + error.message },
			{ status: 500 }
		);
	}
}

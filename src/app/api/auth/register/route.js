/**
 * @description User Registration API Route.
 */
// /src/app/api/auth/register/route.js
import { connectDB } from "@/lib/db";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import User from "@/models/Users";

export async function POST(req) {
	try {
		const isDev = process.env.NODE_ENV === "development";

		await connectDB();

		const formData = await req.formData();
		const username = formData.get("username")?.toString().trim();
		const email = formData.get("email")?.toString().trim().toLowerCase();
		const password = formData.get("password")?.toString();

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
		return NextResponse.redirect(new URL("/login", req.url));
		/* return NextResponse.json(
			{ message: "User registered successfully." },
			{ status: 201 }
		); */
	} catch (error) {
		isDev ? console.error("Registration error:", error) : "";
		return NextResponse.json(
			{ error: "Internal Server Error. Please try again later." },
			{ status: 500 }
		);
	}
}

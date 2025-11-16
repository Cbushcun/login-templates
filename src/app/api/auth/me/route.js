/**
 * @description User information retrieval API Route.
 */
// /src/app/api/auth/me/route.js
import { connectDB } from "@/lib/db";
import { NextResponse } from "next/server";
import User from "@/models/Users";
import { getTokenData } from "@/lib/authenticate";

const isDev = process.env.NODE_ENV === "development";

export async function POST(req) {
	try {
		await connectDB();

		// Extract accessToken from cookies
		const accessToken = req.cookies.get("accessToken")?.value;

		if (!accessToken) {
			isDev ? console.error("No access token provided") : "";
			return NextResponse.json(
				{ error: "Unauthorized. No token provided." },
				{ status: 401 }
			);
		}

		// Decode token to get userId
		const tokenData = getTokenData(accessToken);

		if (!tokenData || !tokenData.userId) {
			isDev ? console.error("Invalid token data") : "";
			return NextResponse.json(
				{ error: "Unauthorized. Invalid token." },
				{ status: 401 }
			);
		}

		// Fetch user from database
		const user = await User.findById(tokenData.userId).select(
			"-password"
		);

		if (!user) {
			isDev ? console.error("User not found") : "";
			return NextResponse.json(
				{ error: "User not found." },
				{ status: 404 }
			);
		}

		isDev ? console.log("User data retrieved for:", user.username) : "";

		return NextResponse.json({
			user: {
				_id: user._id,
				username: user.username,
				email: user.email,
				name: user.name || "",
				title: user.title || "",
				bio: user.bio || "",
				role: user.role,
				active: user.active,
			},
		});
	} catch (error) {
		isDev ? console.error("Auth me error:", error) : "";
		return NextResponse.json(
			{ error: "Internal Server Error. Please try again later." },
			{ status: 500 }
		);
	}
}

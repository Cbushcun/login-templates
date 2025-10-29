import { NextResponse } from "next/server";
import { verifyToken } from "@/lib/authenticate";

export function proxy(req) {
	const token = req.cookies.get("accessToken")?.value;

	if (!token) {
		return NextResponse.json("Unauthorized", { status: 401 });
	}

	const isAuthenticated = verifyToken(token);

	if (isAuthenticated.valid) {
		return NextResponse.next();
	}

	// Redirect to login page if not authenticated
	return NextResponse.json("Unauthorized", { status: 401 });
}

export const config = {
	matcher: "/profile",
};

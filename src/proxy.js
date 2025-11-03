import { NextResponse } from "next/server";
import { verifyToken, getNewToken, getTokenData } from "@/lib/authenticate";
import { getSessionById } from "@/lib/db";
import bcrypt from "bcrypt";
import { clearAllTokens } from "./lib/tokens";

export async function proxy(req) {
	const token = req.cookies.get("accessToken")?.value;
	const isTokenValid = verifyToken(token);

	if (!token || !isTokenValid) {
		console.log("Acess token invalid or expired");
		const refreshToken = req.cookies.get("refreshToken")?.value;
		const isRefreshTokenValid = verifyToken(refreshToken);

		if (!refreshToken || !isRefreshTokenValid) {
			return NextResponse.json("Unauthorized", { status: 401 });
		} else if (isRefreshTokenValid) {
			const tokenData = getTokenData(refreshToken);
			const session = await getSessionById(tokenData.sessionId);
			const validToken = await bcrypt.compare(
				refreshToken,
				session.refreshToken
			);
			const validUser = tokenData.userId === session.userId.toString();

			if (validToken && validUser && session.expiresAt > new Date()) {
				const newAccessToken = getNewToken(refreshToken);
				const res = NextResponse.next();
				res.cookies.set("accessToken", newAccessToken, {
					httpOnly: true,
					secure: process.env.NODE_ENV === "production",
					sameSite: "Strict",
					maxAge: 15 * 60, // 15 minutes
					path: "/",
				});
				return res;
			} else if (session.expiresAt <= new Date()) {
				console.log("Refresh token expired");
				session.delete();
				const res = NextResponse.json("Unauthorized", { status: 401 });
			}
		}
		res = NextResponse.json("Unauthorized", { status: 401 });
		clearAllTokens(res);
		return res;
	}
	return NextResponse.next();
}

export const config = {
	matcher: "/profile",
};

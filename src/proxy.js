import { NextResponse } from "next/server";
import { regenerateJwt, getJwtData } from "@/lib/tokens";
import { validateJwt } from "@/lib/authenticate";
import { getSessionById } from "@/lib/db";
import { cookieParams } from "@/lib/cookies"; // Be sure to set maxAge independent of cookieParams
import bcrypt from "bcrypt";

export async function proxy(req) {
	const token = req.cookies.get("accessToken")?.value;
	const isTokenValid = validateJwt(token);

	if (!token || !isTokenValid) {
		console.log("Access token invalid or expired");
		const refreshToken = req.cookies.get("refreshToken")?.value;
		const isRefreshTokenValid = validateJwt(refreshToken);

		if (!refreshToken || !isRefreshTokenValid) {
			console.log("Refresh token invalid or expired");
			const res = NextResponse.json("Unauthorized", { status: 401 });
			res.cookies.set("accessToken", "", { ...cookieParams, maxAge: 0 });
			res.cookies.set("refreshToken", "", { ...cookieParams, maxAge: 0 });
			console.log(res.cookies);
			return res;
		} else if (isRefreshTokenValid) {
			const tokenData = getJwtData(refreshToken);
			const session = (await getSessionById(tokenData.sessionId)).session;
			const validToken = await bcrypt.compare(
				refreshToken,
				session.refreshToken
			);
			const validUser = tokenData.userId === session.userId.toString();

			if (validToken && validUser && session.expiresAt > new Date()) {
				const newAccessToken = regenerateJwt(refreshToken);
				const res = NextResponse.next();
				res.cookies.set("accessToken", newAccessToken, {
					...cookieParams,
					maxAge: 15 * 60, // 15 minutes
				});
				return res;
			} else if (session.expiresAt <= new Date()) {
				console.log("Refresh token expired");
				session.delete();
				const res = NextResponse.json("Unauthorized", { status: 401 });
			}
		}
		res = NextResponse.json("Unauthorized", { status: 401 }); //
		res.cookies.set("accessToken", "", { ...cookieParams, maxAge: 0 });
		res.cookies.set("refreshToken", "", { ...cookieParams, maxAge: 0 });
		return res;
	}
	return NextResponse.next();
}

export const config = {
	matcher: "/profile",
};

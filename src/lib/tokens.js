import jwt from "jsonwebtoken";

export function createToken(payload, expiresIn) {
	return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn });
}

export function clearAllTokens(res) {
	res.cookies.set("accessToken", "", { maxAge: 0, path: "/" });
	res.cookies.set("refreshToken", "", { maxAge: 0, path: "/" });
}

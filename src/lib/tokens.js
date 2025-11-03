import jwt from "jsonwebtoken";

export function createToken(payload, expiresIn) {
	console.log("Creating token with payload:", payload);
	return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn });
}

export function clearAllTokens(res) {
	res.cookies.set("accessToken", "", { maxAge: 0, path: "/" });
	res.cookies.set("refreshToken", "", { maxAge: 0, path: "/" });
	console.log("Cleared all tokens from cookies");
}

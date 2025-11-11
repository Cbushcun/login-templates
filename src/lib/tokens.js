import jwt from "jsonwebtoken";

export const cookieParams = {
	httpOnly: true,
	secure: process.env.NODE_ENV === "production",
	sameSite: "Strict",
	path: "/",
};

export function createToken(payload, expiresIn) {
	console.log("Creating token with payload:", payload);
	return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn });
}

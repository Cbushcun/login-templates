import jwt from "jsonwebtoken";

const isDev = process.env.NODE_ENV === "development";

export const cookieParams = {
	httpOnly: true,
	secure: process.env.NODE_ENV === "production",
	sameSite: "Strict",
	path: "/",
};

export function createToken(payload, expiresIn) {
	isDev ? console.log("Creating token with payload:", payload) : "";
	return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn });
}

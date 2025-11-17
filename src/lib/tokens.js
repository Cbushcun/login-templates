import jwt from "jsonwebtoken";

const isDev = process.env.NODE_ENV === "development";

export function createJwt(payload, expiresIn) {
	isDev ? console.log("Creating token with payload:", payload) : "";
	return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn });
}

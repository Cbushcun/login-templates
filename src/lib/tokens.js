import jwt from "jsonwebtoken";

export function createToken(payload, expiresIn) {
	console.log("Creating token with payload:", payload);
	return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn });
}

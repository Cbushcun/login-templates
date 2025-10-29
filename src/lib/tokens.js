import jwt from "jsonwebtoken";

export function createToken(payload, expiresIn) {
	return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn });
}

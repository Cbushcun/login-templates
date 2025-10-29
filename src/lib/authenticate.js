import jwt from "jsonwebtoken";

export function verifyToken(token) {
	try {
		const decoded = jwt.verify(token, process.env.JWT_SECRET);
		console.log("Decoded token:", decoded);
		return { valid: true, decoded };
	} catch (err) {
		console.log("Token verification error:", err);
		return { valid: false, error: err };
	}
}

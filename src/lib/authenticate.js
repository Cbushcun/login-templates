import jwt from "jsonwebtoken";
import { createToken } from "./tokens.js";

export function verifyToken(token) {
	try {
		const decoded = jwt.verify(token, process.env.JWT_SECRET);
		return true;
	} catch (err) {
		console.error("Token verification error:");
		return false;
	}
}

export function getTokenData(token) {
	try {
		const decoded = jwt.verify(token, process.env.JWT_SECRET, {
			ignoreExpiration: true,
		});
		return decoded;
	} catch (err) {
		console.error("Get token data error:", err);
		return null;
	}
}

export function getNewToken(token) {
	try {
		const decoded = jwt.verify(token, process.env.JWT_SECRET, {
			ignoreExpiration: true,
		});
		const newToken = createToken(
			{ userId: decoded.userId, sessionId: decoded.sessionId },
			"15m"
		);
		return newToken;
	} catch (err) {
		return null;
	}
}

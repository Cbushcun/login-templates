import jwt from "jsonwebtoken";
import { createToken } from "./tokens.js";

export function verifyToken(token) {
	try {
		const decoded = jwt.verify(token, process.env.JWT_SECRET);
		console.log("Token verified");
		return true;
	} catch (err) {
		console.error("Token verification error");
		return false;
	}
}

export function getTokenData(token) {
	try {
		const decoded = jwt.verify(token, process.env.JWT_SECRET, {
			ignoreExpiration: true,
		});
		console.log("Token data retrieved");
		return decoded;
	} catch (err) {
		console.error("Get token data error:");
		return null;
	}
}

export function getNewToken(token) {
	try {
		const decoded = jwt.verify(token, process.env.JWT_SECRET, {
			ignoreExpiration: true,
		});
		console.log("Generating new token");
		const newToken = createToken(
			{ userId: decoded.userId, sessionId: decoded.sessionId },
			"15m"
		);
		console.log("New token generated");
		return newToken;
	} catch (err) {
		return null;
	}
}

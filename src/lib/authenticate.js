import jwt from "jsonwebtoken";
import { createToken } from "./tokens.js";

const isDev = process.env.NODE_ENV === "development";

export function verifyToken(token) {
	try {
		const decoded = jwt.verify(token, process.env.JWT_SECRET);
		isDev ? console.log("Token verified") : "";
		return true;
	} catch (err) {
		isDev ? console.error("Token verification error") : "";
		return false;
	}
}

export function getTokenData(token) {
	try {
		const decoded = jwt.verify(token, process.env.JWT_SECRET, {
			ignoreExpiration: true,
		});
		isDev ? console.log("Token data retrieved") : "";
		return decoded;
	} catch (err) {
		isDev ? console.error("Get token data error:") : "";
		return null;
	}
}

export function getNewToken(token) {
	try {
		const decoded = jwt.verify(token, process.env.JWT_SECRET, {
			ignoreExpiration: true,
		});
		isDev ? console.log("Generating new token") : "";
		const newToken = createToken(
			{ userId: decoded.userId, sessionId: decoded.sessionId },
			"15m"
		);
		isDev ? console.log("New token generated") : "";
		return newToken;
	} catch (err) {
		return null;
	}
}

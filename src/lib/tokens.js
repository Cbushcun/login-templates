import jwt from "jsonwebtoken";

const isDev = process.env.NODE_ENV === "development";

export function createJwt(payload, expiresIn) {
	isDev ? console.log("Creating token with payload:", payload) : "";
	return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn });
}

export function getJwtData(token) {
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

export function regenerateJwt(token) {
	try {
		const decoded = jwt.verify(token, process.env.JWT_SECRET, {
			ignoreExpiration: true,
		});
		isDev ? console.log("Generating new token") : "";
		const newToken = createJwt(
			{ userId: decoded.userId, sessionId: decoded.sessionId },
			"15m"
		);
		isDev ? console.log("New token generated") : "";
		return newToken;
	} catch (err) {
		return null;
	}
}

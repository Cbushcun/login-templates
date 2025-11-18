import jwt from "jsonwebtoken";

const isDev = process.env.NODE_ENV === "development";

export function createJwt(payload, expiresIn) {
	isDev ? console.log("Creating token with payload:", payload) : null;
	return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn });
}

export function getJwtData(token) {
	try {
		const decoded = jwt.verify(token, process.env.JWT_SECRET, {
			ignoreExpiration: true,
		});
		isDev ? console.log("Token data retrieved") : null;
		return decoded;
	} catch (err) {
		isDev ? console.error("Get token data error:") : null;
		return null;
	}
}

export function regenerateJwt(token) {
	try {
		const decoded = jwt.verify(token, process.env.JWT_SECRET, {
			ignoreExpiration: true,
		});
		isDev ? console.log("Generating new token") : null;
		const newToken = createJwt(
			{ userId: decoded.userId, sessionId: decoded.sessionId },
			"15m"
		);
		isDev ? console.log("New token generated") : null;
		return newToken;
	} catch (err) {
		return null;
	}
}

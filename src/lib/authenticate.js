import jwt from "jsonwebtoken";

const isDev = process.env.NODE_ENV === "development";

export function verifyJwt(token) {
	try {
		const decoded = jwt.verify(token, process.env.JWT_SECRET);
		isDev ? console.log("Token verified") : "";
		return true;
	} catch (err) {
		isDev ? console.error("Token verification error") : "";
		return false;
	}
}

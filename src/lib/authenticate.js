import jwt from "jsonwebtoken";

const isDev = process.env.NODE_ENV === "development";

export function validateJwt(token) {
	try {
		if (!token) throw new Error("No token provided");
		const decoded = jwt.verify(token, process.env.JWT_SECRET);
		isDev ? console.log("Token verified") : null;
		return true;
	} catch (err) {
		isDev ? console.error("Token verification error: ", err) : null;
		return false;
	}
}

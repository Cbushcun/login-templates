import mongoose from "mongoose";
import Session from "@/models/Sessions";

let cached = global.mongoose;

if (!cached) {
	cached = global.mongoose = { conn: null, promise: null };
}

export async function connectDB() {
	if (cached.conn) return cached.conn; // return existing connection

	if (!cached.promise) {
		// Create a new connection promise
		cached.promise = mongoose
			.connect(process.env.MONGO_URI, {
				useNewUrlParser: true,
				useUnifiedTopology: true,
			})
			.then((mongoose) => mongoose);
	}

	cached.conn = await cached.promise; // wait for promise if in progress
	return cached.conn;
}

export async function insertSession(_id, userId, refreshToken, req, role) {
	const newSession = new Session({
		_id,
		userId,
		refreshToken,
		ipAddress: req.ip || "Unknown",
		userAgent: req.headers.get("user-agent") || "Unknown",
		role,
	});
	await newSession.save();
}

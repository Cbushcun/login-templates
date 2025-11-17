import mongoose from "mongoose";
import Session from "@/models/Sessions";

const isDev = process.env.NODE_ENV === "development";
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

export async function insertSession(
	_id,
	userId,
	refreshToken,
	ipAddress,
	userAgent,
	role
) {
	try {
		await connectDB();
		const newSession = new Session({
			_id,
			userId,
			refreshToken,
			ipAddress,
			userAgent,
			role,
		});
		await newSession.save();
	} catch (err) {
		isDev ? console.log("Error inserting session:", err) : null;
		return null;
	}
}

export async function getSessionById(id) {
	try {
		await connectDB();
		const session = await Session.findById(id).select(
			"-refreshToken -_id -ipAddress -userAgent -role -__v -createdAt"
		);
		return session;
	} catch (err) {
		isDev ? console.log("Error obtaining session by ID:", err) : null;
		return null;
	}
}

export async function deleteSessionById(id) {
	try {
		await connectDB();
		const session = await Session.findByIdAndDelete(id);
		return session;
	} catch (err) {
		isDev ? console.log("Error deleting session by ID:", err) : null;
		return null;
	}
}

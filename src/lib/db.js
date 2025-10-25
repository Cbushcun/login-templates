import mongoose from "mongoose";

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

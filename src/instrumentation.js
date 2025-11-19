/**
 * @description Next.js instrumentation file for initializing database connection at app startup.
 * This file is automatically called by Next.js when the server starts.
 */
import { connectDB } from "@/lib/db";

const isDev = process.env.NODE_ENV === "development";

export async function register() {
	if (process.env.NEXT_RUNTIME === "nodejs") {
		try {
			await connectDB();
			isDev ? console.log("✅ Database connected successfully at app startup") : null;
		} catch (error) {
			console.error("❌ Failed to connect to database at app startup:", error);
			// Don't throw - let the app start anyway and fail gracefully on API calls
		}
	}
}

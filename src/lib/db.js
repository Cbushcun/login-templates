import mongoose from "mongoose";
import Session from "@/models/Sessions";
import User from "@/models/Users";
import bcrypt from "bcryptjs";

const isDev = process.env.NODE_ENV === "development";
let cached = global.mongoose;

class Database {
	constructor() {
		this.connection = null;
	}

	async connect() {
		if (this.connection) {
			return this.connection;
		}
		this.connection = await mongoose.connect(process.env.MONGO_URI, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		});
		return this.connection;
	}

	async disconnect() {
		if (this.connection) {
			await mongoose.disconnect();
			this.connection = null;
		}
	}

	/*--------------------------------------
	 * Authentication Methods
	 *--------------------------------------
	 */
	async authenticateLogin(email, password) {
		try {
			await this.connect();
			const user = await User.findOne({ email });
			if (!user) throw new Error("Email not found");
			const isMatch = await bcrypt.compare(password, user.password);
			if (!isMatch) throw new Error("Invalid credentials");
			isDev ? console.log("User authenticated: ", user._id) : null;
			return { success: true, user: user._id };
		} catch (err) {
			isDev ? console.log("Error authenticating login: ", err) : null;
			return { success: false, user: null };
		}
	}

	/*--------------------------------------
	 * Session Methods
	 *--------------------------------------
	 */

	async insertSession(
		userId,
		refreshToken,
		ipAddress,
		userAgent,
		role = "user"
	) {
		try {
			await this.connect();
			const newSession = new Session({
				userId,
				refreshToken,
				ipAddress,
				userAgent,
				role,
			});
			await newSession.save();
			isDev ? console.log("Inserted new session: ", newSession._id) : null;
			return { success: true, session: newSession._id };
		} catch (err) {
			isDev ? console.log("Error inserting session:", err) : null;
			return { success: false, session: null };
		}
	}

	async getSessionById(id) {
		try {
			await this.connect();
			const session = await Session.findById(id).select(
				" -role -__v -createdAt"
			);
			isDev ? console.log("Obtained session by ID:", id) : null;
			return { success: true, session };
		} catch (err) {
			isDev ? console.log("Error obtaining session by ID:", err) : null;
			return { success: false, session: null };
		}
	}

	async deleteSessionById(id) {
		try {
			await this.connect();
			const session = await Session.findByIdAndDelete(id);
			isDev ? console.log("Deleted session by ID:", id) : null;
			return { success: true, session: session._id };
		} catch (err) {
			isDev ? console.log("Error deleting session by ID:", err) : null;
			return { success: false, session: null };
		}
	}
	/*--------------------------------------
	 * User Methods
	 *--------------------------------------
	 */

	async registerUser(username, email, hashedPassword) {
		try {
			await this.connect();
			const existingEmail = await User.exists({ email });
			const existingUsername = await User.exists({ username });
			if (existingEmail || existingUsername)
				throw new Error("User already exists");
			const newUser = new User({
				username,
				email,
				password: hashedPassword,
			});
			await newUser.save();
			isDev ? console.log("Inserted new user: ", newUser._id) : null;
			return { success: true, user: newUser._id };
		} catch (err) {
			isDev ? console.log("Error inserting user:", err) : null;
			return { success: false, user: null };
		}
	}
}

const database = new Database();
export default database;

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

/*--------------------------------------
 * Create functions
 *--------------------------------------
 */

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
		isDev ? console.log("Inserted new session: ", newSession._id) : null;
		return { success: true, session: newSession._id };
	} catch (err) {
		isDev ? console.log("Error inserting session:", err) : null;
		return { success: false, session: null };
	}
}

export async function registerUser(username, email, hashedPassword) {
	try {
		await connectDB();
		const existingEmail = await User.exists({ email });
		const existingUsername = await User.exists({ username });
		if (existingEmail || existingUsername)
			throw new Error("User already exists");
		const newUser = new User({
			username,
			email,
			password: hashedPassword,
		});
		await newUser.save();
		isDev ? console.log("Registered new user: ", newUser._id) : null;
		return { success: true, user: newUser._id };
	} catch (err) {
		isDev ? console.log("Error registering user:", err) : null;
		return { success: false, user: null };
	}
}

/*--------------------------------------
 * Read functions
 *--------------------------------------
 */
export async function getSessionById(id) {
	try {
		await connectDB();
		const session = await Session.findById(id).select(
			"-_id -role -__v -createdAt"
		);
		isDev ? console.log("Obtained session by ID:", id) : null;
		return { success: true, session };
	} catch (err) {
		isDev ? console.log("Error obtaining session by ID:", err) : null;
		return null;
	}
}

/*--------------------------------------
 * Update functions
 *--------------------------------------
 */

/*--------------------------------------
 * Delete functions
 *--------------------------------------
 */
export async function deleteSessionById(id) {
	try {
		await connectDB();
		const session = await Session.findByIdAndDelete(id);
		isDev ? console.log("Deleted session by ID:", id) : null;
		return { success: true, session: session._id };
	} catch (err) {
		isDev ? console.log("Error deleting session by ID:", err) : null;
		return { success: false, session: null };
	}
}

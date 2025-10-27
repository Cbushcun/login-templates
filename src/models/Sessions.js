import mongoose from "mongoose";
import { v4 as uuidv4 } from "uuid";

const { Schema, models, model } = mongoose;

const sessionSchema = new Schema(
	{
		_id: {
			type: String,
			required: true,
		},
		userId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
			required: true,
		},
		refreshToken: {
			type: String,
			required: true,
			unique: true,
			trim: true,
			lowercase: true,
		},
		ipAddress: {
			type: String,
			required: true,
		},
		role: {
			type: String,
			enum: ["user", "admin"],
			default: "user",
		},
		userAgent: {
			type: String,
			required: true,
			default: "Unknown",
		},
		role: {
			type: String,
			enum: ["user", "admin"],
			default: "user",
		},
		expiresAt: {
			type: Date,
			required: true,
			default: () => new Date(Date.now() + 1000 * 60 * 60 * 24 * 7), // Default to 7 days from now
		},
	},
	{ timestamps: true }
);

export default models.Session || model("Session", sessionSchema);

import mongoose from "mongoose";

const { Schema, models, model } = mongoose;

const sessionSchema = new Schema(
	{
		tokenId: {
			type: String,
			required: true,
			unique: true,
			trim: true,
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
		userAgent: {
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

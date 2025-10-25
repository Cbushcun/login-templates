import mongoose from "mongoose";

const { Schema, models, model } = mongoose;

const sessionSchema = new Schema(
	{
		userId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
			required: true,
		},
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
		expiresAt: {
			type: Date,
			required: true,
			default: () => new Date(Date.now() + 1000 * 60 * 60 * 24 * 7), // Default to 7 days from now
		},
	},
	{ timestamps: true }
);

export default models.Session || model("Session", sessionSchema);

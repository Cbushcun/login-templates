import mongoose from "mongoose";

const { Schema, models, model } = mongoose;

const userSchema = new Schema(
	{
		username: {
			type: String,
			required: true,
			unique: true,
			trim: true,
		},
		email: {
			type: String,
			required: true,
			unique: true,
			trim: true,
			lowercase: true,
		},
		password: {
			type: String,
			required: true,
		},
		name: {
			type: String,
			default: "",
		},
		title: {
			type: String,
			default: "",
		},
		bio: {
			type: String,
			default: "",
		},
		type: String,
		role: {
			type: String,
			enum: ["user", "admin"],
			default: "user",
		},
		active: {
			type: Boolean,
			default: false,
		},
	},
	{ timestamps: true }
);

export default models.User || model("User", userSchema);

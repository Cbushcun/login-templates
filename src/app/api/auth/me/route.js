/**
 * @description User information retrieval API Route.
 */
// /src/app/api/auth/me/route.js
import { connectDB } from "@/lib/db";
import { NextResponse } from "next/server";
import User from "@/models/Users";

export async function POST(req) {
	await connectDB();
}

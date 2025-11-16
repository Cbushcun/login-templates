import ProfilePage from "./profile-page";
import { headers } from "next/headers";

export default async function Page() {
	try {
		const headersList = await headers();
		const host = headersList.get("host") || "localhost:3000";
		const protocol = headersList.get("x-forwarded-proto") || "http";
		const baseUrl = `${protocol}://${host}`;

		// Extract accessToken from cookies
		const cookieHeader = headersList.get("cookie") || "";
		const accessToken = cookieHeader
			.split("; ")
			.find((cookie) => cookie.startsWith("accessToken="))
			?.split("=")[1];

		const response = await fetch(`${baseUrl}/api/auth/me`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Cookie: `accessToken=${accessToken}`,
			},
		});

		if (!response.ok) {
			throw new Error("Failed to fetch user data");
		}

		const data = await response.json();
		const user = data.user;

		return <ProfilePage user={user} />;
	} catch (error) {
		console.error("Error fetching user data:", error);
		return (
			<div className="container mx-auto p-6">
				<div className="text-red-500">
					Error loading profile. Please try again later.
				</div>
			</div>
		);
	}
}

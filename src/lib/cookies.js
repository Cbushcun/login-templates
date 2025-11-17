export const cookieParams = {
	httpOnly: true,
	secure: process.env.NODE_ENV === "production",
	sameSite: "Strict",
	path: "/",
};

export function proxy(request) {
	const isAuthenticated = authenticate(request);

	// If the user is authenticated, continue as normal
	if (isAuthenticated) {
		return NextResponse.next();
	}

	// Redirect to login page if not authenticated
	return NextResponse.redirect(new URL("/login", request.url));
}

export const config = {
	matcher: "/profile/:path*",
};

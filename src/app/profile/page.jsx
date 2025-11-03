import ProfilePage from "./ProfilePage";

export default function Page() {
	const user = {
		name: "Chris Bush",
		username: "Chrispycreme",
		title: "Software Engineer",
		email: "email@email.com",
		bio: "Just a simple bio about Chrispycreme.",
	};
	return <ProfilePage user={user} />;
}

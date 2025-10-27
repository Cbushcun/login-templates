import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function Page() {
	return (
		<div className="container mx-auto p-6">
			{/* Profile Header */}
			<Card>
				<CardHeader>
					<div className="flex items-center space-x-4">
						<Avatar src="/path/to/avatar.jpg" alt="User Avatar" />
						<div>
							<h2 className="text-xl font-semibold">John Doe</h2>
							<p className="text-sm text-gray-500">Software Engineer</p>
						</div>
					</div>
				</CardHeader>
				<CardContent>
					<Button variant="outline">Edit Profile</Button>
				</CardContent>
			</Card>

			{/* Settings Tabs */}
			<Tabs defaultValue="profile" className="mt-6">
				<TabsList>
					<TabsTrigger value="profile">Profile</TabsTrigger>
					<TabsTrigger value="account">Account</TabsTrigger>
					<TabsTrigger value="appearance">Appearance</TabsTrigger>
				</TabsList>

				{/* Profile Tab */}
				<TabsContent value="profile">
					<Card className="mt-4">
						<CardHeader>
							<h3 className="text-lg font-semibold">Profile Information</h3>
						</CardHeader>
						<CardContent>
							<div className="space-y-4">
								<div>
									<Label htmlFor="username">Username</Label>
									<Input id="username" defaultValue="johndoe" />
								</div>
								<div>
									<Label htmlFor="email">Email</Label>
									<Input id="email" defaultValue="johndoe@example.com" />
								</div>
								<div>
									<Label htmlFor="bio">Bio</Label>
									<Input
										id="bio"
										defaultValue="Passionate about coding and technology."
									/>
								</div>
							</div>
							<Button className="mt-4">Save Changes</Button>
						</CardContent>
					</Card>
				</TabsContent>

				{/* Account Tab */}
				<TabsContent value="account">
					<Card className="mt-4">
						<CardHeader>
							<h3 className="text-lg font-semibold">Account Settings</h3>
						</CardHeader>
						<CardContent>
							<div className="space-y-4">
								<div>
									<Label htmlFor="password">Password</Label>
									<Input id="password" type="password" placeholder="••••••••" />
								</div>
								<div>
									<Label htmlFor="twoFactor">Two-Factor Authentication</Label>
									<Switch id="twoFactor" />
								</div>
							</div>
							<Button className="mt-4">Update Account</Button>
						</CardContent>
					</Card>
				</TabsContent>

				{/* Appearance Tab */}
				<TabsContent value="appearance">
					<Card className="mt-4">
						<CardHeader>
							<h3 className="text-lg font-semibold">Appearance Settings</h3>
						</CardHeader>
						<CardContent>
							<div className="space-y-4">
								<div>
									<Label htmlFor="theme">Theme</Label>
									<div className="flex items-center space-x-4">
										<Button variant="outline">Light</Button>
										<Button variant="outline">Dark</Button>
									</div>
								</div>
								<div>
									<Label htmlFor="language">Language</Label>
									<Input id="language" defaultValue="English" />
								</div>
							</div>
							<Button className="mt-4">Save Preferences</Button>
						</CardContent>
					</Card>
				</TabsContent>
			</Tabs>
		</div>
	);
}

"use client";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";

export default function ProfilePage({ user }) {
	const [canEdit, setCanEdit] = useState(false);
	const toggleEdit = () => setCanEdit(!canEdit);
	return (
		<div className="container mx-auto p-6">
			{/* Profile Header */}
			<Card>
				<CardHeader>
					<div className="flex items-center space-x-4">
						<Avatar src="/path/to/avatar.jpg" alt="User Avatar" />
						<div>
							<span className="flex items-center gap-2">
								<h2 className="text-xl font-semibold">{user.name} </h2>
								<p className="text-red-500 font-medium text-sm">
									&#9679; Not Verified
								</p>
							</span>
							<p className="text-sm text-gray-500">{user.title}</p>
						</div>
					</div>
				</CardHeader>
				<CardContent>
					{canEdit ? (
						<Button
							onClick={() => {
								toggleEdit();
							}}
						>
							Save
						</Button>
					) : (
						<Button
							variant="outline"
							onClick={() => {
								toggleEdit();
							}}
						>
							Edit Profile
						</Button>
					)}
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
								{canEdit ? (
									<>
										<div>
											<Label className={"text-gray-500 mb-1"} htmlFor="name">
												Name
											</Label>
											<Input id="name" defaultValue={user.name} />
										</div>
										<div>
											<Label className={"text-gray-500 mb-1"} htmlFor="title">
												Title
											</Label>
											<Input id="title" defaultValue={user.title}></Input>
										</div>
									</>
								) : (
									""
								)}
								<div>
									<Label className={"text-gray-500 mb-1"} htmlFor="username">
										Username
									</Label>
									{canEdit ? (
										<Input id="username" defaultValue={user.username} />
									) : (
										<p>{user.username} </p>
									)}
								</div>
								<div>
									<Label className={"text-gray-500 mb-1"} htmlFor="email">
										Email
									</Label>
									{canEdit ? (
										<p>
											{user.email}{" "}
											<i className="text-gray-500">unavailable at this time</i>
										</p>
									) : (
										<p>{user.email}</p>
									)}
								</div>
								<div>
									<Label className={"text-gray-500 mb-1"} htmlFor="bio">
										Bio
									</Label>
									{canEdit ? (
										<Input id="bio" defaultValue={user.bio} />
									) : (
										<p>{user.bio}</p>
									)}
								</div>
								<div>
									{canEdit ? (
										<>
											<Label className={"text-gray-500 mb-1"}>
												Current Password
											</Label>
											<Input
												id="current-password"
												type="password"
												placeholder="••••••••"
											></Input>
											<Label className={"text-gray-500 mb-1"}>
												New Password
											</Label>
											<Input
												id="new-password"
												type="password"
												placeholder="••••••••"
											></Input>
											<Label className={"text-gray-500 mb-1"}>
												Confirm New Password
											</Label>
											<Input
												id="new-password-confirm"
												type="password"
												placeholder="••••••••"
											></Input>
										</>
									) : (
										<>
											<Label className={"text-gray-500 mb-1"}>Password</Label>
											<p>••••••••</p>
										</>
									)}
								</div>
							</div>
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
							{canEdit ? (
								<Button className="mt-4">Save Preferences</Button>
							) : (
								<Button className="mt-4">Edit</Button>
							)}
						</CardContent>
					</Card>
				</TabsContent>
			</Tabs>
		</div>
	);
}

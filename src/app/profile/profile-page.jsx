"use client";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";

/**
 *
 * TODO: Fix the form submission and data handling.
 */

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
						<div className="flex gap-2">
							<Button type="submit" form="profile-form">
								Save
							</Button>
							<Button
								type="button"
								variant="outline"
								onClick={() => {
									toggleEdit();
								}}
							>
								Cancel
							</Button>
						</div>
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
					<TabsTrigger value="profile">Settings</TabsTrigger>
				</TabsList>
				{/* Profile Tab */}
				<TabsContent value="profile">
					<Card className="mt-4">
						<CardHeader>
							<h3 className="text-lg font-semibold">Profile Information</h3>
						</CardHeader>
						<CardContent>
							<form
								id="profile-form"
								action="/api/user/update"
								method="POST"
								className="space-y-4"
							>
								<FieldGroup>
									{canEdit ? (
										<>
											<Field>
												<FieldLabel htmlFor="name">Name</FieldLabel>
												<Input id="name" defaultValue={user.name} />
											</Field>
											<Field>
												<FieldLabel
													className={"text-gray-500 mb-1"}
													htmlFor="title"
												>
													Title
												</FieldLabel>
												<Input id="title" defaultValue={user.title}></Input>
											</Field>
										</>
									) : (
										""
									)}
									<Field>
										<FieldLabel htmlFor="username">Username</FieldLabel>
										{canEdit ? (
											<Input id="username" defaultValue={user.username} />
										) : (
											<p>{user.username} </p>
										)}
									</Field>
									<Field>
										<FieldLabel htmlFor="email">Email</FieldLabel>
										{canEdit ? (
											<p>
												{user.email}{" "}
												<i className="text-gray-500">
													unavailable at this time
												</i>
											</p>
										) : (
											<p>{user.email}</p>
										)}
									</Field>
									<Field>
										<FieldLabel htmlFor="bio">Bio</FieldLabel>
										{canEdit ? (
											<Input id="bio" defaultValue={user.bio} />
										) : (
											<p>{user.bio}</p>
										)}
									</Field>
									<Field>
										{canEdit ? (
											<>
												<FieldLabel htmlFor="current-password">
													Current Password
												</FieldLabel>
												<Input
													id="current-password"
													type="password"
													placeholder="••••••••"
												></Input>
												<FieldLabel htmlFor="new-password">
													New Password
												</FieldLabel>
												<Input
													id="new-password"
													type="password"
													placeholder="••••••••"
												></Input>
												<FieldLabel htmlFor="confirm-new-password">
													Confirm New Password
												</FieldLabel>
												<Input
													id="new-password-confirm"
													type="password"
													placeholder="••••••••"
												></Input>
											</>
										) : (
											<>
												<FieldLabel>Password</FieldLabel>
												<p>••••••••</p>
											</>
										)}
									</Field>
								</FieldGroup>
							</form>
						</CardContent>
					</Card>
				</TabsContent>
			</Tabs>
		</div>
	);
}

"use client";

import { Input } from "@/components/ui/input";

export function Navbar() {
	return (
		<header className="w-full border-b bg-background p-4 flex items-center">
			<h1 className="text-xl font-bold">Dashboard</h1>
			<div className="ml-auto w-1/3">
				<Input placeholder="Search..." />
			</div>
		</header>
	);
}

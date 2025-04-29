"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LucideIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import {
	Tooltip,
	TooltipContent,
	TooltipTrigger,
} from "@/components/ui/tooltip";

interface NavProps {
	isCollapsed: boolean;
	links: {
		title: string;
		label?: string;
		icon: LucideIcon;
		href: string;
		variant?: "default" | "ghost";
	}[];
}

export function Nav({ links, isCollapsed }: NavProps) {
	const pathname = usePathname();

	return (
		<div
			data-collapsed={isCollapsed}
			className="group flex flex-col gap-4 py-2 data-[collapsed=true]:py-2"
		>
			<nav className="grid gap-1 px-2 group-[[data-collapsed=true]]:justify-center group-[[data-collapsed=true]]:px-2">
				{links.map((link, index) => {
					const isActive = pathname === link.href;

					return isCollapsed ? (
						<Tooltip key={index} delayDuration={0}>
							<TooltipTrigger asChild>
								<Link
									href={link.href}
									className={cn(
										buttonVariants({
											variant: isActive
												? "default"
												: link.variant || "ghost",
											size: "icon",
										}),
										"h-9 w-9",
										isActive &&
											"dark:bg-muted dark:text-white"
									)}
								>
									<link.icon className="h-5 w-5" />
									<span className="sr-only font-medium">
										{link.title}
									</span>
								</Link>
							</TooltipTrigger>
							<TooltipContent
								side="right"
								className="flex items-center gap-4"
							>
								<span>{link.title}</span>
								{link.label && (
									<span className="ml-auto text-muted-foreground">
										{link.label}
									</span>
								)}
							</TooltipContent>
						</Tooltip>
					) : (
						<Link
							key={index}
							href={link.href}
							className={cn(
								buttonVariants({
									variant: isActive
										? "default"
										: link.variant || "ghost",
									// size: "sm",
								}),
								"justify-start",
								isActive && "dark:bg-muted dark:text-white"
							)}
						>
							<link.icon className="h-5 w-5" />
							<span className="truncate">{link.title}</span>
							{link.label && (
								<span
									className={cn(
										"ml-auto",
										isActive &&
											"text-background dark:text-white"
									)}
								>
									{link.label}
								</span>
							)}
						</Link>
					);
				})}
			</nav>
		</div>
	);
}

"use client";

import {
	TooltipProvider,
	Tooltip,
	TooltipTrigger,
	TooltipContent,
} from "@/components/ui/tooltip";
import { Separator } from "@/components/ui/separator";
import { Inbox, File, Send, Trash2, Users2 } from "lucide-react";
import { cn } from "@/lib/utils";
import Brand from "../BrandLogo";
import BrandLogo from "../BrandLogo";
import { Nav } from "./Nav";

interface SidebarProps {
	isCollapsed: boolean;
}

export function Sidebar({ isCollapsed }: SidebarProps) {
	const navItems = [
		{
			title: "Lista de Solicitudes",
			href: "/solicitudes",
			icon: File,
		},
		{
			title: "Crear Solicitud",
			href: "/solicitudes/crear",
			icon: Send,
		},
	];

	return (
		<TooltipProvider delayDuration={0}>
			<div className="flex flex-col h-full border-r bg-background">
				<div
					className={cn(
						"flex h-[52px] items-center gap-1.5",
						isCollapsed ? "justify-center" : "px-2"
					)}
				>
					<BrandLogo />
					{!isCollapsed && (
						<span className="text-xl text-[#00224C] font-bold">
							Dinet
						</span>
					)}
				</div>
				<Separator />
				<Nav isCollapsed={isCollapsed} links={navItems} />
			</div>
		</TooltipProvider>
	);
}

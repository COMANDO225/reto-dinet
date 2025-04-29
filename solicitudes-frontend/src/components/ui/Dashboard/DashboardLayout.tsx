"use client";

import { Fragment, useState } from "react";
import {
	ResizablePanelGroup,
	ResizablePanel,
	ResizableHandle,
} from "@/components/ui/resizable";
import { Sidebar } from "./Sidebar";
import { cn } from "@/lib/utils";
import { Separator } from "@radix-ui/react-separator";
import { BreadCrumbHistory } from "../BreadcrumbHistory";

interface DashboardLayoutProps {
	children: React.ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
	const [isCollapsed, setIsCollapsed] = useState(false);
	return (
		<div className="flex flex-col min-h-svh">
			<ResizablePanelGroup direction="horizontal" className="flex-1">
				<ResizablePanel
					defaultSize={20}
					collapsedSize={4}
					collapsible
					minSize={12}
					maxSize={20}
					onCollapse={() => setIsCollapsed(true)}
					onExpand={() => setIsCollapsed(false)}
					className={cn(
						isCollapsed &&
							"min-w-[60px] max-w-[60px] transition-all duration-300 ease-in-out"
					)}
				>
					<Sidebar isCollapsed={isCollapsed} />
				</ResizablePanel>
				<ResizableHandle withHandle />
				<ResizablePanel defaultSize={80}>
					<div className="grid items-center px-6 py-2 border-b h-[53px]">
						<BreadCrumbHistory />
					</div>
					<div className="w-full h-full">{children}</div>
				</ResizablePanel>
			</ResizablePanelGroup>
		</div>
	);
}

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

export function BreadCrumbHistory() {
	const pathname = usePathname();

	const paths = pathname.split("/").filter((path) => path);

	return (
		<Breadcrumb>
			<BreadcrumbList>
				<BreadcrumbItem>
					<BreadcrumbLink asChild>
						<Link href="/">Inicio</Link>
					</BreadcrumbLink>
				</BreadcrumbItem>

				{paths.map((path, index) => {
					const href = "/" + paths.slice(0, index + 1).join("/");
					const isLast = index === paths.length - 1;

					return (
						<div key={index} className="flex items-center">
							<BreadcrumbSeparator />
							<BreadcrumbItem>
								{isLast ? (
									<BreadcrumbPage className="capitalize">
										{decodeURIComponent(
											path.replace(/-/g, " ")
										)}
									</BreadcrumbPage>
								) : (
									<BreadcrumbLink asChild>
										<Link
											href={href}
											className="capitalize"
										>
											{decodeURIComponent(
												path.replace(/-/g, " ")
											)}
										</Link>
									</BreadcrumbLink>
								)}
							</BreadcrumbItem>
						</div>
					);
				})}
			</BreadcrumbList>
		</Breadcrumb>
	);
}

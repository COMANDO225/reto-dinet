"use client";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { AvatarImage } from "@radix-ui/react-avatar";
import { User } from "lucide-react";

interface AvatarsListProps {
	total: number;
	maxVisible?: number;
}

const AvatarsList = ({ total, maxVisible = 3 }: AvatarsListProps) => {
	const visibleCount = Math.min(total, maxVisible);
	const hiddenCount = total - visibleCount;

	return (
		<div className="flex -space-x-4.5 w-[110px] max-w-[110px]">
			{Array.from({ length: visibleCount }).map((_, index) => (
				<Avatar
					key={index}
					className={cn(
						"border-2 border-white size-10 bg-muted cursor-pointer hover:bg-muted/80 transition-all duration-200 ease-in-out"
					)}
				>
					<AvatarImage
						src="https://res.cloudinary.com/dro4ur0kq/image/upload/v1675441683/facebook/user/default_pic_zswxlq.png"
						alt="@shadcn"
					/>
					<AvatarFallback>
						<User className="h-4 w-4 text-muted-foreground" />
					</AvatarFallback>
				</Avatar>
			))}

			{hiddenCount > 0 && (
				<Avatar className="border-2 border-white size-10 bg-muted cursor-pointer hover:bg-muted/80 transition-all duration-200 ease-in-out">
					<div className="absolute flex justify-center font-medium text-white items-center w-full h-full bg-black/40">
						+{hiddenCount}
					</div>
					<AvatarImage
						src="https://res.cloudinary.com/dro4ur0kq/image/upload/v1675441683/facebook/user/default_pic_zswxlq.png"
						alt="@shadcn"
					/>
					<AvatarFallback className="text-xs font-medium">
						+{hiddenCount}
					</AvatarFallback>
				</Avatar>
			)}
		</div>
	);
};

export default AvatarsList;

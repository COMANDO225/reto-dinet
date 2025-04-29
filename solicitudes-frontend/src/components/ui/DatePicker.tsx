"use client";

import * as React from "react";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import { es } from "date-fns/locale";

interface DatePickerProps {
	value?: Date;
	onChange: (date: Date | undefined) => void;
	placeholder?: string;
	className?: string;
	disabledBeforeToday?: boolean;
	open?: boolean;
	onOpenChange?: (open: boolean) => void;
}

export function DatePicker({
	value,
	onChange,
	placeholder = "Seleccionar fecha",
	className,
	disabledBeforeToday = true,
	open,
	onOpenChange,
}: DatePickerProps) {
	const [internalOpen, setInternalOpen] = React.useState(false);
	const isControlled = open !== undefined && onOpenChange !== undefined;
	const currentOpen = isControlled ? open : internalOpen;
	const setCurrentOpen = isControlled ? onOpenChange! : setInternalOpen;

	const handleSelect = (date: Date | undefined) => {
		onChange(date);
		setCurrentOpen(false);
	};

	return (
		<Popover open={currentOpen} onOpenChange={setCurrentOpen}>
			<PopoverTrigger asChild>
				<Button
					variant="outline"
					className={cn(
						"w-[240px] justify-start text-left font-normal",
						!value && "text-muted-foreground",
						className
					)}
				>
					<CalendarIcon className="mr-2 h-4 w-4" />
					{value ? (
						format(value, "dd/MM/yyyy")
					) : (
						<span>{placeholder}</span>
					)}
				</Button>
			</PopoverTrigger>
			<PopoverContent className="w-auto p-0" align="start">
				<Calendar
					mode="single"
					selected={value}
					onSelect={handleSelect}
					initialFocus
					locale={es}
					disabled={
						disabledBeforeToday
							? (date) =>
									date <
									new Date(new Date().setHours(0, 0, 0, 0))
							: undefined
					}
				/>
			</PopoverContent>
		</Popover>
	);
}

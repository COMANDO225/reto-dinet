"use client";

import * as React from "react";
import { ControllerRenderProps, FieldPath, FieldValues } from "react-hook-form";
import { Check, ChevronsUpDown } from "lucide-react";
import {
	Popover,
	PopoverTrigger,
	PopoverContent,
} from "@/components/ui/popover";
import {
	Command,
	CommandInput,
	CommandList,
	CommandEmpty,
	CommandGroup,
	CommandItem,
} from "@/components/ui/command";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export type ComboOption = { value: string; label: string };

interface ComboboxProps<T extends FieldValues> {
	field: ControllerRenderProps<T, FieldPath<T>>;
	placeholder?: string;
	disabled?: boolean;
	options: ComboOption[];
	isValid?: boolean;
	errorMessage?: string;
	children?: React.ReactNode;
}

export function Combobox<T extends FieldValues>({
	field,
	placeholder,
	disabled,
	options,
	isValid = true,
	children,
}: ComboboxProps<T>) {
	const [open, setOpen] = React.useState(false);

	const current = options.find((o) => o.value === field.value);

	return (
		<Popover modal={true} open={open} onOpenChange={setOpen}>
			<PopoverTrigger asChild>
				<Button
					type="button"
					variant="outline"
					role="combobox"
					disabled={disabled}
					aria-expanded={open}
					className={cn(
						"w-full justify-between",
						!isValid && "border-destructive text-destructive!"
					)}
				>
					{children ? (
						<>{children}</>
					) : (
						<>
							{current
								? current.label
								: placeholder ?? "Seleccione…"}
							<ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
						</>
					)}
				</Button>
			</PopoverTrigger>

			<PopoverContent className="p-0 w-[var(--radix-popover-trigger-width)]">
				<Command>
					<CommandInput placeholder="Buscar…" className="h-9" />
					<CommandList>
						<CommandEmpty>No hay resultados.</CommandEmpty>
						<CommandGroup>
							{options.map((opt) => (
								<CommandItem
									key={opt.value}
									value={opt.value}
									onSelect={() => {
										field.onChange(
											field.value === opt.value
												? ""
												: opt.value
										);
										setOpen(false);
									}}
								>
									{opt.label}
									<Check
										className={cn(
											"ml-auto h-4 w-4",
											field.value === opt.value
												? "opacity-100"
												: "opacity-0"
										)}
									/>
								</CommandItem>
							))}
						</CommandGroup>
					</CommandList>
				</Command>
			</PopoverContent>
		</Popover>
	);
}

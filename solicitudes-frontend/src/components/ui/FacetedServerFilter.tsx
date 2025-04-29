"use client";

import { Check, PlusCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
	CommandSeparator,
} from "@/components/ui/command";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import { useFiltrosStore } from "@/store/filstrosStore";
import { useSolicitudesTableStore } from "@/store/useSolicitudesStore";
import { getSolicitudes } from "@/actions/solicitudes";
import { useState } from "react";

interface FacetedServerFilterProps {
	field: "marca" | "tipoSolicitud"; // en qué campo de filtros
	title: string;
	options: { label: string; value: string }[];
}

export function FacetedServerFilter({
	field,
	title,
	options,
}: FacetedServerFilterProps) {
	const { [field]: selected } = useFiltrosStore();
	const { setFiltros } = useFiltrosStore();
	const { setSolicitudes, setLoading } = useSolicitudesTableStore();

	const [open, setOpen] = useState(false);

	const handleSelect = async (value: string) => {
		setOpen(false);
		const newValue = selected === value ? null : value;

		setFiltros({ [field]: newValue });

		setLoading(true);
		const newSolicitudes = await getSolicitudes(useFiltrosStore.getState());
		setSolicitudes(newSolicitudes);
	};

	return (
		<Popover open={open} onOpenChange={setOpen}>
			<PopoverTrigger asChild>
				<Button
					variant="outline"
					size="sm"
					className="h-8 border text-xs"
				>
					<PlusCircle className="size-4" />
					{title}
					{selected && (
						<>
							<Separator
								orientation="vertical"
								className="mx-2 h-4"
							/>
							<Badge className="rounded-sm px-1 text-white font-normal">
								1
							</Badge>
						</>
					)}
				</Button>
			</PopoverTrigger>

			<PopoverContent align="start" className="w-[240px] p-0">
				<Command>
					<CommandInput placeholder={`Buscar ${title}`} />
					<CommandList>
						<CommandEmpty>No hay resultados</CommandEmpty>
						<CommandGroup>
							{options.map((option) => (
								<CommandItem
									key={option.value}
									onSelect={() => handleSelect(option.value)}
								>
									<div
										className={cn(
											"mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-gray-400",
											selected === option.value
												? "bg-secondary border-secondary"
												: "opacity-50 [&_svg]:invisible"
										)}
									>
										<Check className="h-4 w-4 text-white" />
									</div>
									{option.label}
								</CommandItem>
							))}
						</CommandGroup>

						{selected && (
							<>
								<CommandSeparator />
								<CommandGroup>
									<CommandItem
										onSelect={() => handleSelect(selected)}
									>
										Limpiar filtro
									</CommandItem>
								</CommandGroup>
							</>
						)}
					</CommandList>
				</Command>
			</PopoverContent>
		</Popover>
	);
}

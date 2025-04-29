"use client";

import { ColumnDef, Column } from "@tanstack/react-table";
import { ArrowUp, ArrowDown, ChevronsUpDown } from "lucide-react";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import React from "react";
import { SolicitudListItem } from "@/schemas/solicitudSchema";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { maskPhone } from "@/helpers/maskPhone";
import AvatarsList from "../AvatarsList";

function SortHeader<TData, TValue>({
	column,
	title,
}: {
	column: Column<TData, TValue>;
	title: string;
}) {
	// ícono dinámico según el estado actual
	const sortIcon =
		column.getIsSorted() === "asc"
			? ArrowUp
			: column.getIsSorted() === "desc"
			? ArrowDown
			: ChevronsUpDown;

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button
					variant="ghost"
					size="sm"
					className="h-8 data-[state=open]:bg-accent cursor-pointer"
				>
					<span>{title}</span>
					{React.createElement(sortIcon, {
						className: "h-4 w-4",
					})}
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align="start">
				<DropdownMenuItem onSelect={() => column.toggleSorting(false)}>
					<ArrowUp className="h-3.5 w-3.5 text-muted-foreground/70" />
					Asc
				</DropdownMenuItem>
				<DropdownMenuItem onSelect={() => column.toggleSorting(true)}>
					<ArrowDown className="h-3.5 w-3.5 text-muted-foreground/70" />
					Desc
				</DropdownMenuItem>
				<DropdownMenuItem
					onSelect={() => column.clearSorting()}
					className="text-muted-foreground"
				>
					<ChevronsUpDown className="h-3.5 w-3.5 text-muted-foreground/70" />
					Reset
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}

export const columns: ColumnDef<SolicitudListItem>[] = [
	{
		accessorKey: "codigo",
		header: ({ column }) => <SortHeader column={column} title="Código" />,
		cell: ({ row }) => {
			const codigo = row.original.codigo;
			return (
				<Link
					href={`/solicitudes/codigo/${codigo}`}
					className={cn(
						"flex justify-center items-center text-blue-600 underline hover:text-blue-700 transition-all duration-200",
						"hover:bg-blue-100 rounded-md px-2 py-0.5 w-[110px] mx-auto"
					)}
					target="_blank"
				>
					{codigo}
				</Link>
			);
		},
	},
	{
		accessorKey: "marca",
		header: ({ column }) => <SortHeader column={column} title="Marca" />,
	},
	{
		accessorKey: "tipoSolicitud",
		header: ({ column }) => (
			<SortHeader column={column} title="Tipo Solicitud" />
		),
	},
	{
		accessorKey: "fechaEnvio",
		header: ({ column }) => (
			<SortHeader column={column} title="Fecha Envío" />
		),
	},
	{
		accessorKey: "numeroContacto",
		header: ({ column }) => (
			<SortHeader column={column} title="Número Contacto" />
		),
		cell: ({ row }) => {
			const numeroContacto = row.original.numeroContacto;
			return (
				<span className="text-center">{maskPhone(numeroContacto)}</span>
			);
		},
	},
	{
		accessorKey: "nombreContacto",
		header: ({ column }) => (
			<SortHeader column={column} title="Nombre Contacto" />
		),
	},
	{
		accessorKey: "contactos",
		header: "Contactos Secundarios",
		cell: ({ row }) => {
			const contactos = row.original.contactos;
			return (
				<div className="flex justify-center items-center">
					{contactos > 0 ? (
						<AvatarsList total={contactos} />
					) : (
						<div className="h-[1px] w-2 bg-black"></div>
					)}
				</div>
			);
		},
	},
];

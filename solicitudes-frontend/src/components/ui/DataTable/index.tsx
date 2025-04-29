"use client";

import {
	ColumnDef,
	flexRender,
	getCoreRowModel,
	getFilteredRowModel,
	getPaginationRowModel,
	getSortedRowModel,
	useReactTable,
} from "@tanstack/react-table";

import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { SolicitudesToolbar } from "./toolbar";
import { SolicitudesPagination } from "./pagination";
import { useSolicitudesTableStore } from "@/store/useSolicitudesStore";
import { useEffect, useState } from "react";
import { SolicitudListItem } from "@/schemas/solicitudSchema";
import { useFiltrosStore } from "@/store/filstrosStore";

interface SolicitudesDataTableProps<TData, TValue> {
	initialData: TData[];
	columns: ColumnDef<TData, TValue>[];
}

export function SolicitudesDataTable<TData, TValue>({
	initialData,
	columns,
}: SolicitudesDataTableProps<TData, TValue>) {
	const { solicitudes, loading } = useSolicitudesTableStore();
	const { marca, tipoSolicitud, fechaEnvio } = useFiltrosStore();

	const [datos, setDatos] = useState<SolicitudListItem[]>(
		initialData as SolicitudListItem[]
	);

	const filtrosActivos = !!(marca || tipoSolicitud || fechaEnvio);

	useEffect(() => {
		if (filtrosActivos) {
			// Si hay filtros aplicados
			setDatos(solicitudes.length > 0 ? solicitudes : []);
		} else {
			// Si no hay filtros, mostrar la data inicial
			setDatos(initialData as SolicitudListItem[]);
		}
	}, [solicitudes, filtrosActivos, initialData]);

	const table = useReactTable({
		data: datos as TData[],
		columns,
		getCoreRowModel: getCoreRowModel(),
		getFilteredRowModel: getFilteredRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
		getSortedRowModel: getSortedRowModel(),
		// hacer que el search filtre por codigo y nombre
		filterFns: {
			fuzzy: (row, columnId, value) => {
				const rowValue = row.getValue(columnId);
				if (typeof rowValue === "string") {
					return rowValue.toLowerCase().includes(value.toLowerCase());
				}
				return false;
			},
		},
		// filtrar por codigo y nombre
		globalFilterFn: (row, columnId, value) => {
			const rowValue = row.getValue(columnId);
			if (typeof rowValue === "string") {
				return rowValue.toLowerCase().includes(value.toLowerCase());
			}
			return false;
		},
	});

	return (
		<div className="space-y-4">
			<SolicitudesToolbar table={table} />
			<div className="rounded-md border">
				<Table>
					<TableHeader>
						{table.getHeaderGroups().map((headerGroup) => (
							<TableRow
								key={headerGroup.id}
								className="hover:bg-transparent!"
							>
								{headerGroup.headers.map((header) => (
									<TableHead
										key={header.id}
										className="text-center"
									>
										{header.isPlaceholder
											? null
											: flexRender(
													header.column.columnDef
														.header,
													header.getContext()
											  )}
									</TableHead>
								))}
							</TableRow>
						))}
					</TableHeader>
					<TableBody>
						{loading ? (
							<TableRow>
								<TableCell
									colSpan={columns.length}
									className="h-24 text-center"
								>
									<div className="flex flex-col items-center justify-center space-y-2">
										<div className="size-8 border-2 border-gray-300 border-t-primary animate-spin rounded-full" />
										<p className="text-xs text-muted-foreground">
											Cargando solicitudes...
										</p>
									</div>
								</TableCell>
							</TableRow>
						) : table.getRowModel().rows.length ? (
							table.getRowModel().rows.map((row) => (
								<TableRow
									key={row.id}
									className="hover:bg-[#F9F9FA]"
								>
									{row.getVisibleCells().map((cell) => (
										<TableCell
											key={cell.id}
											className="text-center"
										>
											{flexRender(
												cell.column.columnDef.cell,
												cell.getContext()
											)}
										</TableCell>
									))}
								</TableRow>
							))
						) : (
							<TableRow>
								<TableCell
									colSpan={columns.length}
									className="h-24 text-center"
								>
									No hay resultados.
								</TableCell>
							</TableRow>
						)}
					</TableBody>
				</Table>
			</div>
			<SolicitudesPagination table={table} />
		</div>
	);
}

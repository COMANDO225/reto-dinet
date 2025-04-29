"use client";

import { Table } from "@tanstack/react-table";
import {
	ChevronsLeft,
	ChevronLeft,
	ChevronRight,
	ChevronsRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";

interface PaginationProps<TData> {
	table: Table<TData>;
}

export function SolicitudesPagination<TData>({
	table,
}: PaginationProps<TData>) {
	return (
		<div className="flex items-center justify-between px-2 text-sm">
			{/* contador de selección */}
			<div className="flex items-center space-x-2">
				{/* {table.getFilteredSelectedRowModel().rows.length} de{" "}
				{table.getFilteredRowModel().rows.length} fila(s) seleccionadas */}
				{/* filas por página */}
				<span>Filas por página:</span>
				<Select
					value={`${table.getState().pagination.pageSize}`}
					onValueChange={(value) => table.setPageSize(Number(value))}
				>
					<SelectTrigger className="h-8! py-0 w-[70px] rounded-sm">
						<SelectValue
							placeholder={table.getState().pagination.pageSize}
						/>
					</SelectTrigger>
					<SelectContent side="top">
						{[10, 20, 30, 40, 50].map((size) => (
							<SelectItem key={size} value={`${size}`}>
								{size}
							</SelectItem>
						))}
					</SelectContent>
				</Select>
			</div>

			{/* controles */}
			<div className="flex items-center space-x-4 lg:space-x-6">
				{/* indicador de página */}
				<div className="flex w-[90px] justify-center">
					Página {table.getState().pagination.pageIndex + 1} de{" "}
					{table.getPageCount()}
				</div>

				{/* botones navegación */}
				<div className="flex items-center space-x-1">
					<Button
						variant="outline"
						size="icon"
						className="h-8 w-8"
						onClick={() => table.setPageIndex(0)}
						disabled={!table.getCanPreviousPage()}
					>
						<ChevronsLeft className="h-4 w-4" />
					</Button>
					<Button
						variant="outline"
						size="icon"
						className="h-8 w-8"
						onClick={() => table.previousPage()}
						disabled={!table.getCanPreviousPage()}
					>
						<ChevronLeft className="h-4 w-4" />
					</Button>
					<Button
						variant="outline"
						size="icon"
						className="h-8 w-8"
						onClick={() => table.nextPage()}
						disabled={!table.getCanNextPage()}
					>
						<ChevronRight className="h-4 w-4" />
					</Button>
					<Button
						variant="outline"
						size="icon"
						className="h-8 w-8"
						onClick={() =>
							table.setPageIndex(table.getPageCount() - 1)
						}
						disabled={!table.getCanNextPage()}
					>
						<ChevronsRight className="h-4 w-4" />
					</Button>
				</div>
			</div>
		</div>
	);
}

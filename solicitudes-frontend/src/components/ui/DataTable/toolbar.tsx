"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Table } from "@tanstack/react-table";
import { X } from "lucide-react";
import SolicitudModal from "../Modal/solicitudModal";
import { DatePicker } from "../DatePicker";
import { format } from "date-fns";
import { useFiltrosStore } from "@/store/filstrosStore";
import {
	useSolicitudesStore,
	useSolicitudesTableStore,
} from "@/store/useSolicitudesStore";
import { useEffect } from "react";
import { FacetedServerFilter } from "../FacetedServerFilter";
import { getSolicitudes } from "@/actions/solicitudes";
import { exportToCSV } from "@/helpers/exportarCSV";
import { SolicitudListItem } from "@/schemas/solicitudSchema";

interface ToolbarProps<TData> {
	table: Table<TData>;
}

export function SolicitudesToolbar<TData>({ table }: ToolbarProps<TData>) {
	const { marca, fechaEnvio, tipoSolicitud, setFiltros, resetFiltros } =
		useFiltrosStore();
	const {
		marcas,
		tipos,
		tiposTotales,
		cargarTiposTotales,
		cargarTiposSolicitud,
		limpiarTiposSolicitud,
	} = useSolicitudesStore();
	const { setSolicitudes, setLoading } = useSolicitudesTableStore();

	useEffect(() => {
		cargarTiposTotales();
	}, []);

	// Si cambia marca seleccionada, cargar sus tipos
	useEffect(() => {
		if (marca) {
			const marcaId = marcas.find((m) => m.nombre === marca)?.id;
			if (marcaId) {
				cargarTiposSolicitud(marcaId);
			}
		} else {
			limpiarTiposSolicitud();
		}
	}, [marca]);

	const onChangeFechaEnvio = async (date: Date | undefined) => {
		const fecha = date ? format(date, "yyyy-MM-dd") : null;
		setFiltros({ fechaEnvio: fecha });
		setLoading(true);
		const newSolicitudes = await getSolicitudes(useFiltrosStore.getState());
		setSolicitudes(newSolicitudes);
	};

	const isFiltered = table.getState().columnFilters.length > 0;
	const filtrosActivos = !!(marca || tipoSolicitud || fechaEnvio);

	return (
		<div className="flex w-full items-center justify-between">
			<div className="flex items-center space-x-2">
				<Input
					placeholder="Código o nombre"
					value={
						(table
							.getColumn("codigo")
							?.getFilterValue() as string) ?? ""
					}
					onChange={(e) =>
						table
							.getColumn("codigo")
							?.setFilterValue(e.target.value)
					}
					className="h-8 w-[150px]"
				/>

				<FacetedServerFilter
					field="marca"
					title="Marca"
					options={marcas.map((m) => ({
						label: m.nombre,
						value: m.nombre,
					}))}
				/>

				<FacetedServerFilter
					field="tipoSolicitud"
					title="Tipo Solicitud"
					options={(marca ? tipos : tiposTotales).map((t) => ({
						label: t.nombre,
						value: t.nombre,
					}))}
				/>

				{/* filtrar por fecha de envío */}
				<DatePicker
					value={
						fechaEnvio
							? new Date(`${fechaEnvio}T00:00:00`)
							: undefined
					}
					onChange={onChangeFechaEnvio}
					placeholder="Filtrar por fecha"
					className="h-8 w-[165px]"
					disabledBeforeToday={false}
				/>

				{(isFiltered || filtrosActivos) && (
					<Button
						variant="ghost"
						onClick={() => {
							table.resetColumnFilters();
							table.setGlobalFilter(""); // limpiar buscador cliente
							resetFiltros(); // limpiar filtros zustand
						}}
					>
						Resetear filtros
						<X className="ml-2 h-4 w-4" />
					</Button>
				)}
			</div>
			<div className="flex gap-2 items-center justify-center">
				<Button
					variant="outline"
					className="h-8"
					onClick={() =>
						exportToCSV(
							table
								.getRowModel()
								.rows.map(
									(r) => r.original as SolicitudListItem
								),
							"solicitudes",
							[
								"codigo",
								"marca",
								"tipoSolicitud",
								"fechaEnvio",
								"numeroContacto",
								"nombreContacto",
								"contactos",
							]
						)
					}
				>
					Exportar CSV
				</Button>

				<SolicitudModal />
			</div>
		</div>
	);
}

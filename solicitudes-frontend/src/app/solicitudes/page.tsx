import { SolicitudesDataTable } from "@/components/ui/DataTable";
import { columns } from "@/components/ui/DataTable/columns";
import { getSolicitudes } from "@/actions/solicitudes";

export default async function SolicitudesPage() {
	const solicitudes = await getSolicitudes();
	return (
		<div className="space-y-6 p-[8px_3%] md:p-6">
			<div>
				<h2 className="text-2xl font-bold tracking-tight">
					Tabla de Solicitudes
				</h2>
				<p className="text-sm text-muted-foreground">
					Aqui tienes una lista de todas las solicitudes que has
					realizado.
				</p>
			</div>
			<SolicitudesDataTable initialData={solicitudes} columns={columns} />
		</div>
	);
}

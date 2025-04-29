import { getDetalleSolicitud } from "@/actions/solicitudes";
import DetalleSolicitudCard from "@/components/ui/DetalleSolicitudCard";
import React from "react";

export type paramsType = Promise<{ codigoId: string }>;

export default async function Page({ params }: { params: paramsType }) {
	const { codigoId } = await params;

	const detalleSolicitud = await getDetalleSolicitud(codigoId);
	console.log("detalleSolicitud", detalleSolicitud);
	if (!detalleSolicitud) {
		return (
			<div className="p-[8px_3%] md:p-6 flex items-center justify-center min-h-screen bg-gray-50">
				<h1 className="text-2xl font-bold text-red-500">
					Solicitud no encontrada
				</h1>
			</div>
		);
	}
	return <DetalleSolicitudCard solicitud={detalleSolicitud.data} />;
}

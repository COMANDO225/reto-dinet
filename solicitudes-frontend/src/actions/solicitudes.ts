"use server";

import { revalidatePath } from "next/cache";
import {
	SolicitudInput,
	solicitudInputSchema,
	solicitudDetailSchema,
	SolicitudListItem,
} from "@/schemas/solicitudSchema";

interface GetSolicitudesParams {
	marca?: string | null;
	tipoSolicitud?: string | null;
	fechaEnvio?: string | null;
}

const API_BASE_URL = process.env.API_BASE_URL;
if (!API_BASE_URL) throw new Error("API_BASE_URL no definida");

export async function getSolicitudes({
	marca,
	tipoSolicitud,
	fechaEnvio,
}: GetSolicitudesParams = {}): Promise<SolicitudListItem[]> {
	try {
		const params = new URLSearchParams();
		if (marca) params.append("marca", marca);
		if (tipoSolicitud) params.append("tipoSolicitud", tipoSolicitud);
		if (fechaEnvio) params.append("fechaEnvio", fechaEnvio);

		const url = params.toString()
			? `${API_BASE_URL}/solicitudes?${params.toString()}`
			: `${API_BASE_URL}/solicitudes`;

		const res = await fetch(url, {
			method: "GET",
			headers: { "Content-Type": "application/json" },
			cache: "no-store",
		});

		if (!res.ok) {
			throw new Error("Error al obtener solicitudes");
		}

		const data = await res.json();
		return data;
	} catch (error) {
		console.error(error);
		throw error;
	}
}

export async function crearSolicitud(raw: unknown) {
	// 1. valida con Zod lado servidor
	const parsed = solicitudInputSchema.safeParse(raw);

	if (!parsed.success) {
		return { ok: false, error: parsed.error.flatten() };
	}
	const data: SolicitudInput = parsed.data;

	// 2. llama al poderosisimo api webflux
	const res = await fetch(`${API_BASE_URL}/solicitudes`, {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(data),
	});
	console.log("Respuesta del servidor", res);

	if (!res.ok) {
		return { ok: false, error: "Error al crear la solicitud" };
	}
	console.log("Solicitud creada con exito", data);

	const result = await res.json();
	revalidatePath("/solicitudes");
	return { ok: true, data: result };
}

export async function getDetalleSolicitud(codigoId: string) {
	try {
		const res = await fetch(
			`${API_BASE_URL}/solicitudes/codigo/${codigoId}`,
			{
				method: "GET",
				headers: { "Content-Type": "application/json" },
				cache: "no-store",
			}
		);

		if (!res.ok) throw new Error("No se encontró la solicitud");

		const data = await res.json();
		const result = solicitudDetailSchema.parse(data);

		return {
			ok: true,
			data: result,
		};
	} catch (error) {
		console.error(error);
		throw error;
	}
}

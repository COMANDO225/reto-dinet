import { z } from "zod";

// Para contactos individuales (detalle)
export const contactoSchema = z.object({
	id: z.string().uuid().optional(), // Para crear no necesitas ID, para detalle sí
	nombreContacto: z
		.string()
		.min(2, "Requerido")
		.regex(/^[A-Za-zÀ-ÿ\s]+$/, "Este campo no acepta números"),
	numeroContacto: z
		.string()
		.transform((v) => v.replace(/\D/g, ""))
		.refine((v) => /^\d{9}$/.test(v), {
			message: "Debe tener 9 dígitos",
		}),
});

// 1️⃣ Schema para crear solicitud (POST)
export const solicitudInputSchema = z.object({
	marca: z.string().min(1, "Seleccione una marca"),
	tipoSolicitud: z.string().min(1, "Seleccione un tipo de solicitud"),
	fechaEnvio: z.date().nullable(),
	numeroContacto: z
		.string()
		.transform((v) => v.replace(/\D/g, ""))
		.refine((v) => /^\d{9}$/.test(v), { message: "Debe tener 9 dígitos" }),
	nombreContacto: z
		.string()
		.min(2, "Requerido")
		.regex(/^[A-Za-zÀ-ÿ\s]+$/, "Este campo no acepta números"),
	contactos: z.array(contactoSchema).nullable(),
});

// 2️⃣ Schema para listar solicitudes en tabla
export const solicitudListSchema = solicitudInputSchema.extend({
	id: z.string().uuid(),
	codigo: z.string(),
	contactos: z.number(),
});

// 3️⃣ Schema para ver detalle de solicitud
export const solicitudDetailSchema = solicitudInputSchema.extend({
	id: z.string().uuid(),
	codigo: z.string(),
	contactos: z.array(contactoSchema).nullable(),
	fechaEnvio: z.string(),
});

// Types
export type SolicitudInput = z.infer<typeof solicitudInputSchema>;
export type SolicitudListItem = z.infer<typeof solicitudListSchema>;
export type SolicitudDetail = z.infer<typeof solicitudDetailSchema>;
export type Contacto = z.infer<typeof contactoSchema>;

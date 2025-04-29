import { SolicitudListItem } from "@/schemas/solicitudSchema";
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

type Marca = { id: string; nombre: string };
type Tipo = { id: string; nombre: string };

interface State {
	marcas: Marca[];
	tipos: Tipo[]; // tipos filtrados por marca
	tiposTotales: Tipo[]; // todos los tipos
	cargarMarcas: () => Promise<void>;
	cargarTiposSolicitud: (marcaId: string) => Promise<void>;
	cargarTiposTotales: () => Promise<void>;
	limpiarTiposSolicitud: () => void;
}

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export const useSolicitudesStore = create<State>()(
	immer((set) => ({
		marcas: [],
		tipos: [],
		tiposTotales: [],
		async cargarMarcas() {
			const res = await fetch(`${API_BASE_URL}/marcas`);
			set({ marcas: await res.json() });
		},
		async cargarTiposSolicitud(marcaId) {
			const res = await fetch(`${API_BASE_URL}/marcas/${marcaId}/tipos`);
			set({ tipos: await res.json() });
		},
		async cargarTiposTotales() {
			const res = await fetch(`${API_BASE_URL}/tipos-solicitud`);
			set({ tiposTotales: await res.json() });
		},
		limpiarTiposSolicitud() {
			set({ tipos: [] });
		},
	}))
);

interface SolicitudesTableState {
	solicitudes: SolicitudListItem[];
	loading: boolean;
	setSolicitudes: (data: SolicitudListItem[]) => void;
	clearSolicitudes: () => void;
	setLoading: (loading: boolean) => void;
}

export const useSolicitudesTableStore = create<SolicitudesTableState>()(
	immer((set) => ({
		solicitudes: [],
		loading: false,
		setSolicitudes: (data) =>
			set(() => ({ solicitudes: data, loading: false })),
		clearSolicitudes: () =>
			set(() => ({ solicitudes: [], loading: false })),
		setLoading: (loading) => set(() => ({ loading })),
	}))
);

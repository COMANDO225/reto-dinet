import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

interface FiltrosState {
	marca: string | null;
	tipoSolicitud: string | null;
	fechaEnvio: string | null;
	setFiltros: (filtros: Partial<FiltrosState>) => void;
	resetFiltros: () => void;
}

export const useFiltrosStore = create<FiltrosState>()(
	immer((set) => ({
		marca: null,
		tipoSolicitud: null,
		fechaEnvio: null,
		setFiltros: (filtros) => {
			set((state) => {
				Object.assign(state, filtros);
			});
		},
		resetFiltros: () => {
			set({ marca: null, tipoSolicitud: null, fechaEnvio: null });
		},
	}))
);

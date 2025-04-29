"use client";

import SolicitudForm from "@/components/ui/Form/SolicitudForm";

const CrearSolicitudPage = () => {
	return (
		<div className="p-[8px_3%] md:p-6 bg-gray-50 flex flex-col items-center justify-start">
			<div className="max-w-2xl w-full bg-white shadow-lg rounded-2xl p-8">
				<h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
					🚀 Crea una Nueva Solicitud
				</h1>
				<p className="text-center text-gray-500 mb-8">
					Completa los siguientes campos para registrar tu solicitud
					de forma rápida y sencilla.
				</p>

				<SolicitudForm />
			</div>
		</div>
	);
};

export default CrearSolicitudPage;

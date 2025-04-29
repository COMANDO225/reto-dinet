"use client";

import { useState } from "react";
import {
	Calendar,
	Phone,
	User,
	Package,
	Users,
	ChevronRight,
	ChevronLeft,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { SolicitudDetail } from "@/schemas/solicitudSchema";
import { AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { QRCodeSVG } from "qrcode.react";

interface DetalleSolicitudCardProps {
	solicitud: SolicitudDetail;
}

const baseUrl = process.env.NEXT_PUBLIC_FRONTEND_URL!;

export default function DetalleSolicitudCard({
	solicitud,
}: DetalleSolicitudCardProps) {
	const [activeContactIndex, setActiveContactIndex] = useState(0);

	const nextContact = () => {
		if (solicitud) {
			setActiveContactIndex((prev) =>
				prev === (solicitud.contactos?.length || 0) - 1 ? 0 : prev + 1
			);
		}
	};

	const prevContact = () => {
		if (solicitud) {
			setActiveContactIndex((prev) =>
				prev === 0 ? (solicitud.contactos?.length || 0) - 1 : prev - 1
			);
		}
	};

	// Formatear fecha
	const formatDate = (dateString: string) => {
		const date = new Date(dateString);
		return new Intl.DateTimeFormat("es-ES", {
			day: "2-digit",
			month: "long",
			year: "numeric",
		}).format(date);
	};

	return (
		<div className="flex items-start justify-center md:items-center h-full">
			<Card className="w-full max-w-4xl overflow-hidden shadow-lg py-0">
				<div className="flex flex-col md:flex-row">
					{/* Columna izquierda - Información principal */}
					<div className="w-full md:w-2/3 p-6">
						<div className="flex items-center gap-4 mb-6">
							{/* Placeholder para la imagen de la empresa */}
							<div className="w-36 h-36 bg-gray-200 rounded-xl flex items-center justify-center">
								<QRCodeSVG
									value={`${baseUrl}/solicitudes/codigo/${solicitud.codigo}`}
									size={128}
									className="rounded-md"
								/>
							</div>

							<div>
								<h1 className="text-3xl font-bold text-gray-800">
									{solicitud?.marca || "Marca no disponible"}
								</h1>
								<div className="flex items-center mt-2">
									<Badge className="bg-primary hover:bg-[var(--primary-600)]">
										{solicitud.tipoSolicitud}
									</Badge>
								</div>
								<div className="flex items-center mt-3 text-gray-600">
									<Calendar className="w-4 h-4 mr-2" />
									<span>
										{formatDate(solicitud.fechaEnvio)}
									</span>
								</div>
							</div>
						</div>

						{/* Información del contacto principal */}
						<div className="bg-gray-50 p-4 rounded-lg mb-6">
							<h2 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
								<User className="w-5 h-5 mr-2 text-primary" />
								Contacto Principal
							</h2>
							<div className="flex flex-col space-y-2">
								<div className="flex items-center">
									<span className="font-medium w-32">
										Nombre:
									</span>
									<span>
										{solicitud && solicitud.nombreContacto}
									</span>
								</div>
								<div className="flex items-center">
									<span className="font-medium w-32">
										Teléfono:
									</span>
									<span className="flex items-center">
										<Phone className="w-4 h-4 mr-1 text-[var(--primary-500)]" />
										{solicitud && solicitud.numeroContacto}
									</span>
								</div>
							</div>
						</div>

						{/* Detalles de la solicitud */}
						<div className="bg-gray-50 p-4 rounded-lg">
							<h2 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
								<Package className="w-5 h-5 mr-2 text-primary" />
								Detalles de la Solicitud
							</h2>
							<div className="flex flex-col space-y-2">
								<div className="flex items-center">
									<span className="font-medium w-32">
										ID:
									</span>
									<span className="text-sm text-gray-600">
										{solicitud.id}
									</span>
								</div>
								<div className="flex items-center">
									<span className="font-medium w-32">
										Tipo:
									</span>
									<span>{solicitud.tipoSolicitud}</span>
								</div>
							</div>
						</div>
					</div>

					{/* Columna derecha - Contactos adicionales */}
					<div className="w-full md:w-1/3 bg-secondary text-white p-6">
						<h2 className="text-xl font-bold mb-4 ">
							{solicitud.contactos &&
							solicitud.contactos.length > 0 ? (
								<div className="flex items-center">
									<Users className="min-w-5 min-h-5 mr-2" />
									Contactos Adicionales
								</div>
							) : (
								<div className="flex items-center justify-center h-full">
									Esta solicitud no tiene contactos
									adicionales
								</div>
							)}
						</h2>

						{/* Carrusel de contactos */}
						<div className="relative mt-4 h-[340px]">
							{/* Controles del carrusel */}
							{solicitud.contactos &&
								solicitud.contactos.length > 1 && (
									<div className="flex justify-end space-x-2 space-y-2">
										<Button
											variant="ghost"
											size="icon"
											onClick={prevContact}
											className="text-white h-8 w-8 bg-[rgba(255,255,255,0.15)]"
										>
											<ChevronLeft className="h-5 w-5" />
										</Button>
										<Button
											variant="ghost"
											size="icon"
											onClick={nextContact}
											className="text-white h-8 w-8 bg-[rgba(255,255,255,0.15)]"
										>
											<ChevronRight className="h-5 w-5" />
										</Button>
									</div>
								)}

							{/* Tarjetas de contacto */}
							<div className="relative h-full overflow-hidden">
								{solicitud.contactos &&
									solicitud.contactos.map(
										(contacto, index) => (
											<div
												key={contacto.id}
												className={cn(
													"absolute top-0 left-0 w-full transition-all duration-500 ease-in-out",
													index === activeContactIndex
														? "opacity-100 translate-y-0"
														: "opacity-0 translate-y-20 pointer-events-none"
												)}
											>
												<div className="bg-white text-gray-800 rounded-lg p-5 shadow-md">
													<div className="flex items-center mb-4">
														<Avatar
															className={cn(
																"border-2 border-white size-16 bg-muted cursor-pointer hover:bg-muted/80 transition-all duration-200 ease-in-out"
															)}
														>
															<AvatarImage
																src="https://res.cloudinary.com/dro4ur0kq/image/upload/v1675441683/facebook/user/default_pic_zswxlq.png"
																alt="@shadcn"
															/>
															<AvatarFallback>
																<User className="h-8 w-8 text-muted-foreground" />
															</AvatarFallback>
														</Avatar>
														<div className="ml-4">
															<h3 className="font-bold text-lg">
																{
																	contacto.nombreContacto
																}
															</h3>
															<p className="text-gray-500 text-sm font-medium">
																Contacto #
																{index + 1}
															</p>
														</div>
													</div>

													<div className="border-t border-gray-100 pt-4">
														<div className="flex items-center">
															<Phone className="w-4 h-4 mr-2 text-primary" />
															<span>
																{
																	contacto.numeroContacto
																}
															</span>
														</div>
													</div>
												</div>

												{/* Indicadores de posición */}
												<div className="flex justify-center mt-4 space-x-1">
													{solicitud.contactos &&
														solicitud.contactos.map(
															(_, i) => (
																<div
																	key={i}
																	className={cn(
																		"h-2 rounded-full transition-all",
																		i ===
																			activeContactIndex
																			? "w-4 bg-white"
																			: "w-2 bg-[var(--primary-400)]"
																	)}
																/>
															)
														)}
												</div>
											</div>
										)
									)}
							</div>
						</div>

						{/* Contador de contactos */}
						{solicitud.contactos &&
							solicitud.contactos.length > 1 && (
								<div className="mt-4 text-center text-white">
									<p>
										{activeContactIndex + 1} de{" "}
										{solicitud.contactos &&
											solicitud.contactos.length}{" "}
										contactos
									</p>
								</div>
							)}
					</div>
				</div>
			</Card>
		</div>
	);
}

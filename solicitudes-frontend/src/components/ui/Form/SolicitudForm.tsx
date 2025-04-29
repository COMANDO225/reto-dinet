"use client";

import { useEffect, useTransition } from "react";
import {
	useForm,
	Controller,
	useFieldArray,
	SubmitHandler,
} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Combobox } from "@/components/ui/combobox";
import { Trash2, Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import { useSolicitudesStore } from "@/store/useSolicitudesStore";
import {
	SolicitudInput,
	solicitudInputSchema,
} from "@/schemas/solicitudSchema";
import { toast } from "react-toastify";
import { crearSolicitud } from "@/actions/solicitudes";
import { DatePicker } from "../DatePicker";
import { maskPhone } from "@/helpers/maskPhone";

interface SolicitudFormProps {
	onSubmitSuccess?: () => void;
	onSubmitError?: (error: string) => void;
}

const SolicitudForm = ({
	onSubmitSuccess,
	onSubmitError,
}: SolicitudFormProps) => {
	const {
		marcas,
		tipos,
		cargarMarcas,
		cargarTiposSolicitud,
		limpiarTiposSolicitud,
	} = useSolicitudesStore();

	const [pending, startTransition] = useTransition();

	const {
		register,
		handleSubmit,
		control,
		watch,
		reset,
		setValue,
		setError,
		clearErrors,
		formState: { errors, isSubmitting, isValid },
	} = useForm<SolicitudInput>({
		resolver: zodResolver(solicitudInputSchema),
		mode: "onChange",
		criteriaMode: "all",
		defaultValues: {
			marca: "",
			tipoSolicitud: "",
			fechaEnvio: null,
			numeroContacto: "",
			nombreContacto: "",
			contactos: [],
		},
	});

	const { fields, append, remove } = useFieldArray({
		control,
		name: "contactos",
	});

	useEffect(() => {
		cargarMarcas();
	}, []);

	const marcaSel = watch("marca");
	useEffect(() => {
		if (marcaSel) {
			const id = marcas.find((m) => m.nombre === marcaSel)?.id;
			id ? cargarTiposSolicitud(id) : limpiarTiposSolicitud();
		} else limpiarTiposSolicitud();
	}, [marcaSel, marcas]);

	const onSubmit: SubmitHandler<SolicitudInput> = (data) =>
		startTransition(async () => {
			const principal = data.numeroContacto.replace(/\D/g, "");
			const contactos = data.contactos || [];

			const numeros = contactos
				.map((c) => c.numeroContacto.replace(/\D/g, ""))
				.filter((n) => !!n);
			const allNumbers = [principal, ...numeros];

			const duplicates = allNumbers.filter(
				(item, index) => allNumbers.indexOf(item) !== index
			);

			if (duplicates.length > 0) {
				if (duplicates.includes(principal)) {
					setError("numeroContacto", {
						type: "custom",
						message: "Número duplicado en contactos",
					});
				}

				contactos.forEach((contacto, index) => {
					const num = contacto.numeroContacto.replace(/\D/g, "");
					if (duplicates.includes(num)) {
						setError(`contactos.${index}.numeroContacto` as const, {
							type: "custom",
							message: "Número duplicado en contactos",
						});
					}
				});

				toast.error(
					"Hay números de contacto duplicados, por favor corrige."
				);
				return;
			}

			const res = await crearSolicitud(data);
			if (res.ok) {
				toast.success("Solicitud registrada con éxito");
				onSubmitSuccess?.();
				reset(); // limpia el formulario
			} else {
				toast.error("Error: " + JSON.stringify(res.error));
				// onSubmitError?.(r.error);
			}
		});

	return (
		<form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mt-3">
			{/* Marca */}
			<div className="grid grid-cols-2 gap-3">
				<div>
					<Label
						htmlFor="marca"
						className={cn(
							"pl-1 text-xs font-medium mb-1",
							errors.marca && "text-destructive"
						)}
					>
						Marca
					</Label>
					<Controller
						control={control}
						name="marca"
						render={({ field }) => (
							<Combobox
								field={field}
								options={marcas.map((m) => ({
									value: m.nombre,
									label: m.nombre,
								}))}
								placeholder="Seleccione"
								isValid={!!field.value || !errors.marca}
							/>
						)}
					/>
					{errors.marca && (
						<p className="text-xs text-destructive">
							{errors.marca.message}
						</p>
					)}
				</div>

				{/* Tipo de Solicitud */}
				<div>
					<Label
						htmlFor="tipoSolicitud"
						className={cn(
							"pl-1 text-xs font-medium mb-1",
							errors.tipoSolicitud && "text-destructive"
						)}
					>
						Tipo de Solicitud
					</Label>
					<Controller
						control={control}
						name="tipoSolicitud"
						render={({ field }) => (
							<Combobox
								field={field}
								disabled={!marcaSel}
								options={tipos.map((t) => ({
									value: t.nombre,
									label: t.nombre,
								}))}
								placeholder="Tipo de Solicitud"
								isValid={!!field.value || !errors.tipoSolicitud}
							/>
						)}
					/>
					{errors.tipoSolicitud && (
						<p className="text-xs text-destructive">
							{errors.tipoSolicitud.message}
						</p>
					)}
				</div>
			</div>

			{/* Fecha de Envio y Numero de contacto */}
			<div className="grid grid-cols-2 gap-3">
				<div>
					<Label
						htmlFor="fechaEnvio"
						className="pl-1 text-xs font-medium mb-1"
					>
						Fecha de Envio
					</Label>
					<Controller
						control={control}
						name="fechaEnvio"
						render={({ field }) => (
							<DatePicker
								value={field.value || undefined}
								onChange={field.onChange}
								placeholder="Fecha de Envio"
								className={cn(
									"w-full",
									errors.fechaEnvio && "border-destructive"
								)}
							/>
						)}
					/>
					{errors.fechaEnvio && (
						<p className="text-xs text-destructive">
							{errors.fechaEnvio.message}
						</p>
					)}
				</div>

				<div>
					<Label
						htmlFor="numeroContacto"
						className={cn(
							"pl-1 text-xs font-medium mb-1",
							errors.numeroContacto && "text-destructive"
						)}
					>
						Numero de Contacto
					</Label>
					<Controller
						control={control}
						name="numeroContacto"
						render={({ field }) => (
							<Input
								{...field}
								disabled={isSubmitting || pending}
								onChange={(e) => {
									const raw = e.target.value;
									const digits = raw
										.replace(/\D+/g, "")
										.slice(0, 9);
									const pretty = digits.replace(
										/(\d{3})(\d{3})(\d{0,3})/,
										(_, a, b, c) =>
											c
												? `${a} ${b} ${c}`
												: b
												? `${a} ${b}`
												: a
									);
									setValue("numeroContacto", pretty, {
										shouldValidate: true,
									});
								}}
								placeholder="Numero de Contacto"
								className={cn(
									"w-full",
									errors.numeroContacto &&
										"border-destructive"
								)}
							/>
						)}
					/>
					{errors.numeroContacto && (
						<p className="text-xs text-destructive">
							{errors.numeroContacto.message}
						</p>
					)}
				</div>
			</div>

			{/* Nombre contacto */}
			<div>
				<Label
					htmlFor="nombreContacto"
					className={cn(
						"pl-1 text-xs font-medium mb-1",
						errors.nombreContacto && "text-destructive"
					)}
				>
					Nombre de Contacto
				</Label>
				<Controller
					control={control}
					name="nombreContacto"
					render={({ field }) => (
						<Input
							{...field}
							disabled={isSubmitting || pending}
							placeholder="Nombre"
							className={cn(
								errors.nombreContacto && "border-destructive"
							)}
						/>
					)}
				/>
				{errors.nombreContacto && (
					<p className="text-xs text-destructive">
						{errors.nombreContacto.message}
					</p>
				)}
			</div>

			{/* Contactos adicionales */}
			{fields.length > 0 && (
				<div className="grid gap-1">
					<div className="text-xs font-medium text-center text-gray-600">
						Contactos Opcionales{" "}
						{fields.length > 1 && `(${fields.length})`}
					</div>
					<div className="grid gap-2 max-h-[200px] overflow-y-auto py-2">
						{fields.map((field, index) => (
							<div
								key={field.id}
								className="grid grid-cols-[1fr_1fr_auto] gap-2 items-center"
							>
								<Input
									placeholder="Nombre"
									{...register(
										`contactos.${index}.nombreContacto`
									)}
									disabled={isSubmitting || pending}
									className={cn(
										errors.contactos?.[index]
											?.nombreContacto &&
											"border-destructive"
									)}
								/>
								<Input
									placeholder="Número"
									{...register(
										`contactos.${index}.numeroContacto`
									)}
									disabled={isSubmitting || pending}
									onChange={(e) => {
										const v = maskPhone(e.target.value);
										setValue(
											`contactos.${index}.numeroContacto`,
											v,
											{ shouldValidate: true }
										);
									}}
									className={cn(
										errors.contactos?.[index]
											?.numeroContacto &&
											"border-destructive"
									)}
								/>
								<Button
									type="button"
									variant="outline"
									disabled={isSubmitting || pending}
									onClick={() => remove(index)}
								>
									<Trash2 className="size-4" />
								</Button>
							</div>
						))}
					</div>
				</div>
			)}

			<Button
				type="button"
				variant="outline"
				className="w-full h-10"
				onClick={() =>
					append({ nombreContacto: "", numeroContacto: "" })
				}
				disabled={pending || isSubmitting}
			>
				<Plus className="mr-2 h-4 w-4" />
				Agregar Contacto
			</Button>

			<Button
				disabled={!isValid || isSubmitting || pending}
				type="submit"
				className="w-full h-[44px]"
			>
				{pending ? "Guardando..." : "Guardar Solicitud"}
			</Button>
		</form>
	);
};

export default SolicitudForm;

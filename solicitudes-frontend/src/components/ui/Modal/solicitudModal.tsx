"use client";

import { Controller } from "react-hook-form";
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../dialog";
import { DialogTrigger } from "@radix-ui/react-dialog";
import { Combobox } from "../combobox";
import { Button } from "../button";
import { DatePicker } from "../DatePicker";
import { Label } from "../label";
import { Input } from "../input";
import { Plus, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { maskPhone } from "@/helpers/maskPhone";
import SolicitudForm from "../Form/SolicitudForm";

const SolicitudModal = () => {
	const [open, setOpen] = useState(false);
	const handleOpenChange = (v: boolean) => {
		setOpen(v);
	};

	return (
		<Dialog open={open} onOpenChange={handleOpenChange}>
			<DialogTrigger asChild>
				<Button className="h-8 py-0">Crear Solicitud</Button>
			</DialogTrigger>

			<DialogContent
				className="max-w-xl"
				onInteractOutside={(e) => {
					e.preventDefault();
				}}
			>
				<DialogHeader>
					<DialogTitle>Nueva Solicitud</DialogTitle>
				</DialogHeader>

				<SolicitudForm
					onSubmitSuccess={() => {
						setOpen(false);
					}}
				/>
			</DialogContent>
		</Dialog>
	);
};

export default SolicitudModal;

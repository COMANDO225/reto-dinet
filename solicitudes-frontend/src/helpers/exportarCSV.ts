export function exportToCSV<T extends Record<string, any>>(
	data: T[],
	filename: string,
	columnsToInclude: (keyof T)[]
) {
	if (data.length === 0) {
		console.warn("No hay datos para exportar");
		return;
	}

	let csvContent = "\uFEFF";
	csvContent += columnsToInclude.join(",") + "\r\n";

	for (const row of data) {
		const rowData = columnsToInclude.map((key) => {
			let value = row[key];

			if (Array.isArray(value)) {
				value = value.join(" | ");
			} else if (typeof value === "object" && value !== null) {
				const transformedValue = JSON.stringify(value);
				value = transformedValue as unknown as T[keyof T];
			}

			const cell = String(value).replace(/"/g, '""');
			return `"${cell}"`;
		});

		csvContent += rowData.join(",") + "\r\n";
	}

	const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
	const url = URL.createObjectURL(blob);

	const link = document.createElement("a");
	link.href = url;
	link.setAttribute("download", `${filename}.csv`);
	document.body.appendChild(link);
	link.click();
	document.body.removeChild(link);
}

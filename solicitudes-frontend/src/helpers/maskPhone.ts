export const maskPhone = (raw: string) => {
	const digits = raw.replace(/\D+/g, "").slice(0, 9);
	return digits.replace(/(\d{3})(\d{3})(\d{0,3})/, (_, a, b, c) =>
		c ? `${a} ${b} ${c}` : b ? `${a} ${b}` : a
	);
};

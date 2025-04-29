import Image from "next/image";
import React from "react";

const BrandLogo = () => {
	return (
		<Image
			src="/assets/images/logo_dinet.png"
			alt="Dinet Logo"
			width={30}
			height={30}
		/>
	);
};

export default BrandLogo;

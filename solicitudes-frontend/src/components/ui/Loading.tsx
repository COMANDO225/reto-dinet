import React from "react";

const Loading = () => {
	return (
		<div className="flex items-center justify-center min-h-screen bg-gray-50">
			<div className="w-16 h-16 border-4 border-gray-300 border-t-primary-600 rounded-full animate-spin"></div>
		</div>
	);
};

export default Loading;

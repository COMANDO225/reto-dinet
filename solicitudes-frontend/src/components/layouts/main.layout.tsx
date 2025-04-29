import { ReactNode } from "react";
import { DashboardLayout } from "../ui/Dashboard/DashboardLayout";

interface MainProps {
	children: ReactNode;
}

const MainLayout = ({ children }: MainProps) => {
	return <DashboardLayout>{children}</DashboardLayout>;
};

export default MainLayout;

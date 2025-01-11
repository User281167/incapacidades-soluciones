import { title } from "@/components/primitives";
import DashboardLayout from "@/layouts/dashboard";

export default function DashboardPage() {
  return (
    <DashboardLayout>
      <h1 className={title()}>Información personal</h1>
    </DashboardLayout>
  );
}

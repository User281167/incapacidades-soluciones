import { container, title } from "@/components/primitives";
import DashboardLayout from "@/layouts/dashboard";

export default function DashboardPage() {
  return (
    <DashboardLayout>
      <h1 className={title()}>Información personal</h1>

      <article className={container()}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus.
      </article>
    </DashboardLayout>
  );
}

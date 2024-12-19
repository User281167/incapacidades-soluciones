import { backgroundGradient, subtitle, title } from "@/components/primitives";
import MainLayout from "@/layouts/main-layout";
import { SignUpForm } from "./form";

export default function SignUpCompanyPage() {
  return (
    <MainLayout>
      <header className={backgroundGradient()}>
        <div className="max-w-2xl space-y-6 block">
          <h1 className={title()}>¡Únete Hoy!</h1>

          <h2 className={subtitle()}>
            Da el primer paso hacia un futuro brillante
          </h2>

          <p>
            Únase a Incapacidades y Soluciones y transforme la forma en que su
            empresa gestiona las incapacidades laborales. Simplifique procesos,
            mejore la comunicación interna y asegure el cumplimiento normativo
            con nuestra plataforma fácil de usar. ¡Ahorre tiempo y recursos
            mientras cuida del bienestar de sus empleados!
          </p>
        </div>

        <img
          alt="Incapacidades y Soluciones"
          className="hidden md:block md:w-1/3 xl:w-auto object-cover"
          src="/juicy-patient.png"
        />
      </header>

      <SignUpForm />
    </MainLayout>
  );
}

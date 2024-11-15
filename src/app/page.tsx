"use client";

import { button as buttonStyles } from "@nextui-org/theme";
import {
  IconArrowNarrowRight,
  IconBrandDatabricks,
  IconBuilding,
  IconCurrencyPound,
  IconDatabaseImport,
  IconFileCheck,
  IconFriends,
  IconUsers,
} from "@tabler/icons-react";

import { Card, CardBody, CardHeader, Divider } from "@nextui-org/react";

import {
  title,
  subtitle,
  backgroundGradient,
  container,
  sectionTitle,
} from "@/components/primitives";

import { siteConfig } from "@/config/site";
import Link from "next/link";
import MainLayout from "@/layouts/main-layout";

export default function Home() {
  return (
    <MainLayout>
      <header className={backgroundGradient()}>
        <div className="max-w-2xl space-y-6 block">
          <h1 className={title()}>Incapacidades y Soluciones</h1>
          <h2 className={subtitle()}>
            Gestión eficiente de incapacidades para empresas modernas
          </h2>

          <p>
            Gestión clara y eficiente de incapacidades laborales, segura, rápida
            y fácil de usar, diseñada para mejorar la comunicación y agilizar
            los procesos internos.
          </p>

          <p>
            Aumente la productividad de su equipo mientras cuidamos del
            bienestar de sus empleados.
          </p>

          <span className="w-full flex flex-col justify-center items-center">
            <Link
              className={
                buttonStyles({ color: "primary" }) +
                " shadow-lg hover:shadow-2xl duration-100 "
              }
              href={siteConfig.links.signUpCompany.href}
            >
              Registra tu empresa {<IconArrowNarrowRight />}
            </Link>
          </span>
        </div>

        <img
          alt="Incapacidades y Soluciones"
          className="hidden md:block md:w-1/3 xl:w-auto object-cover"
          src="/medical-consultation.gif"
        />
      </header>

      <section className={container()}>
        <h2 className={sectionTitle()}>Soluciones que ofrecemos</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 place-items-center relative max-w-5xl mx-auto">
          <Card className="max-w-sm p-4 z-10 dark:bg-gray-800">
            <CardHeader>
              <div className="flex items-center gap-8">
                <IconBuilding size={48} />

                <div>
                  <h5 className="text-2xl font-semibold">Para Empresas</h5>
                  <p className={subtitle()}>Soluciones eficientes de gestión</p>
                </div>
              </div>
            </CardHeader>

            <Divider />

            <CardBody>
              <ul className="list-disc list-inside space-y-4">
                <li>
                  Gestión automatizada de incapacidades: Centralice y automatice
                  el proceso de registro y seguimiento de incapacidades,
                  reduciendo el trabajo manual y errores administrativos.
                </li>
                <li>
                  Comunicación fluida: Facilite la interacción entre empleados y
                  líderes de recursos humanos con notificaciones y
                  actualizaciones en tiempo real.
                </li>
                <li>
                  Reportes personalizados: Genere informes detallados para
                  análisis y toma de decisiones, permitiendo un seguimiento más
                  efectivo del historial de incapacidades.
                </li>
              </ul>
            </CardBody>
          </Card>

          <Card className="max-w-sm p-4 lg:mt-40 z-10 dark:bg-gray-800">
            <CardHeader>
              <div className="flex items-center gap-8">
                <IconUsers size={48} />

                <div>
                  <h5 className="text-2xl font-semibold">Para Empleados</h5>
                  <p className={subtitle()}>
                    Apoyamos tu crecimiento dentro de la empresa
                  </p>
                </div>
              </div>
            </CardHeader>

            <Divider />

            <CardBody>
              <ul className="list-disc list-inside space-y-4">
                <li>
                  Carga rápida de incapacidades: Comparta tus incapacidades de
                  manera fácil y segura desde cualquier dispositivo.
                </li>
                <li>
                  Seguimiento del estado: Acceso en tiempo real al estado de sus
                  solicitudes, manteniéndolos informados sobre la aprobación o
                  requerimientos adicionales.
                </li>
                <li>
                  Comunicación directa: Interacción rápida y sencilla con los
                  líderes de recursos humanos para resolver dudas o aclarar
                  información relacionada con sus incapacidades.
                </li>
              </ul>
            </CardBody>
          </Card>

          <svg
            className="hidden lg:block absolute rounded-xl"
            height={750}
            width={950}
          >
            <path
              d="M 0 750 C 500 500 500 0 950 0 L 950 750 L 0 750"
              fill="#56A4C1"
            />
          </svg>
        </div>
      </section>

      <section className={container()}>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8 place-items-center">
          <div className="space-y-6 col-span-2">
            <h2 className={sectionTitle()}>Beneficios para su Empresa</h2>

            <div className="flex items-center gap-4">
              <IconBrandDatabricks size={48} />

              <h4 className="text-2xl text-slate-600 dark:text-slate-300">
                Optimización de Procesos
              </h4>
            </div>

            <p>
              Automatice la gestión de incapacidades, eliminando tareas manuales
              y reduciendo el riesgo de errores humanos. Nuestra plataforma
              agiliza el flujo de trabajo y facilita el acceso inmediato a la
              información.
            </p>

            <div className="flex items-center gap-4 ">
              <IconCurrencyPound size={48} />

              <h4 className="text-2xl text-slate-600 dark:text-slate-300">
                Reducción de Costos Operativos
              </h4>
            </div>

            <p>
              Minimice el tiempo invertido en tareas administrativas,
              permitiendo a su equipo enfocarse en actividades estratégicas. La
              eficiencia de la plataforma reduce la necesidad de personal
              adicional y optimiza los recursos.
            </p>
          </div>

          <Divider orientation="vertical" />

          <div className="space-y-6 col-span-2">
            <div className="flex items-center gap-4">
              <IconFileCheck size={48} />

              <h4 className="text-2xl text-slate-600 dark:text-slate-300">
                Cumplimiento Normativo
              </h4>
            </div>

            <p>
              Manténgase al día con las normativas laborales vigentes. Nuestra
              plataforma garantiza que las empresas gestionen incapacidades de
              acuerdo con los requisitos legales, evitando sanciones o
              complicaciones.
            </p>

            <div className="flex items-center gap-4">
              <IconFriends size={48} />

              <h4 className="text-2xl text-slate-600 dark:text-slate-300">
                Mejora en la Comunicación Interna
              </h4>
            </div>

            <p>
              Minimice el tiempo invertido en tareas administrativas,
              permitiendo a su equipo enfocarse en actividades estratégicas. La
              eficiencia de la plataforma reduce la necesidad de personal
              adicional y optimiza los recursos.
            </p>

            <div className="flex items-center gap-4">
              <IconDatabaseImport size={48} />

              <h4 className="text-2xl text-slate-600 dark:text-slate-300">
                Toma de Decisiones Basada en Datos
              </h4>
            </div>

            <p>
              Minimice el tiempo invertido en tareas administrativas,
              permitiendo a su equipo enfocarse en actividades estratégicas. La
              eficiencia de la plataforma reduce la necesidad de personal
              adicional y optimiza los recursos.
            </p>
          </div>
        </div>

        <Link
          className={
            buttonStyles({ color: "primary" }) +
            " shadow-lg hover:shadow-xl duration-100 m-auto"
          }
          href={siteConfig.links.signUpCompany.href}
        >
          Registra tu empresa {<IconArrowNarrowRight />}
        </Link>
      </section>
    </MainLayout>
  );
}

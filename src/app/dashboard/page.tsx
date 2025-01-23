"use client";

import { container, title } from "@/components/primitives";
import DashboardLayout from "@/layouts/dashboard";

import { useAuth } from "@/hooks/use-auth";
import { useUser } from "@/hooks/use-user";

import { USER_ROLE } from "@/types/role";

export default function DashboardPage() {
  const { user } = useAuth();
  const { collaborator } = useUser();

  return (
    <DashboardLayout>
      <section className={container()}>
        <h1 className={title()}>Información personal</h1>

        <div className="flex flex-col gap-4">
          <h3 className="font-bold text-2xl">Nombre: {user.name}</h3>
          <h3 className="font-bold text-2xl">Apellidos: {user.lastName}</h3>

          <p>
            <b>Cédula:</b> {user.cedula}
          </p>
          <p>
            <b>Email:</b> {user.email}
          </p>
          <p>
            <b>Teléfono:</b> {user.phone}
          </p>
          <p>
            <b>Fecha de unión:</b> {user.joinDate}
          </p>

          {user.role === USER_ROLE.COLLABORATOR && (
            <>
              <p>
                <b>Cargo: {collaborator?.position}</b>
              </p>
              {collaborator?.inability && (
                <p>
                  <b>Estado:</b> Incapacitado
                </p>
              )}
              <p>
                <b>Entidad de salud:</b> {collaborator?.healthEntity}
              </p>
            </>
          )}
        </div>
      </section>
    </DashboardLayout>
  );
}

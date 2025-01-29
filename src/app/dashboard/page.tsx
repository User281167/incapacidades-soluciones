"use client";

import { container, title } from "@/components/primitives";
import DashboardLayout from "@/layouts/dashboard";

import { useAuth } from "@/hooks/use-auth";
import { useUser } from "@/hooks/use-user";

import { USER_ROLE } from "@/types/role";
import { Button, Image } from "@nextui-org/react";
import { IconUpload, IconUserCircle } from "@tabler/icons-react";

export default function DashboardPage() {
  const { user } = useAuth();
  const { collaborator } = useUser();

  return (
    <DashboardLayout>
      <section className={container()}>
        <h1 className={title()}>Información personal</h1>

        <div className="flex justify-between w-full flex-wrap-reverse">
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

          <div className="flex flex-col items-center justify-center gap-4 m-auto">
            {user.photo && (
              <Image
                isBlurred
                src={user.photo}
                alt="Avatar"
                width={200}
                height={200}
              />
            )}

            {!user.photo && <IconUserCircle size={200} />}

            <Button className="mt-4" variant="bordered" color="secondary">
              <IconUpload size={24} />
              {user.photo
                ? "Actualizar foto de perfil"
                : "Subir foto de perfil"}
            </Button>
          </div>
        </div>
      </section>
    </DashboardLayout>
  );
}

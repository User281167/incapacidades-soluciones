"use client";

import DashboardLayout from "@/layouts/dashboard";
import { Image } from "@nextui-org/react";
import { Toaster, toast } from "sonner";
import { container, title } from "@/components/primitives";
import { IconCloudUpload, IconUserCircle } from "@tabler/icons-react";

import { useAuth } from "@/hooks/use-auth";
import { useUser } from "@/hooks/use-user";
import { useEffect, useState } from "react";

import { USER_ROLE } from "@/types/role";

export default function DashboardPage() {
  const { user } = useAuth();
  const { collaborator, uploadPhoto, loading, errorMessage } = useUser();
  const [loadingPhoto, setLoadingPhoto] = useState<boolean>(false);

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const uploadFile = event.target.files?.[0];

    if (uploadFile) {
      setLoadingPhoto(true);
      await uploadPhoto(user.id, uploadFile);
      setLoadingPhoto(false);
    }
  };

  useEffect(() => {
    if (errorMessage) {
      toast.error(errorMessage);
    }
  }, [errorMessage]);

  return (
    <DashboardLayout>
      <Toaster richColors />

      <section className={container()}>
        <h1 className={title()}>Información personal</h1>

        <div className="flex justify-between w-full flex-wrap-reverse gap-12">
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

          <div className="flex flex-col items-center justify-center gap-4 w-full md:w-fit">
            {user.photo && (
              <Image
                isBlurred
                className="w-auto h-44 md:w-96 md:h-96 object-cover"
                src={user.photo}
                alt="Avatar"
              />
            )}

            {!user.photo && (
              <IconUserCircle className="w-auto h-44 md:w-96 md:h-96" />
            )}

            <div className="flex items-center justify-center bg-grey-lighter">
              <label className="w-64 flex flex-col items-center px-1 py-2 rounded-lg shadow-lg tracking-wide uppercase border border-blue cursor-pointer">
                {!loadingPhoto && (
                  <>
                    <IconCloudUpload size={24} />

                    <span className="mt-2">
                      {user.photo
                        ? "Actualizar foto de perfil"
                        : "Subir foto de perfil"}
                    </span>
                  </>
                )}

                {loadingPhoto && (
                  <>
                    <IconCloudUpload size={24} className="animate-fade-up" />
                    <span className="mt-2">Subiendo foto de perfil</span>
                  </>
                )}

                <input
                  type="file"
                  className="hidden"
                  disabled={loading}
                  accept="image/*"
                  onChange={handleFileChange}
                />
              </label>
            </div>
          </div>
        </div>
      </section>
    </DashboardLayout>
  );
}

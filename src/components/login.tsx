import { Button, Input, Link } from "@nextui-org/react";
import { IconLock, IconMail } from "@tabler/icons-react";

import { siteConfig } from "@/config/site";

export default function Login({ onClose }: { onClose?: () => void }) {
  return (
    <div className="flex flex-col p-8 md:p-0 md:w-1/2 max-w-sm justify-center items-center gap-4 mx-auto lg:my-32">
      <h2 className="text-2xl font-bold">Inicia sesión</h2>

      <Input
        endContent={
          <IconMail className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
        }
        placeholder="Cédula"
        variant="bordered"
      />

      <Input
        endContent={
          <IconLock className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
        }
        placeholder="Contraseña"
        type="password"
        variant="bordered"
      />

      <Link className="w-full text-sm" href="#">
        ¿Olvidaste tu contraseña?
      </Link>

      <Button variant="bordered" onClick={onClose || (() => {})}>
        Iniciar sesión
      </Button>

      <div className="flex flex-col gap-2 mt-10 text-sm">
        <p>
          Si aún no cuentas con un usuario en la plataforma ponte en contacto
          con el encargado de gestionar las incapacidades para obtener acceso a
          la plataforma.
        </p>

        <Link className="w-full text-sm" href={siteConfig.links.signUp.href}>
          Crea tu cuenta
        </Link>
      </div>
    </div>
  );
}

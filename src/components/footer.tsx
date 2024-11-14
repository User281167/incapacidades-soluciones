import { Link } from "@nextui-org/react";

import { siteConfig } from "@/config/site";

export default function Footer() {
  return (
    <footer className="bg-main-dark-blue text-white w-full h-fit flex p-5 md:p-0">
      <img
        alt="Incapacidades y Soluciones"
        className="hidden md:block w-1/3 max-h-96 rounded-sm object-cover"
        src="/icon.jpeg"
      />

      <div className="flex flex-col gap-4 md:justify-center md:items-center w-full">
        <h3 className="text-3xl font-semibold text-left">
          Incapacidades y Soluciones
        </h3>

        <div className="flex flex-col gap-8 md:flex-row justify-around">
          <div>
            <h4 className="text-xl">Compañia</h4>

            <ul>
              {siteConfig.footerLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    className="text-while"
                    href={link.href}
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xl">Contáctanos</h4>

            <ul>
              <li>info@incapacidadesysoluciones.com</li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}

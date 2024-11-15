import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "./providers";
import { AuthProvider } from "@/hooks/use-auth";

export const metadata: Metadata = {
  title: "Incapacidades y Soluciones",
  description:
    "Incapacidades y Soluciones, Gestión eficiente de incapacidades para empresas modernas",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`antialiased`}>
        <Providers>
          <AuthProvider>{children}</AuthProvider>
        </Providers>
      </body>
    </html>
  );
}

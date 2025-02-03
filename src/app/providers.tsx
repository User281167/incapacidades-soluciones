"use client";

import { AuthProvider } from "@/hooks/use-auth";
import { CompanyProvider } from "@/hooks/use-company";
import { UserProvider } from "@/hooks/use-user";
import { NextUIProvider } from "@nextui-org/react";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <NextUIProvider>
      <AuthProvider>
        <UserProvider>
          <CompanyProvider>{children}</CompanyProvider>
        </UserProvider>
      </AuthProvider>
    </NextUIProvider>
  );
}

"use client";

import { AuthProvider } from "@/hooks/use-auth";
import { UserProvider } from "@/hooks/use-user";
import { NextUIProvider } from "@nextui-org/react";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <NextUIProvider>
      <AuthProvider>
        <UserProvider>{children}</UserProvider>
      </AuthProvider>
    </NextUIProvider>
  );
}

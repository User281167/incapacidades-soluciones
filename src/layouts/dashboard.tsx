"use client";

import UserMenu from "@/components/menu/user-menu";
import { useAuth } from "@/hooks/use-auth";
import { useEffect } from "react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isLogin, loading } = useAuth();

  useEffect(() => {
    if (loading) return;

    if (!isLogin) {
      window.location.href = "/";
    }
  }, [loading, isLogin]);

  return (
    <article className="flex flex-col md:flex-row gap-4">
      <UserMenu />
      <main className="flex-1">{children}</main>
    </article>
  );
}

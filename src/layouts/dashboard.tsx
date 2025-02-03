"use client";

import UserMenu from "@/components/menu/user-menu";
import { useAuth } from "@/hooks/use-auth";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isLogin, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (loading) return;

    if (!isLogin) {
      router.push("/");
    }
  }, [loading, isLogin, router]);

  return (
    <article className="flex flex-col md:flex-row gap-4">
      <UserMenu />
      <main className="flex-1 overflow-auto">{children}</main>
    </article>
  );
}

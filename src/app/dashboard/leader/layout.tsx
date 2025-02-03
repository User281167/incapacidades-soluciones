"use client";

import { siteConfig } from "@/config/site";
import { USER_ROLE } from "@/types/role";

import DashboardLayout from "@/layouts/dashboard";

import { useAuth } from "@/hooks/use-auth";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function LeaderLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isLogin, loading, user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (loading) return;

    if (!isLogin) {
      router.push(siteConfig.links.login.href);
    } else if (user.role !== USER_ROLE.LEADER) {
      router.push(siteConfig.links.dashboard.href);
    }
  }, [loading, isLogin, user, router]);

  return <DashboardLayout>{children}</DashboardLayout>;
}

"use client";

import Login from "@/components/login";
import MainLayout from "@/layouts/main-layout";

import { useAuth } from "@/hooks/use-auth";
import { siteConfig } from "@/config/site";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Page() {
  const { isLogin } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isLogin) {
      router.push(siteConfig.links.dashboard.href);
    }
  }, [isLogin, router]);

  return (
    <MainLayout>
      <Login />
    </MainLayout>
  );
}

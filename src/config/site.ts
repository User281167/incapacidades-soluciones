export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: "Incapacidades y Soluciones",
  description:
    "Incapacidades y Soluciones, Gestión eficiente de incapacidades para empresas modernas",
  navItems: [
    {
      label: "Home",
      href: "/",
    },
  ],
  footerLinks: [
    {
      label: "Política de datos",
      href: "/legal/policy",
    },
    {
      label: "Términos y Condiciones",
      href: "/legal/terms",
    },
  ],
  links: {
    signUpCompany: {
      label: "Registra tu empresa",
      href: "/signup/company",
    },
    login: {
      label: "Inicia sesión",
      href: "/login",
    },
    signUp: {
      label: "Regístrate",
      href: "/signup",
    },
    policy: {
      label: "Política de datos",
      href: "/legal/policy",
    },
    terms: {
      label: "Términos y Condiciones",
      href: "/legal/terms",
    },
  },
};

import {
  IconBuildingHospital,
  IconHeartPlus,
  IconListCheck,
  IconHeartDown,
  IconDeviceFloppy,
  IconUserPlus,
  IconPasswordUser,
  IconBuildingBank,
  IconUserUp,
  IconUserQuestion,
  IconCreditCardPay,
  IconReportMoney,
  IconReport,
} from "@tabler/icons-react";

import { USER_ROLE } from "@/types/role";

export type MenuItem = {
  href: string;
  icon: React.ReactNode;
  label: string;
};

export const COLLABORATOR_MENU: MenuItem[] = [
  {
    href: "/history",
    icon: <IconBuildingHospital size={48} stroke={1.5} />,
    label: "Historial de Incapacidades",
  },
  {
    href: "/add-inability",
    icon: <IconHeartPlus size={48} stroke={1.5} />,
    label: "Agregar nueva Incapacidad",
  },
];

export const RECEPTIONIST_MENU: MenuItem[] = [
  {
    href: "/receptionist/receive",
    icon: <IconListCheck size={48} stroke={1.5} />,
    label: "Recepción de incapacidades",
  },
];

export const ADVISER_MENU: MenuItem[] = [
  {
    href: "/adviser/cancel",
    icon: <IconHeartDown size={48} stroke={1.5} />,
    label: "Dar de baja incapacidad",
  },
  {
    href: "/adviser/pending",
    icon: <IconDeviceFloppy size={48} stroke={1.5} />,
    label: "Incapacidades en proceso",
  },
];

export const ASSISTANT_MENU: MenuItem[] = [
  {
    href: "/assistant/add-collaborator",
    icon: <IconUserPlus size={48} stroke={1.5} />,
    label: "Agregar colaborador",
  },
  {
    href: "/assistant/manage-collaborator",
    icon: <IconPasswordUser size={48} stroke={1.5} />,
    label: "Gestionar colaborador - incapacidad",
  },
];

export const LEADER_MENU: MenuItem[] = [
  {
    href: "dashboard/leader/company-info",
    icon: <IconBuildingBank size={48} stroke={1.5} />,
    label: "Información de la empresa",
  },
  {
    href: "/leader/manage-roles",
    icon: <IconUserUp size={48} stroke={1.5} />,
    label: "Gestionar roles",
  },
  {
    href: "/leader/manage-collaborator",
    icon: <IconUserQuestion size={48} stroke={1.5} />,
    label: "Gestionar colaborador",
  },
  {
    href: "/leader/payment-report",
    icon: <IconReportMoney size={48} stroke={1.5} />,
    label: "Reporte de pago",
  },
];

export const ACCOUNTING_MENU: MenuItem[] = [
  {
    href: "/accounting/payment-report",
    icon: <IconReportMoney />,
    label: "Reporte de pago",
  },
];

export const LEGAL_PORTFOLIO_MENU: MenuItem[] = [
  {
    href: "/legal-portfolio/payment-report",
    icon: <IconCreditCardPay />,
    label: "Agregar pago de incapacidad",
  },
];

export const DOCUMENTAL_MANAGEMENT_MENU: MenuItem[] = [
  {
    href: "/documental-management/payment-report",
    icon: <IconReport />,
    label: "Agregar reporte de incapacidad",
  },
];

export const DASHBOARD_MENU: Record<USER_ROLE, MenuItem[]> = {
  [USER_ROLE.COLLABORATOR]: COLLABORATOR_MENU,
  [USER_ROLE.RECEPTIONIST]: RECEPTIONIST_MENU,
  [USER_ROLE.ADVISER]: ADVISER_MENU,
  [USER_ROLE.LEADER]: LEADER_MENU,
  [USER_ROLE.ASSISTANT]: ASSISTANT_MENU,
  [USER_ROLE.DOCUMENTAL_MANAGEMENT]: DOCUMENTAL_MANAGEMENT_MENU,
  [USER_ROLE.LEGAL_PORTFOLIO]: LEGAL_PORTFOLIO_MENU,
  [USER_ROLE.ACCOUNTING]: ACCOUNTING_MENU,
  [USER_ROLE.NOT_FOUND]: [],
};

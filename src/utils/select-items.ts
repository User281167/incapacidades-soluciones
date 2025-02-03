export const companyType = [
  "Pequeña",
  "Mediana",
  "Grande",
  "Organización sin fines de lucro",
];

export const companySector = [
  "Primario",
  "Secundario o industrial",
  "Terciario o servicios",
];

export function getCompanyType(type: string): string {
  const typeName = type.charAt(0).toUpperCase() + type.slice(1).toLowerCase();
  return companyType.find((t) => t === typeName) || "";
}

export function getCompanySector(sector: string): string {
  const sectorName =
    sector.charAt(0).toUpperCase() + sector.slice(1).toLowerCase();
  return companySector.find((s) => s === sectorName) || "";
}

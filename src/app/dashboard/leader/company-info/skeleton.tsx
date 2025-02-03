import { Input, Skeleton, Textarea } from "@nextui-org/react";

export function CompanyInfoSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-10 place-items-center">
      {Array.from({ length: 7 }, (_, i) => (
        <Skeleton key={i} className={"w-full h-12 rounded-lg"}>
          <Input className="w-full" />
        </Skeleton>
      ))}

      <Skeleton className={"w-full rounded-lg"}>
        <Textarea label="Descripción de la empresa" className="w-full h-28" />
      </Skeleton>
    </div>
  );
}

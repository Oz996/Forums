import { Skeleton } from "@nextui-org/react";

export default function UserLoader() {
  return (
    <div className="flex flex-col gap-2">
      <Skeleton className="size-28 rounded-full mb-2 self-center" />
      <Skeleton className="h-5 w-[12rem] rounded" />
      <Skeleton className="h-5 w-[12rem] rounded" />
      <Skeleton className="h-5 w-[12rem] rounded" />
      <Skeleton className="h-5 w-[12rem] rounded" />
    </div>
  );
}

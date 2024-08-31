import { Card, Skeleton } from "@nextui-org/react";

export default function PostLoader() {
  return (
    <Card className="p-10">
      <div className="flex gap-x-24">
        <div className="flex flex-col gap-2">
          <Skeleton className="size-14 rounded-full mb-6 self-center" />
          <Skeleton className="h-5 w-[7rem] rounded" />
          <Skeleton className="h-5 w-[7rem] rounded" />
          <Skeleton className="h-5 w-[7rem] rounded" />
          <Skeleton className="h-5 w-[7rem] rounded" />
        </div>
        <div className="space-y-8 grow">
          <Skeleton className="h-7 w-[50%] rounded" />
          <div className="space-y-3">
            <Skeleton className="h-5 w-full rounded" />
            <Skeleton className="h-5 w-full rounded" />
            <Skeleton className="h-5 w-full rounded" />
            <Skeleton className="h-5 w-full rounded" />
          </div>
        </div>
      </div>
    </Card>
  );
}

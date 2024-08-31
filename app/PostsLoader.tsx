import { Card, Skeleton } from "@nextui-org/react";

export default function PostsLoader() {
  return (
    <>
      {new Array(4).fill(0).map((_, index) => (
        <Card className="p-10 m-3 mx-auto flex flex-col gap-10 border-b-8 max-md:rounded">
          <div className="flex gap-5">
            <Skeleton className="size-14 rounded-full" />
            <div className="space-y-3">
              <Skeleton className="h-7 w-[15rem] rounded" />
              <Skeleton className="h-5 w-[10rem] rounded" />
            </div>
          </div>
          <div className="lg:px-10 space-y-3">
            <Skeleton className="h-5 w-full rounded" />
            <Skeleton className="h-5 w-full rounded" />
            <Skeleton className="h-5 w-full rounded" />
            <Skeleton className="h-5 w-full rounded" />
          </div>
        </Card>
      ))}
    </>
  );
}

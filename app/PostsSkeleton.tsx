import { Card, Skeleton } from "@nextui-org/react";

export default function PostsSkeleton() {
  return (
    <>
      <Skeleton className="rounded-xl mt-3">
        <Card className="p-10 m-3 mx-auto h-[16rem] flex flex-col border-b-8 max-md:rounded"></Card>
      </Skeleton>
      <Skeleton className="rounded-xl mt-3">
        <Card className="p-10 m-3 mx-auto h-[16rem] flex flex-col border-b-8 max-md:rounded"></Card>
      </Skeleton>
      <Skeleton className="rounded-xl mt-3">
        <Card className="p-10 m-3 mx-auto h-[16rem] flex flex-col border-b-8 max-md:rounded"></Card>
      </Skeleton>
    </>
  );
}

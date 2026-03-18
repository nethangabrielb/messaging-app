import { Skeleton } from "@/components/ui/skeleton";

export function MessagesSkeleton() {
  return (
    <>
      <Skeleton className="mb-1 w-[120px] self-start rounded-lg p-3" />
      <Skeleton className="mb-3 w-[200px] self-start rounded-lg p-3" />
      <Skeleton className="mb-2 w-[80px] self-end rounded-lg p-3" />
      <Skeleton className="mb-1 w-[150px] self-end rounded-lg p-3" />
      <Skeleton className="mb-2 w-[100px] self-start rounded-lg p-3" />
      <Skeleton className="mb-3 w-[170px] self-end rounded-lg p-3" />
      <Skeleton className="mb-2 w-[140px] self-start rounded-lg p-3" />
      <Skeleton className="mb-1 w-[90px] self-end rounded-lg p-3" />
    </>
  );
}

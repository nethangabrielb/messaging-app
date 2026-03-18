import { Skeleton } from "@/components/ui/skeleton";

export function PeoplRowSkeleton() {
  return (
    <>
      <div className="border-border flex w-full items-center justify-between rounded-lg border p-4 sm:w-[80%]">
        <div className="flex items-center gap-2">
          <Skeleton className="h-[38px] w-[38px] rounded-full" />
          <Skeleton className="h-[18px] w-[100px]"></Skeleton>
        </div>
        <Skeleton className="mx-auto h-[8px] w-[8px] rounded-full sm:h-[28px] sm:w-[100px]"></Skeleton>
        <Skeleton className="h-[38px] w-[50px]"></Skeleton>
      </div>

      <div className="border-border flex w-full items-center justify-between rounded-lg border p-4 sm:w-[80%]">
        <div className="flex items-center gap-2">
          <Skeleton className="h-[38px] w-[38px] rounded-full" />
          <Skeleton className="h-[18px] w-[100px]"></Skeleton>
        </div>
        <Skeleton className="mx-auto h-[8px] w-[8px] rounded-full sm:h-[28px] sm:w-[100px]"></Skeleton>
        <Skeleton className="h-[38px] w-[50px]"></Skeleton>
      </div>

      <div className="border-border flex w-full items-center justify-between rounded-lg border p-4 sm:w-[80%]">
        <div className="flex items-center gap-2">
          <Skeleton className="h-[38px] w-[38px] rounded-full" />
          <Skeleton className="h-[18px] w-[100px]"></Skeleton>
        </div>
        <Skeleton className="mx-auto h-[8px] w-[8px] rounded-full sm:h-[28px] sm:w-[100px]"></Skeleton>
        <Skeleton className="h-[38px] w-[50px]"></Skeleton>
      </div>

      <div className="border-border flex w-full items-center justify-between rounded-lg border p-4 sm:w-[80%]">
        <div className="flex items-center gap-2">
          <Skeleton className="h-[38px] w-[38px] rounded-full" />
          <Skeleton className="h-[18px] w-[100px]"></Skeleton>
        </div>
        <Skeleton className="mx-auto h-[8px] w-[8px] rounded-full sm:h-[28px] sm:w-[100px]"></Skeleton>
        <Skeleton className="h-[38px] w-[50px]"></Skeleton>
      </div>
    </>
  );
}

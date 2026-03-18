import { Skeleton } from "@/components/ui/skeleton";

export function ChatRowSkeleton() {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex w-full items-center gap-2 p-4">
        <Skeleton className="h-[38px] w-[38px] rounded-full"></Skeleton>
        <Skeleton className="h-[20px] w-[100px]"></Skeleton>
      </div>
      <div className="flex w-full items-center gap-2 p-4">
        <Skeleton className="h-[38px] w-[38px] rounded-full"></Skeleton>
        <Skeleton className="h-[14px] w-[100px]"></Skeleton>
      </div>
      <div className="flex w-full items-center gap-2 p-4">
        <Skeleton className="h-[38px] w-[38px] rounded-full"></Skeleton>
        <Skeleton className="h-[14px] w-[100px]"></Skeleton>
      </div>
      <div className="flex w-full items-center gap-2 p-4">
        <Skeleton className="h-[38px] w-[38px] rounded-full"></Skeleton>
        <Skeleton className="h-[14px] w-[100px]"></Skeleton>
      </div>
    </div>
  );
}

export function ChatHeaderSkeleton() {
  return (
    <div className="flex items-center gap-2">
      <Skeleton className="h-[38px] w-[38px] rounded-full"></Skeleton>
      <div className="flex flex-col gap-2">
        <Skeleton className="h-[14px] w-[100px]"></Skeleton>
        <Skeleton className="h-[14px] w-[50px]"></Skeleton>
      </div>
    </div>
  );
}

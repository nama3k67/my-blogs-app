import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="md:grid md:grid-cols-4 md:items-start md:gap-x-4">
      <div className="md:col-span-3 flex flex-col space-y-3 md:space-y-0">
        <Skeleton className="md:hidden h-5 w-32" />
        <Skeleton className="h-20" />
      </div>
      <Skeleton className="hidden md:block z-10 order-first h-10" />
    </div>
  );
}

/**
 * Step 150: Data Loading Skeleton & Spinner
 */
import { cn } from "@/lib/utils";

export function Skeleton({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("animate-pulse rounded-md bg-white/10", className)} {...props} />;
}

export function Spinner({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-center justify-center p-4", className)}>
      <div className="h-6 w-6 animate-spin rounded-full border-2 border-white/20 border-t-[#E5B84B]" />
    </div>
  );
}

export function CardSkeleton() {
  return (
    <div className="rounded-xl border border-white/10 bg-[#2A1143] p-4">
      <Skeleton className="h-4 w-32" />
      <Skeleton className="mt-3 h-8 w-20" />
      <Skeleton className="mt-2 h-3 w-40" />
    </div>
  );
}

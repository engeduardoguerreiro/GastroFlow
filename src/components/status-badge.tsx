import type { OrderStatus } from "@/lib/types";
import { cn, statusClass, statusLabel } from "@/lib/utils";

export function StatusBadge({ status }: { status: OrderStatus }) {
  return (
    <span className={cn("inline-flex rounded-full border px-2.5 py-1 text-xs font-bold", statusClass[status])}>
      {statusLabel[status]}
    </span>
  );
}

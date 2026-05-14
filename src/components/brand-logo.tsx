import { cn } from "@/lib/utils";

export function BrandLogo({
  className,
  priority,
  showTagline = false,
}: {
  className?: string;
  priority?: boolean;
  showTagline?: boolean;
}) {
  void priority;
  return (
    <div className={cn("inline-flex items-center gap-3", className)}>
      <GastroMark className="h-11 w-11 shrink-0" />
      <span className="leading-none">
        <span className="block text-2xl font-black tracking-tight text-current">GastroFlow</span>
        {showTagline && (
          <span className="font-secondary mt-1 block text-[0.62rem] font-bold uppercase tracking-[0.22em] text-[#E26A2C]">
            Operações inteligentes
          </span>
        )}
      </span>
    </div>
  );
}

export function GastroMark({ className }: { className?: string }) {
  return (
    <span className={cn("relative grid place-items-center rounded-full border-2 border-[#F5B342] text-[#F5B342]", className)}>
      <span className="absolute left-[-0.45rem] top-[34%] h-0.5 w-5 bg-[#E26A2C]" />
      <span className="absolute left-[-0.7rem] top-[50%] h-0.5 w-7 bg-[#E26A2C]" />
      <span className="absolute left-[-0.45rem] top-[66%] h-0.5 w-5 bg-[#E26A2C]" />
      <span className="font-secondary text-xl font-black">G</span>
      <span className="absolute bottom-2 right-2 flex gap-0.5">
        <span className="h-1 w-1 rounded-full bg-[#E26A2C]" />
        <span className="h-1 w-1 rounded-full bg-[#F5B342]" />
        <span className="h-1 w-1 rounded-full bg-[#F5B342]" />
      </span>
    </span>
  );
}

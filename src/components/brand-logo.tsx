import Image from "next/image";
import { cn } from "@/lib/utils";

export function BrandLogo({
  className,
  priority,
  showTagline,
}: {
  className?: string;
  priority?: boolean;
  showTagline?: boolean;
}) {
  return <BrandNavLogo className={className} priority={priority} showTagline={showTagline} />;
}

export function BrandNavLogo({
  className,
  priority,
  showTagline = true,
}: {
  className?: string;
  priority?: boolean;
  showTagline?: boolean;
}) {
  return (
    <span className={cn("inline-flex items-center gap-3", className)}>
      <Image
        src="/brand/gastroflow-mark-source.png"
        alt=""
        width={1254}
        height={1254}
        priority={priority}
        className="h-12 w-14 rounded-xl border border-white/12 object-contain shadow-lg shadow-black/20"
      />
      <span className="leading-none">
        <span className="block text-[1.35rem] font-black tracking-tight text-[#FFF6E9]">
          Gastro<span className="text-[#F5B342]">Flow</span>
        </span>
        {showTagline && (
          <span className="font-secondary mt-1 hidden text-[0.58rem] font-bold uppercase tracking-[0.22em] text-[#E26A2C] sm:block">
            Gestão para restaurantes
          </span>
        )}
      </span>
    </span>
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

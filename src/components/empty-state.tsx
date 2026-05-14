import { Inbox } from "lucide-react";

export function EmptyState({ title, text }: { title: string; text: string }) {
  return (
    <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-10 text-center text-slate-700">
      <Inbox className="mx-auto mb-3 h-10 w-10 text-slate-400" />
      <h3 className="font-bold text-[#0F1720]">{title}</h3>
      <p className="mt-1 text-sm">{text}</p>
    </div>
  );
}

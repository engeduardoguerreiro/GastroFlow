import { requireRestaurant } from "@/lib/auth";
import { money } from "@/lib/utils";
import type { Order } from "@/lib/types";

export default async function ReportsPage() {
  const { supabase, restaurant } = await requireRestaurant();
  const { data } = await supabase.from("orders").select("*").eq("restaurant_id", restaurant.id).order("created_at", { ascending: false }).limit(500);
  const orders = (data ?? []) as Order[];
  const revenue = orders.reduce((sum, order) => sum + Number(order.total), 0);
  const avg = orders.length ? revenue / orders.length : 0;
  const bySource = orders.reduce<Record<string, number>>((acc, order) => ({ ...acc, [order.source]: (acc[order.source] ?? 0) + 1 }), {});
  return (
    <div className="space-y-5">
      <div className="grid gap-4 md:grid-cols-3">
        <div className="rounded-2xl bg-white p-5 shadow-sm"><p className="text-sm text-slate-500">Faturamento por período</p><strong className="text-3xl">{money(revenue)}</strong></div>
        <div className="rounded-2xl bg-white p-5 shadow-sm"><p className="text-sm text-slate-500">Número de pedidos</p><strong className="text-3xl">{orders.length}</strong></div>
        <div className="rounded-2xl bg-white p-5 shadow-sm"><p className="text-sm text-slate-500">Ticket médio</p><strong className="text-3xl">{money(avg)}</strong></div>
      </div>
      <section className="rounded-2xl bg-white p-5 shadow-sm">
        <h2 className="text-xl font-black">Origem dos pedidos</h2>
        <div className="mt-4 grid gap-3 md:grid-cols-5">{Object.entries(bySource).map(([source, count]) => <div key={source} className="rounded-xl bg-slate-50 p-4"><strong>{source.toUpperCase()}</strong><p>{count} pedidos</p></div>)}</div>
      </section>
      <section className="rounded-2xl bg-white p-5 shadow-sm"><h2 className="text-xl font-black">Produtos mais vendidos</h2><p className="mt-2 text-slate-500">Base pronta para agregar order_items por produto.</p></section>
    </div>
  );
}

import Link from "next/link";
import { requireRestaurant } from "@/lib/auth";
import { money } from "@/lib/utils";
import { StatusBadge } from "@/components/status-badge";
import type { Order } from "@/lib/types";

export default async function DashboardPage() {
  const { supabase, restaurant } = await requireRestaurant();
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const [{ data: orders }, { count: productCount }] = await Promise.all([
    supabase.from("orders").select("*").eq("restaurant_id", restaurant.id).gte("created_at", today.toISOString()).order("created_at", { ascending: false }).limit(8),
    supabase.from("products").select("*", { count: "exact", head: true }).eq("restaurant_id", restaurant.id).eq("active", true),
  ]);
  const rows = (orders ?? []) as Order[];
  const revenue = rows.filter((o) => o.status === "completed" || o.payment_status === "paid").reduce((sum, o) => sum + Number(o.total), 0);
  const cards = [
    ["Pedidos de hoje", rows.length],
    ["Faturamento de hoje", money(revenue)],
    ["Pedidos pendentes", rows.filter((o) => o.status === "pending").length],
    ["Em preparo", rows.filter((o) => o.status === "preparing").length],
    ["Produtos ativos", productCount ?? 0],
    ["Status", restaurant.is_open ? "Aberto" : "Fechado"],
  ];

  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {cards.map(([label, value]) => (
          <div key={label} className="rounded-2xl bg-white p-5 shadow-sm">
            <p className="text-sm font-bold text-slate-500">{label}</p>
            <p className="mt-2 text-3xl font-black">{value}</p>
          </div>
        ))}
      </div>
      <section className="rounded-2xl bg-white p-5 shadow-sm">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-black">Últimos pedidos</h2>
          <Link href="/dashboard/orders" className="font-bold text-[#E26A2C]">Ver todos</Link>
        </div>
        <div className="space-y-3">
          {rows.map((order) => (
            <Link key={order.id} href={`/dashboard/orders/${order.id}`} className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-slate-100 p-4 hover:border-[#E26A2C]/40">
              <div>
                <p className="font-black">#{order.order_number} - {order.customer_name || "Cliente"}</p>
                <p className="text-sm text-slate-500">{order.source.toUpperCase()} · {order.type}</p>
              </div>
              <div className="flex items-center gap-3">
                <StatusBadge status={order.status} />
                <strong>{money(order.total)}</strong>
              </div>
            </Link>
          ))}
          {!rows.length && <p className="rounded-xl bg-slate-50 p-5 text-slate-500">Nenhum pedido hoje ainda.</p>}
        </div>
      </section>
    </div>
  );
}

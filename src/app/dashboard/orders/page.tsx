import Link from "next/link";
import { updateOrderStatus } from "@/app/actions";
import { requireRestaurant } from "@/lib/auth";
import { money, statusLabel } from "@/lib/utils";
import type { Order, OrderStatus } from "@/lib/types";

const statuses: OrderStatus[] = ["pending", "accepted", "preparing", "ready", "out_for_delivery", "completed", "canceled"];

export default async function OrdersPage() {
  const { supabase, restaurant } = await requireRestaurant();
  const { data } = await supabase.from("orders").select("*").eq("restaurant_id", restaurant.id).order("created_at", { ascending: false }).limit(80);
  const orders = (data ?? []) as Order[];
  return (
    <div className="grid gap-4 xl:grid-cols-7">
      {statuses.map((status) => (
        <section key={status} className="rounded-2xl bg-white p-3 shadow-sm">
          <h2 className="mb-3 font-black">{statusLabel[status]}</h2>
          <div className="space-y-3">
            {orders.filter((order) => order.status === status).map((order) => (
              <div key={order.id} className="rounded-xl border border-slate-100 p-3">
                <Link href={`/dashboard/orders/${order.id}`} className="font-black">#{order.order_number}</Link>
                <p className="text-sm text-slate-500">{order.source.toUpperCase()} · {order.customer_name || "Cliente"}</p>
                <p className="mt-2 font-bold">{money(order.total)}</p>
                <form action={updateOrderStatus} className="mt-3">
                  <input type="hidden" name="id" value={order.id} />
                  <select name="status" className="field-light text-xs" defaultValue={order.status}>
                    {statuses.map((item) => <option key={item} value={item}>{statusLabel[item]}</option>)}
                  </select>
                  <button className="btn-muted mt-2 w-full text-xs">Alterar</button>
                </form>
              </div>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}

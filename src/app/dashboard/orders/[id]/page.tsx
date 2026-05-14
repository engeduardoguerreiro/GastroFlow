import { updateOrderStatus } from "@/app/actions";
import { requireRestaurant } from "@/lib/auth";
import { money, statusLabel } from "@/lib/utils";
import { StatusBadge } from "@/components/status-badge";
import type { Order, OrderItem, OrderStatus } from "@/lib/types";

const flow: OrderStatus[] = ["accepted", "preparing", "ready", "out_for_delivery", "completed", "canceled"];

export default async function OrderDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const { supabase, restaurant } = await requireRestaurant();
  const [{ data: order }, { data: items }] = await Promise.all([
    supabase.from("orders").select("*").eq("restaurant_id", restaurant.id).eq("id", id).single(),
    supabase.from("order_items").select("*").eq("restaurant_id", restaurant.id).eq("order_id", id),
  ]);
  const current = order as Order;
  return (
    <div className="grid gap-6 xl:grid-cols-[1fr_360px]">
      <section className="rounded-2xl bg-white p-5 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="text-2xl font-black">Pedido #{current.order_number}</h2>
            <p className="text-slate-500">{current.source.toUpperCase()} · {current.type}</p>
          </div>
          <StatusBadge status={current.status} />
        </div>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <div className="rounded-xl bg-slate-50 p-4"><strong>Cliente</strong><p>{current.customer_name}</p><p>{current.customer_phone}</p></div>
          <div className="rounded-xl bg-slate-50 p-4"><strong>Entrega</strong><p>{current.delivery_address || "Retirada/balcão/mesa"}</p></div>
          <div className="rounded-xl bg-slate-50 p-4"><strong>Pagamento</strong><p>{current.payment_method} · {current.payment_status}</p></div>
          <div className="rounded-xl bg-slate-50 p-4"><strong>Observações</strong><p>{current.notes || "Sem observações"}</p></div>
        </div>
        <h3 className="mt-6 font-black">Itens</h3>
        <div className="mt-3 space-y-3">
          {((items ?? []) as OrderItem[]).map((item) => (
            <div key={item.id} className="flex justify-between rounded-xl border border-slate-100 p-4">
              <span>{item.quantity}x {item.product_name}</span>
              <strong>{money(item.total_price)}</strong>
            </div>
          ))}
        </div>
      </section>
      <aside className="rounded-2xl bg-white p-5 shadow-sm">
        <h3 className="font-black">Ações</h3>
        <div className="mt-4 space-y-2">
          {flow.map((status) => (
            <form key={status} action={updateOrderStatus}>
              <input type="hidden" name="id" value={current.id} />
              <input type="hidden" name="status" value={status} />
              <button className="btn-muted w-full text-sm">{statusLabel[status]}</button>
            </form>
          ))}
        </div>
        <div className="mt-6 rounded-xl bg-slate-50 p-4">
          <div className="flex justify-between"><span>Subtotal</span><strong>{money(current.subtotal)}</strong></div>
          <div className="flex justify-between"><span>Entrega</span><strong>{money(current.delivery_fee)}</strong></div>
          <div className="flex justify-between"><span>Desconto</span><strong>{money(current.discount)}</strong></div>
          <div className="mt-3 flex justify-between border-t pt-3 text-lg"><span>Total</span><strong>{money(current.total)}</strong></div>
        </div>
      </aside>
    </div>
  );
}

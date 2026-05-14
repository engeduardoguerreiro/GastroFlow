import { createPdvOrder } from "@/app/actions";
import { CartBuilder } from "@/components/cart-builder";
import { requireRestaurant } from "@/lib/auth";
import type { Product } from "@/lib/types";

export default async function PdvPage() {
  const { supabase, restaurant } = await requireRestaurant();
  const { data } = await supabase.from("products").select("*").eq("restaurant_id", restaurant.id).eq("active", true).order("name");
  return (
    <form action={createPdvOrder} className="space-y-5">
      <section className="rounded-2xl bg-white p-5 shadow-sm">
        <h2 className="text-xl font-black">PDV / Balcão</h2>
        <div className="mt-4 grid gap-3 md:grid-cols-5">
          <input className="field-light" name="customer_name" placeholder="Cliente" />
          <select className="field-light" name="type" defaultValue="pickup"><option value="pickup">Balcão/retirada</option><option value="delivery">Entrega</option><option value="dine_in">Mesa</option></select>
          <select className="field-light" name="payment_method" defaultValue="pix"><option value="cash">Dinheiro</option><option value="credit_card">Crédito</option><option value="debit_card">Débito</option><option value="pix">Pix</option><option value="other">Outro</option></select>
          <input className="field-light" name="discount" type="number" step="0.01" placeholder="Desconto" />
          <input className="field-light" name="delivery_fee" type="number" step="0.01" placeholder="Taxa entrega" />
        </div>
      </section>
      <CartBuilder products={(data ?? []) as Product[]} submitLabel="Finalizar pedido" />
    </form>
  );
}

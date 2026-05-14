import { createPdvOrder } from "@/app/actions";
import { CartBuilder } from "@/components/cart-builder";
import { requireRestaurant } from "@/lib/auth";
import type { Product } from "@/lib/types";

export default async function DeliveryPage() {
  const { supabase, restaurant } = await requireRestaurant();
  const { data } = await supabase.from("products").select("*").eq("restaurant_id", restaurant.id).eq("active", true);
  return (
    <form action={createPdvOrder} className="space-y-5">
      <input type="hidden" name="type" value="delivery" />
      <section className="rounded-2xl bg-white p-5 shadow-sm">
        <h2 className="text-xl font-black">Delivery manual</h2>
        <div className="mt-4 grid gap-3 md:grid-cols-4">
          <input className="field-light" name="customer_name" placeholder="Cliente" required />
          <input className="field-light" name="customer_phone" placeholder="Telefone" />
          <input className="field-light" name="delivery_fee" type="number" step="0.01" placeholder="Taxa" />
          <select className="field-light" name="payment_method"><option value="pix">Pix</option><option value="cash">Dinheiro</option><option value="credit_card">Cartão</option></select>
          <input className="field-light md:col-span-4" name="delivery_address" placeholder="Endereço completo" />
        </div>
      </section>
      <CartBuilder products={(data ?? []) as Product[]} submitLabel="Criar entrega" />
    </form>
  );
}

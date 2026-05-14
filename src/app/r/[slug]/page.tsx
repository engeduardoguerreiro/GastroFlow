import { createOnlineOrder } from "@/app/actions";
import { CartBuilder } from "@/components/cart-builder";
import { BrandLogo } from "@/components/brand-logo";
import { createClient } from "@/lib/supabase/server";
import type { Category, Product, Restaurant } from "@/lib/types";

export default async function RestaurantMenuPage({ params, searchParams }: { params: Promise<{ slug: string }>; searchParams?: Promise<{ success?: string }> }) {
  const { slug } = await params;
  const sp = searchParams ? await searchParams : {};
  const supabase = await createClient();
  const { data: restaurant } = await supabase.from("restaurants").select("*").eq("slug", slug).maybeSingle();
  const current = restaurant as Restaurant | null;
  if (!current) return <main className="grid min-h-screen place-items-center px-5"><div className="glass rounded-2xl p-8">Restaurante não encontrado.</div></main>;
  const [{ data: categories }, { data: products }] = await Promise.all([
    supabase.from("categories").select("*").eq("restaurant_id", current.id).eq("active", true).order("display_order"),
    supabase.from("products").select("*").eq("restaurant_id", current.id).eq("active", true).order("name"),
  ]);
  return (
    <main className="min-h-screen bg-[#FFF6E9] text-[#0F1720]">
      <section className="relative bg-[#0F1720] text-white">
        <div className="absolute inset-0 opacity-30" style={{ backgroundImage: current.cover_url ? `url(${current.cover_url})` : "linear-gradient(135deg,#E26A2C,#0F1720)", backgroundSize: "cover", backgroundPosition: "center" }} />
        <div className="relative mx-auto max-w-6xl px-5 py-12">
          <BrandLogo className="mb-8 h-20 w-auto" priority />
          <div className="flex flex-wrap items-center gap-4">
            <div className="grid h-20 w-20 place-items-center rounded-2xl bg-[#FFF6E9] text-2xl font-black text-[#E26A2C]">{current.logo_url ? "Logo" : current.name.slice(0, 2)}</div>
            <div>
              <h1 className="text-4xl font-black">{current.name}</h1>
              <p className="font-secondary mt-2 max-w-2xl text-slate-200">{current.description}</p>
              <span className={current.is_open ? "mt-3 inline-flex rounded-full bg-emerald-500 px-3 py-1 text-sm font-bold" : "mt-3 inline-flex rounded-full bg-red-500 px-3 py-1 text-sm font-bold"}>{current.is_open ? "Aberto" : "Fechado"}</span>
            </div>
          </div>
        </div>
      </section>
      <form action={createOnlineOrder} className="mx-auto max-w-6xl space-y-5 px-5 py-8">
        <input type="hidden" name="restaurant_id" value={current.id} />
        <input type="hidden" name="slug" value={current.slug} />
        {sp.success && <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-4 font-bold text-emerald-700">Pedido enviado com sucesso.</div>}
        <section className="rounded-2xl bg-white p-5 shadow-sm">
          <h2 className="text-xl font-black">Seus dados</h2>
          <div className="mt-4 grid gap-3 md:grid-cols-3">
            <input className="field-light" name="customer_name" placeholder="Nome" required />
            <input className="field-light" name="customer_phone" placeholder="Telefone" required />
            <select className="field-light" name="type" defaultValue="delivery"><option value="delivery">Entrega</option><option value="pickup">Retirada</option></select>
            <input className="field-light md:col-span-2" name="delivery_address" placeholder="Endereço" />
            <textarea className="field-light" name="notes" placeholder="Observações" />
          </div>
        </section>
        <div className="flex flex-wrap gap-2">
          {((categories ?? []) as Category[]).map((category) => <span key={category.id} className="rounded-full bg-white px-4 py-2 text-sm font-bold shadow-sm">{category.name}</span>)}
        </div>
        <CartBuilder products={(products ?? []) as Product[]} submitLabel="Enviar pedido" />
      </form>
    </main>
  );
}

import Link from "next/link";
import { requireRestaurant } from "@/lib/auth";

export default async function OnlineMenuPage() {
  const { restaurant } = await requireRestaurant();
  const url = `/r/${restaurant.slug}`;
  return (
    <section className="rounded-2xl bg-white p-6 shadow-sm">
      <h2 className="text-2xl font-black">Site/Cardápio Online</h2>
      <p className="mt-2 text-slate-500">Compartilhe este link com seus clientes para receber pedidos direto no painel.</p>
      <div className="mt-6 rounded-2xl border border-dashed border-[#E26A2C] bg-[#E26A2C]/10 p-5">
        <p className="font-secondary text-lg font-black text-[#E26A2C]">{url}</p>
      </div>
      <Link href={url} className="btn-primary mt-6">Abrir cardápio</Link>
    </section>
  );
}

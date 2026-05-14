import { requireRestaurant } from "@/lib/auth";
import type { Table } from "@/lib/types";

export default async function TablesPage() {
  const { supabase, restaurant } = await requireRestaurant();
  const { data } = await supabase.from("tables").select("*").eq("restaurant_id", restaurant.id).order("number");
  const tables = (data ?? []) as Table[];
  return (
    <section className="rounded-2xl bg-white p-5 shadow-sm">
      <h2 className="text-xl font-black">Mesas e comandas</h2>
      <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {tables.map((table) => (
          <div key={table.id} className="rounded-2xl border border-slate-100 p-5">
            <p className="text-3xl font-black">Mesa {table.number}</p>
            <p className="mt-1 text-slate-500">{table.name}</p>
            <span className="mt-4 inline-flex rounded-full bg-slate-100 px-3 py-1 text-sm font-bold">{table.status}</span>
            <button className="btn-primary mt-5 w-full">Abrir comanda</button>
          </div>
        ))}
        {!tables.length && <p className="text-slate-500">Crie mesas no SQL inicial ou evolua este módulo para cadastro direto.</p>}
      </div>
    </section>
  );
}

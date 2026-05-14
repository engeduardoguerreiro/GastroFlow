import { requireRestaurant } from "@/lib/auth";
import type { Customer } from "@/lib/types";

export default async function CustomersPage() {
  const { supabase, restaurant } = await requireRestaurant();
  const { data } = await supabase.from("customers").select("*").eq("restaurant_id", restaurant.id).order("created_at", { ascending: false });
  const customers = (data ?? []) as Customer[];
  return (
    <section className="rounded-2xl bg-white p-5 shadow-sm">
      <h2 className="text-xl font-black">Clientes</h2>
      <div className="mt-5 overflow-x-auto">
        <table className="w-full min-w-[700px] text-left text-sm">
          <thead className="text-slate-500"><tr><th className="p-3">Nome</th><th>Telefone</th><th>Email</th><th>Cidade</th><th>Observações</th></tr></thead>
          <tbody>{customers.map((customer) => <tr key={customer.id} className="border-t border-slate-100"><td className="p-3 font-bold">{customer.name}</td><td>{customer.phone}</td><td>{customer.email}</td><td>{customer.city}</td><td>{customer.notes}</td></tr>)}</tbody>
        </table>
      </div>
    </section>
  );
}

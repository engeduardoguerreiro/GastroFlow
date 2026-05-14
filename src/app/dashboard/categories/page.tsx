import { saveCategory, toggleCategory } from "@/app/actions";
import { requireRestaurant } from "@/lib/auth";
import type { Category } from "@/lib/types";

export default async function CategoriesPage() {
  const { supabase, restaurant } = await requireRestaurant();
  const { data } = await supabase.from("categories").select("*").eq("restaurant_id", restaurant.id).order("display_order");
  const categories = (data ?? []) as Category[];
  return (
    <div className="grid gap-6 xl:grid-cols-[420px_1fr]">
      <form action={saveCategory} className="rounded-2xl bg-white p-5 shadow-sm">
        <h2 className="text-xl font-black">Nova categoria</h2>
        <div className="mt-4 space-y-3">
          <input className="field-light" name="name" placeholder="Nome" required />
          <textarea className="field-light" name="description" placeholder="Descrição" />
          <input className="field-light" name="display_order" type="number" placeholder="Ordem" defaultValue={categories.length + 1} />
          <label className="flex items-center gap-2 text-sm font-bold"><input name="active" type="checkbox" defaultChecked /> Ativa</label>
          <button className="btn-primary w-full">Salvar categoria</button>
        </div>
      </form>
      <section className="rounded-2xl bg-white p-5 shadow-sm">
        <h2 className="text-xl font-black">Categorias</h2>
        <div className="mt-4 space-y-3">
          {categories.map((category) => (
            <div key={category.id} className="grid gap-3 rounded-xl border border-slate-100 p-4 md:grid-cols-[1fr_auto]">
              <form action={saveCategory} className="grid gap-3 md:grid-cols-4">
                <input type="hidden" name="id" value={category.id} />
                <input className="field-light md:col-span-1" name="name" defaultValue={category.name} />
                <input className="field-light md:col-span-2" name="description" defaultValue={category.description ?? ""} />
                <input className="field-light" name="display_order" type="number" defaultValue={category.display_order} />
                <label className="flex items-center gap-2 text-sm font-bold"><input name="active" type="checkbox" defaultChecked={category.active} /> Ativa</label>
                <button className="btn-muted text-sm md:col-span-3">Atualizar</button>
              </form>
              <form action={toggleCategory}>
                <input type="hidden" name="id" value={category.id} />
                <input type="hidden" name="active" value={String(!category.active)} />
                <button className="btn-muted text-sm">{category.active ? "Desativar" : "Ativar"}</button>
              </form>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

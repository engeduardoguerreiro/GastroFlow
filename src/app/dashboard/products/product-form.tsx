import { saveProduct } from "@/app/actions";
import type { Category, Product } from "@/lib/types";

export function ProductForm({ categories, product }: { categories: Category[]; product?: Product }) {
  return (
    <form action={saveProduct} className="rounded-2xl bg-white p-5 shadow-sm">
      <input type="hidden" name="id" value={product?.id ?? ""} />
      <h2 className="text-xl font-black">{product ? "Editar produto" : "Novo produto"}</h2>
      <div className="mt-5 grid gap-4 md:grid-cols-2">
        <input className="field-light" name="name" placeholder="Nome" defaultValue={product?.name ?? ""} required />
        <select className="field-light" name="category_id" defaultValue={product?.category_id ?? ""}>
          <option value="">Sem categoria</option>
          {categories.map((category) => <option key={category.id} value={category.id}>{category.name}</option>)}
        </select>
        <textarea className="field-light md:col-span-2" name="description" placeholder="Descrição" defaultValue={product?.description ?? ""} />
        <input className="field-light" name="price" type="number" step="0.01" placeholder="Preço" defaultValue={product?.price ?? ""} required />
        <input className="field-light" name="preparation_time" type="number" placeholder="Tempo preparo min" defaultValue={product?.preparation_time ?? 15} />
        <input className="field-light md:col-span-2" name="image_url" placeholder="URL da imagem" defaultValue={product?.image_url ?? ""} />
        <label className="flex items-center gap-2 text-sm font-bold"><input name="active" type="checkbox" defaultChecked={product?.active ?? true} /> Produto ativo</label>
        <label className="flex items-center gap-2 text-sm font-bold"><input name="stock_control_enabled" type="checkbox" defaultChecked={product?.stock_control_enabled ?? false} /> Controlar estoque</label>
        <input className="field-light" name="stock_quantity" type="number" placeholder="Quantidade em estoque" defaultValue={product?.stock_quantity ?? 0} />
      </div>
      <div className="mt-6 rounded-2xl border border-dashed border-slate-300 p-4">
        <h3 className="font-black">Complementos/opções</h3>
        <p className="mt-1 text-sm text-slate-500">A estrutura do banco já suporta grupos como Tamanho, Borda e Adicionais. Nesta versão MVP, cadastre os grupos pela tabela product_options ou evolua este bloco para edição inline.</p>
      </div>
      <button className="btn-primary mt-6">Salvar produto</button>
    </form>
  );
}

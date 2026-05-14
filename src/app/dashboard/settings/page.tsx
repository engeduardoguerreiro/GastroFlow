import { updateRestaurant } from "@/app/actions";
import { requireRestaurant } from "@/lib/auth";

export default async function SettingsPage() {
  const { restaurant } = await requireRestaurant();
  return (
    <form action={updateRestaurant} className="rounded-2xl bg-white p-5 shadow-sm">
      <h2 className="text-xl font-black">Configurações do restaurante</h2>
      <div className="mt-5 grid gap-4 md:grid-cols-2">
        <input className="field-light" name="name" defaultValue={restaurant.name} placeholder="Nome" />
        <input className="field-light" name="slug" defaultValue={restaurant.slug} placeholder="Slug" />
        <textarea className="field-light md:col-span-2" name="description" defaultValue={restaurant.description ?? ""} placeholder="Descrição" />
        <input className="field-light" name="logo_url" defaultValue={restaurant.logo_url ?? ""} placeholder="Logo URL" />
        <input className="field-light" name="cover_url" defaultValue={restaurant.cover_url ?? ""} placeholder="Capa URL" />
        <input className="field-light" name="whatsapp" defaultValue={restaurant.whatsapp ?? ""} placeholder="WhatsApp" />
        <input className="field-light" name="address" defaultValue={restaurant.address ?? ""} placeholder="Endereço" />
        <input className="field-light" name="city" defaultValue={restaurant.city ?? ""} placeholder="Cidade" />
        <input className="field-light" name="state" defaultValue={restaurant.state ?? ""} placeholder="Estado" />
      </div>
      <div className="mt-5 grid gap-3 md:grid-cols-4">
        <label className="font-bold"><input name="is_open" type="checkbox" defaultChecked={restaurant.is_open} /> Loja aberta</label>
        <label className="font-bold"><input name="delivery_enabled" type="checkbox" defaultChecked={restaurant.delivery_enabled} /> Delivery</label>
        <label className="font-bold"><input name="pickup_enabled" type="checkbox" defaultChecked={restaurant.pickup_enabled} /> Retirada</label>
        <label className="font-bold"><input name="table_service_enabled" type="checkbox" defaultChecked={restaurant.table_service_enabled} /> Mesas</label>
      </div>
      <button className="btn-primary mt-6">Salvar configurações</button>
    </form>
  );
}

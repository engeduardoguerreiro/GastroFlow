import { updateRestaurant } from "@/app/actions";
import { requireRestaurant } from "@/lib/auth";

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="space-y-1">
      <span className="font-secondary text-[11px] font-bold text-slate-500">{label}</span>
      {children}
    </label>
  );
}

function ConfigSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="rounded border border-slate-200 bg-[#e9e9e9] p-5 shadow-sm">
      <h2 className="mb-4 text-sm font-bold text-slate-600">{title}</h2>
      {children}
    </section>
  );
}

export default async function SettingsPage() {
  const { restaurant } = await requireRestaurant();
  return (
    <form action={updateRestaurant} className="space-y-6">
      <ConfigSection title="Dados gerais da empresa">
        <div className="grid gap-4 lg:grid-cols-4">
          <Field label="Nome fantasia">
            <input className="field-light h-9 rounded-none py-1 text-sm" name="name" defaultValue={restaurant.name} />
          </Field>
          <Field label="Razão social">
            <input className="field-light h-9 rounded-none py-1 text-sm" name="legal_name" placeholder="Razão social" />
          </Field>
          <Field label="Slug do cardápio">
            <input className="field-light h-9 rounded-none py-1 text-sm" name="slug" defaultValue={restaurant.slug} />
          </Field>
          <Field label="E-mail principal">
            <input className="field-light h-9 rounded-none py-1 text-sm" name="email" defaultValue={restaurant.email ?? ""} />
          </Field>
          <Field label="Telefone">
            <input className="field-light h-9 rounded-none py-1 text-sm" name="phone" defaultValue={restaurant.phone ?? ""} />
          </Field>
          <Field label="WhatsApp">
            <input className="field-light h-9 rounded-none py-1 text-sm" name="whatsapp" defaultValue={restaurant.whatsapp ?? ""} />
          </Field>
          <Field label="CNPJ">
            <input className="field-light h-9 rounded-none py-1 text-sm" name="cnpj" placeholder="00.000.000/0000-00" />
          </Field>
          <Field label="Inscrição estadual">
            <input className="field-light h-9 rounded-none py-1 text-sm" name="state_registration" />
          </Field>
          <Field label="Endereço">
            <input className="field-light h-9 rounded-none py-1 text-sm" name="address" defaultValue={restaurant.address ?? ""} />
          </Field>
          <Field label="Cidade">
            <input className="field-light h-9 rounded-none py-1 text-sm" name="city" defaultValue={restaurant.city ?? ""} />
          </Field>
          <Field label="UF">
            <input className="field-light h-9 rounded-none py-1 text-sm" name="state" defaultValue={restaurant.state ?? ""} />
          </Field>
          <Field label="CEP">
            <input className="field-light h-9 rounded-none py-1 text-sm" name="zip_code" defaultValue={restaurant.zip_code ?? ""} />
          </Field>
        </div>
        <button className="mt-4 w-full rounded bg-[#12c987] px-4 py-2 text-sm font-bold text-white">Salvar</button>
      </ConfigSection>

      <ConfigSection title="Dados fiscais">
        <div className="grid gap-4 lg:grid-cols-4">
          <Field label="Regime tributário">
            <select className="field-light h-9 rounded-none py-1 text-sm" name="tax_regime" defaultValue="simples">
              <option value="simples">Simples Nacional</option>
              <option value="presumido">Lucro Presumido</option>
              <option value="real">Lucro Real</option>
            </select>
          </Field>
          <Field label="CNAE">
            <input className="field-light h-9 rounded-none py-1 text-sm" name="cnae" />
          </Field>
          <Field label="Série da nota">
            <input className="field-light h-9 rounded-none py-1 text-sm" name="invoice_series" />
          </Field>
          <Field label="Próximo número">
            <input className="field-light h-9 rounded-none py-1 text-sm" name="next_invoice_number" defaultValue="1" />
          </Field>
        </div>
        <button className="mt-4 w-full rounded bg-[#12c987] px-4 py-2 text-sm font-bold text-white">Salvar</button>
      </ConfigSection>

      <ConfigSection title="Dados para impressão e cardápio online">
        <div className="grid gap-4 lg:grid-cols-[1fr_2fr]">
          <Field label="Logomarca">
            <input className="field-light h-9 rounded-none py-1 text-sm" name="logo_url" defaultValue={restaurant.logo_url ?? ""} placeholder="URL da logo" />
          </Field>
          <Field label="Capa do cardápio">
            <input className="field-light h-9 rounded-none py-1 text-sm" name="cover_url" defaultValue={restaurant.cover_url ?? ""} placeholder="URL da capa" />
          </Field>
          <Field label="Descrição">
            <textarea className="field-light min-h-24 rounded-none py-2 text-sm lg:col-span-2" name="description" defaultValue={restaurant.description ?? ""} />
          </Field>
        </div>
        <div className="mt-4 grid gap-3 md:grid-cols-4">
          <label className="font-secondary text-sm"><input name="is_open" type="checkbox" defaultChecked={restaurant.is_open} /> Loja aberta</label>
          <label className="font-secondary text-sm"><input name="delivery_enabled" type="checkbox" defaultChecked={restaurant.delivery_enabled} /> Delivery</label>
          <label className="font-secondary text-sm"><input name="pickup_enabled" type="checkbox" defaultChecked={restaurant.pickup_enabled} /> Retirada</label>
          <label className="font-secondary text-sm"><input name="table_service_enabled" type="checkbox" defaultChecked={restaurant.table_service_enabled} /> Atendimento em mesa</label>
        </div>
        <button className="mt-4 w-full rounded bg-[#12c987] px-4 py-2 text-sm font-bold text-white">Salvar</button>
      </ConfigSection>

      <ConfigSection title="Configuração SMTP">
        <div className="grid gap-4 lg:grid-cols-4">
          <Field label="Servidor SMTP">
            <input className="field-light h-9 rounded-none py-1 text-sm" name="smtp_host" placeholder="smtp.exemplo.com" />
          </Field>
          <Field label="Porta">
            <input className="field-light h-9 rounded-none py-1 text-sm" name="smtp_port" placeholder="587" />
          </Field>
          <Field label="Usuário">
            <input className="field-light h-9 rounded-none py-1 text-sm" name="smtp_user" />
          </Field>
          <Field label="Senha">
            <input className="field-light h-9 rounded-none py-1 text-sm" name="smtp_password" type="password" />
          </Field>
        </div>
        <button className="mt-4 w-full rounded bg-[#12c987] px-4 py-2 text-sm font-bold text-white">Salvar SMTP/Email</button>
      </ConfigSection>

      <ConfigSection title="Bancos legais">
        <div className="grid gap-4 lg:grid-cols-4">
          {["Banco", "Agência", "Conta", "Chave Pix"].map((label) => (
            <Field key={label} label={label}>
              <input className="field-light h-9 rounded-none py-1 text-sm" name={label.toLowerCase().replace(" ", "_")} />
            </Field>
          ))}
        </div>
        <button className="mt-4 w-full rounded bg-[#12c987] px-4 py-2 text-sm font-bold text-white">Salvar</button>
      </ConfigSection>
    </form>
  );
}

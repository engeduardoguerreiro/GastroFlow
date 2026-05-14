import Link from "next/link";
import { ArrowRight, BadgeCheck, ClipboardList, CreditCard, Globe2, Martini, Pizza, Plug, QrCode, Smartphone, Store, Truck, type LucideIcon } from "lucide-react";
import { BrandLogo } from "@/components/brand-logo";

const highlights: Array<[string, LucideIcon]> = [
  ["Pedidos centralizados", ClipboardList],
  ["Cardápio digital", QrCode],
  ["Site próprio para delivery", Globe2],
  ["PDV simples", CreditCard],
  ["Mesas e comandas", Store],
  ["Integração futura com iFood, 99Food, Keeta e outros", Plug],
];

const plans: Array<[string, string, string[]]> = [
  ["Básico", "R$ 49,90", ["Cardápio digital", "Pedidos manuais", "Site próprio", "Clientes"]],
  ["Profissional", "R$ 89,90", ["Tudo do Básico", "PDV", "Mesas/comandas", "Delivery", "Caixa", "Relatórios básicos"]],
  ["Premium", "R$ 149,90", ["Tudo do Profissional", "Integrações com marketplaces", "Webhooks", "Múltiplos usuários", "Suporte prioritário"]],
];

export default function LandingPage() {
  return (
    <main className="min-h-screen">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-5">
        <Link href="/" className="flex items-center gap-3">
          <BrandLogo className="h-20 w-auto" priority />
        </Link>
        <div className="flex gap-2">
          <Link href="/login" className="btn-muted">Entrar</Link>
          <Link href="/register" className="btn-primary">Começar agora</Link>
        </div>
      </nav>

      <section className="mx-auto grid max-w-7xl items-center gap-10 px-5 py-16 lg:grid-cols-[1.05fr_0.95fr] lg:py-24">
        <div>
          <p className="brand-kicker mb-4 inline-flex rounded-full border border-[#E26A2C]/30 bg-[#E26A2C]/10 px-4 py-2">
            Built for restaurants. Designed to flow.
          </p>
          <h1 className="max-w-4xl text-4xl font-black leading-tight md:text-6xl">
            Operações mais inteligentes. Clientes mais satisfeitos.
          </h1>
          <p className="font-secondary mt-6 max-w-2xl text-lg text-slate-300">
            Software de gestão para restaurantes com pedidos centralizados, cardápio digital, PDV, mesas, delivery e integrações preparadas para marketplaces.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/register" className="btn-primary">Começar agora <ArrowRight className="h-4 w-4" /></Link>
            <Link href="/dashboard" className="btn-muted">Ver demonstração</Link>
          </div>
        </div>
        <div className="glass rounded-[2rem] p-5">
          <div className="rounded-[1.5rem] bg-[#FFF6E9] p-5 text-[#0F1720]">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-bold text-slate-500">Hoje</p>
                <h2 className="text-2xl font-black">Operação ao vivo</h2>
              </div>
              <span className="rounded-full bg-[#22C55E]/15 px-3 py-1 text-sm font-bold text-[#148A42]">Aberto</span>
            </div>
            <div className="mt-5 grid grid-cols-2 gap-3">
              {["42 pedidos", "R$ 3.840", "12 em preparo", "89 produtos"].map((item) => (
                <div key={item} className="rounded-2xl bg-white p-4 font-black shadow-sm">{item}</div>
              ))}
            </div>
            <div className="mt-5 space-y-3">
              {["#1024 Site - Pizza grande", "#1025 PDV - Smash burger", "#1026 iFood - Combo almoço"].map((item) => (
                <div key={item} className="flex items-center justify-between rounded-2xl border border-slate-200 p-4">
                  <span className="font-bold">{item}</span>
                  <Smartphone className="h-5 w-5 text-[#E26A2C]" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#FFF6E9] py-16 text-[#0F1720]">
        <div className="mx-auto max-w-7xl px-5">
          <div className="grid gap-4 md:grid-cols-3">
            {highlights.map(([label, Icon]) => (
              <div key={label} className="rounded-2xl border border-[#0F1720]/10 bg-white/70 p-5 shadow-sm">
                <Icon className="mb-4 h-7 w-7 text-[#E26A2C]" />
                <h3 className="font-black">{label}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-16">
        <h2 className="text-3xl font-black">Planos simples para começar</h2>
        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {plans.map(([name, price, features]) => (
            <div key={name} className="glass rounded-2xl p-6">
              <h3 className="text-xl font-black">{name}</h3>
              <p className="mt-3 text-3xl font-black text-[#F5B342]">{price}<span className="text-sm text-slate-300">/mês</span></p>
              <ul className="mt-6 space-y-3 text-sm text-slate-200">
                {features.map((feature) => <li key={feature} className="flex gap-2"><BadgeCheck className="h-5 w-5 text-emerald-400" />{feature}</li>)}
              </ul>
              <Link href="/register" className="btn-primary mt-6 w-full">Assinar</Link>
            </div>
          ))}
        </div>
      </section>
      <footer className="border-t border-white/10 bg-[#0F1720]">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-5 py-6 text-sm text-slate-300">
          <BrandLogo className="h-16 w-auto" />
          <div className="font-secondary flex flex-wrap gap-6 uppercase tracking-[0.2em]">
            <span className="flex items-center gap-2"><Pizza className="h-4 w-4 text-[#E26A2C]" /> Pizzarias</span>
            <span className="flex items-center gap-2"><Martini className="h-4 w-4 text-[#F5B342]" /> Bares</span>
            <span className="flex items-center gap-2"><Store className="h-4 w-4 text-[#E26A2C]" /> Restaurantes</span>
            <span className="flex items-center gap-2"><Truck className="h-4 w-4 text-[#22C55E]" /> Deliveries</span>
          </div>
        </div>
      </footer>
    </main>
  );
}

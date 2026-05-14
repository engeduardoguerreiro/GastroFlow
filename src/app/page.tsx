import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  BarChart3,
  BellRing,
  ClipboardList,
  CreditCard,
  Crown,
  Gauge,
  Globe2,
  Martini,
  Pizza,
  Plug,
  QrCode,
  ShieldCheck,
  Sparkles,
  Store,
  Truck,
  type LucideIcon,
} from "lucide-react";
import { BrandLogo } from "@/components/brand-logo";

const modules: Array<[string, string, LucideIcon]> = [
  ["Pedidos centralizados", "PDV, site, delivery e marketplaces em uma fila operacional.", ClipboardList],
  ["Cardápio digital", "Produtos, categorias, complementos e disponibilidade em tempo real.", QrCode],
  ["Site próprio", "Uma vitrine de pedidos online para cada restaurante.", Globe2],
  ["PDV e caixa", "Venda rápida, pagamentos, descontos e controle de movimentações.", CreditCard],
  ["Mesas e comandas", "Grid visual para salão, consumo por mesa e fechamento de conta.", Store],
  ["Integrações", "Arquitetura pronta para iFood, 99Food, Keeta, Rappi e webhooks.", Plug],
];

const metrics = [
  ["128", "pedidos hoje", "+18% vs ontem"],
  ["R$ 8.640", "faturamento", "+22% vs ontem"],
  ["24", "pedidos ativos", "em produção"],
  ["28m", "tempo médio", "-5m vs ontem"],
];

const plans: Array<[string, string, string, string[]]> = [
  ["Básico", "R$ 49,90", "Para começar com cardápio digital e pedidos manuais.", ["Cardápio digital", "Pedidos manuais", "Site próprio", "Clientes"]],
  ["Profissional", "R$ 89,90", "Para operar salão, balcão e delivery com controle diário.", ["Tudo do Básico", "PDV", "Mesas/comandas", "Delivery", "Caixa", "Relatórios básicos"]],
  ["Premium", "R$ 149,90", "Para marcas que querem escalar canais e automações.", ["Tudo do Profissional", "Integrações com marketplaces", "Webhooks", "Múltiplos usuários", "Suporte prioritário"]],
];

export default function LandingPage() {
  return (
    <main className="min-h-screen overflow-hidden">
      <header className="sticky top-0 z-30 border-b border-white/10 bg-[#0F1720]/82 backdrop-blur-xl">
        <nav className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-3">
          <Link href="/" aria-label="GastroFlow">
            <BrandLogo className="h-9 w-auto" priority />
          </Link>
          <div className="font-secondary hidden items-center gap-7 text-sm font-semibold text-slate-300 lg:flex">
            <a href="#plataforma" className="hover:text-[#F5B342]">Plataforma</a>
            <a href="#operacao" className="hover:text-[#F5B342]">Operação</a>
            <a href="#planos" className="hover:text-[#F5B342]">Planos</a>
            <a href="#seguranca" className="hover:text-[#F5B342]">Segurança</a>
          </div>
          <div className="flex gap-2">
            <Link href="/login" className="btn-muted px-4 py-2 text-sm">Entrar</Link>
            <Link href="/register" className="btn-primary px-4 py-2 text-sm">Começar</Link>
          </div>
        </nav>
      </header>

      <section className="relative mx-auto grid max-w-7xl items-center gap-12 px-5 pb-20 pt-16 lg:grid-cols-[1.02fr_0.98fr] lg:pb-28 lg:pt-24">
        <div className="relative z-10">
          <p className="brand-kicker mb-5 inline-flex rounded-full border border-[#E26A2C]/30 bg-[#E26A2C]/10 px-4 py-2">
            Software de gestão para restaurantes
          </p>
          <h1 className="max-w-5xl text-4xl font-black leading-[1.03] tracking-tight text-[#FFF6E9] md:text-6xl">
            Operação premium para restaurantes que vendem em múltiplos canais.
          </h1>
          <p className="font-secondary mt-6 max-w-2xl text-lg leading-8 text-slate-300">
            O GastroFlow centraliza pedidos, cardápio, PDV, delivery, mesas, caixa, clientes e integrações em uma experiência rápida, elegante e preparada para crescer.
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
            <Link href="/register" className="btn-primary px-5 py-3">
              Começar agora <ArrowRight className="h-4 w-4" />
            </Link>
            <Link href="#plataforma" className="btn-muted px-5 py-3">
              Ver plataforma
            </Link>
          </div>
          <div className="font-secondary mt-8 flex flex-wrap gap-4 text-sm text-slate-300">
            <span className="flex items-center gap-2"><ShieldCheck className="h-4 w-4 text-[#22C55E]" /> Multiempresa com RLS</span>
            <span className="flex items-center gap-2"><Gauge className="h-4 w-4 text-[#F5B342]" /> Fluxo rápido no balcão</span>
            <span className="flex items-center gap-2"><Sparkles className="h-4 w-4 text-[#E26A2C]" /> Visual SaaS premium</span>
          </div>
        </div>

        <div className="relative">
          <div className="absolute -inset-8 rounded-[2.5rem] bg-[#E26A2C]/14 blur-3xl" />
          <div className="relative rounded-[2rem] border border-white/12 bg-white/[0.06] p-4 shadow-2xl shadow-black/40 backdrop-blur">
            <div className="rounded-[1.45rem] bg-[#FFF6E9] p-5 text-[#0F1720] shadow-xl">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="brand-kicker">Bom dia, Alex</p>
                  <h2 className="mt-1 text-2xl font-black">Bella Italia Pizzeria</h2>
                </div>
                <span className="rounded-full bg-[#22C55E]/15 px-3 py-1 text-sm font-bold text-[#148A42]">Ao vivo</span>
              </div>
              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                {metrics.map(([value, label, delta]) => (
                  <div key={label} className="rounded-2xl border border-[#0F1720]/8 bg-white p-4 shadow-sm">
                    <p className="font-secondary text-xs font-bold uppercase tracking-[0.16em] text-slate-500">{label}</p>
                    <p className="mt-2 text-2xl font-black">{value}</p>
                    <p className="mt-1 text-xs font-bold text-[#22A652]">{delta}</p>
                  </div>
                ))}
              </div>
              <div className="mt-5 grid gap-4 lg:grid-cols-[1fr_0.78fr]">
                <div className="rounded-2xl border border-[#0F1720]/8 bg-white p-4">
                  <div className="mb-4 flex items-center justify-between">
                    <strong>Visão de vendas</strong>
                    <BarChart3 className="h-5 w-5 text-[#E26A2C]" />
                  </div>
                  <div className="flex h-36 items-end gap-2">
                    {[28, 44, 58, 53, 72, 48, 64, 88].map((height, index) => (
                      <span
                        key={index}
                        className="flex-1 rounded-t-lg bg-gradient-to-t from-[#E26A2C] to-[#F5B342]"
                        style={{ height: `${height}%` }}
                      />
                    ))}
                  </div>
                </div>
                <div className="rounded-2xl border border-[#0F1720]/8 bg-white p-4">
                  <strong>Fila de pedidos</strong>
                  <div className="mt-4 space-y-3">
                    {["Site #1024", "PDV #1025", "iFood #1026"].map((item, index) => (
                      <div key={item} className="flex items-center justify-between rounded-xl bg-[#FFF6E9] px-3 py-2 text-sm font-bold">
                        <span>{item}</span>
                        <span className={index === 0 ? "text-[#E26A2C]" : "text-slate-500"}>{index === 0 ? "novo" : "ok"}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="mt-4 flex items-center justify-between rounded-2xl border border-[#22C55E]/20 bg-[#22C55E]/10 p-4">
                <span className="flex items-center gap-2 font-bold text-[#148A42]"><BellRing className="h-5 w-5" /> Tudo sincronizado</span>
                <Link href="/dashboard" className="font-secondary text-sm font-black text-[#0F1720]">Abrir painel</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="plataforma" className="bg-[#FFF6E9] py-20 text-[#0F1720]">
        <div className="mx-auto max-w-7xl px-5">
          <div className="max-w-3xl">
            <p className="brand-kicker">Plataforma completa</p>
            <h2 className="mt-3 text-3xl font-black md:text-5xl">Tudo que a operação precisa, sem espalhar decisões em cinco sistemas.</h2>
          </div>
          <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {modules.map(([title, description, Icon]) => (
              <div key={title} className="rounded-2xl border border-[#0F1720]/10 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
                <Icon className="mb-5 h-8 w-8 text-[#E26A2C]" />
                <h3 className="text-lg font-black">{title}</h3>
                <p className="font-secondary mt-3 text-sm leading-6 text-slate-600">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="operacao" className="mx-auto max-w-7xl px-5 py-20">
        <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <p className="brand-kicker">Operação com fluidez</p>
            <h2 className="mt-3 text-3xl font-black md:text-5xl">Do pedido ao caixa com menos atrito.</h2>
            <p className="font-secondary mt-5 leading-7 text-slate-300">
              Uma navegação direta para quem trabalha sob pressão: pedidos, PDV, delivery, mesas, cardápio e relatórios sempre a poucos cliques.
            </p>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {[
              ["1", "Receba", "Pedidos chegam de balcão, site e integrações."],
              ["2", "Produza", "Status claros para cozinha, retirada e entrega."],
              ["3", "Feche", "Pagamento, caixa e relatório no mesmo fluxo."],
            ].map(([step, title, text]) => (
              <div key={step} className="glass rounded-2xl p-6">
                <span className="grid h-10 w-10 place-items-center rounded-xl bg-[#F5B342] font-black text-[#0F1720]">{step}</span>
                <h3 className="mt-5 text-xl font-black">{title}</h3>
                <p className="font-secondary mt-3 text-sm leading-6 text-slate-300">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="planos" className="bg-[#FFF6E9] py-20 text-[#0F1720]">
        <div className="mx-auto max-w-7xl px-5">
          <div className="flex flex-wrap items-end justify-between gap-5">
            <div>
              <p className="brand-kicker">Planos</p>
              <h2 className="mt-3 text-3xl font-black md:text-5xl">Escolha o nível de operação.</h2>
            </div>
            <p className="font-secondary max-w-xl text-slate-600">Comece pequeno e evolua para integrações, webhooks e múltiplos usuários quando sua operação pedir mais.</p>
          </div>
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {plans.map(([name, price, description, features]) => {
              const premium = name === "Premium";
              return (
                <div key={name} className={premium ? "rounded-2xl border border-[#F5B342]/60 bg-[#0F1720] p-6 text-white shadow-2xl shadow-[#0F1720]/20" : "rounded-2xl border border-[#0F1720]/10 bg-white p-6 shadow-sm"}>
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-black">{name}</h3>
                    {premium && <Crown className="h-5 w-5 text-[#F5B342]" />}
                  </div>
                  <p className={premium ? "font-secondary mt-3 text-sm leading-6 text-slate-300" : "font-secondary mt-3 text-sm leading-6 text-slate-600"}>{description}</p>
                  <p className="mt-6 text-3xl font-black text-[#E26A2C]">{price}<span className={premium ? "text-sm text-slate-300" : "text-sm text-slate-500"}>/mês</span></p>
                  <ul className={premium ? "mt-6 space-y-3 text-sm text-slate-200" : "mt-6 space-y-3 text-sm text-slate-700"}>
                    {features.map((feature) => (
                      <li key={feature} className="flex gap-2"><BadgeCheck className="h-5 w-5 text-[#22C55E]" />{feature}</li>
                    ))}
                  </ul>
                  <Link href="/register" className="btn-primary mt-6 w-full">Assinar</Link>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section id="seguranca" className="mx-auto max-w-7xl px-5 py-16">
        <div className="rounded-[2rem] border border-white/10 bg-white/[0.06] p-6 md:p-8">
          <div className="grid gap-6 md:grid-cols-[1fr_auto] md:items-center">
            <div>
              <p className="brand-kicker">Pronto para evoluir</p>
              <h2 className="mt-3 text-3xl font-black">Multiempresa, Supabase RLS e arquitetura preparada para integrações reais.</h2>
              <p className="font-secondary mt-4 max-w-3xl leading-7 text-slate-300">
                O MVP já nasce com separação por restaurante, permissões por perfil, SQL versionável e providers externos mockados para receber credenciais oficiais no futuro.
              </p>
            </div>
            <Link href="/register" className="btn-primary px-6 py-3">Criar restaurante</Link>
          </div>
        </div>
      </section>

      <footer className="border-t border-white/10 bg-[#0F1720]">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-5 px-5 py-7 text-sm text-slate-300">
          <BrandLogo className="h-9 w-auto" />
          <div className="font-secondary flex flex-wrap gap-6 uppercase tracking-[0.18em]">
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

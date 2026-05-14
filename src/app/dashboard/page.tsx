import Link from "next/link";
import {
  ArrowRightFromLine,
  BarChart3,
  Building2,
  Cake,
  Car,
  FileText,
  Layers3,
  PackageCheck,
  Paperclip,
  PieChart,
  ReceiptText,
  Trophy,
  Wrench,
} from "lucide-react";
import { requireRestaurant } from "@/lib/auth";
import { money } from "@/lib/utils";
import type { Order } from "@/lib/types";

function Panel({ title, icon: Icon, action, children }: { title: string; icon: typeof BarChart3; action?: string; children: React.ReactNode }) {
  return (
    <section className="overflow-hidden rounded border border-slate-200 bg-white shadow-sm">
      <div className="flex items-center justify-between bg-[#537482] px-4 py-3 text-white">
        <h2 className="flex items-center gap-2 text-base font-bold">
          <Icon className="h-5 w-5" />
          {title}
        </h2>
        {action && <span className="font-secondary text-sm font-semibold">{action}</span>}
      </div>
      {children}
    </section>
  );
}

function FinanceCard({ title, total, tone }: { title: string; total: string; tone: "green" | "red" }) {
  const green = tone === "green";
  return (
    <div className={green ? "border-[#22C55E] bg-white" : "border-[#ff4d57] bg-white"}>
      <div className={`relative overflow-hidden rounded border p-4 ${green ? "border-[#22C55E]" : "border-[#ff4d57]"}`}>
        <ArrowRightFromLine className={`absolute right-3 top-3 h-14 w-14 opacity-15 ${green ? "text-[#22C55E]" : "text-[#ff4d57]"}`} />
        <div className="flex items-start gap-3">
          <strong className={`text-3xl ${green ? "text-[#22C55E]" : "text-[#ff4d57]"}`}>0</strong>
          <div className="font-secondary text-sm leading-5 text-slate-600">
            <p>{title}</p>
            <p>Total <span className={green ? "text-[#22C55E]" : "text-[#ff4d57]"}>{total}</span></p>
          </div>
        </div>
      </div>
      <Link href="/dashboard/reports" className={`block rounded-b px-3 py-1 text-center text-xs font-black text-white ${green ? "bg-[#4fc27d]" : "bg-[#f65b62]"}`}>
        Mais detalhes »
      </Link>
    </div>
  );
}

export default async function DashboardPage() {
  const { supabase, restaurant } = await requireRestaurant();
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const [{ data: orders }, { count: productCount }, { count: customerCount }] = await Promise.all([
    supabase.from("orders").select("*").eq("restaurant_id", restaurant.id).gte("created_at", today.toISOString()).order("created_at", { ascending: false }).limit(12),
    supabase.from("products").select("*", { count: "exact", head: true }).eq("restaurant_id", restaurant.id).eq("active", true),
    supabase.from("customers").select("*", { count: "exact", head: true }).eq("restaurant_id", restaurant.id),
  ]);

  const rows = (orders ?? []) as Order[];
  const revenue = rows.filter((o) => o.status === "completed" || o.payment_status === "paid").reduce((sum, o) => sum + Number(o.total), 0);
  const pending = rows.filter((o) => o.status === "pending").length;
  const preparing = rows.filter((o) => o.status === "preparing").length;
  const averageTicket = rows.length ? revenue / rows.length : 0;

  return (
    <div className="space-y-8">
      <div className="grid gap-7 md:grid-cols-2 xl:grid-cols-4">
        <FinanceCard title="Contas a receber hoje" total={money(revenue)} tone="green" />
        <FinanceCard title="Contas a pagar hoje" total={money(0)} tone="red" />
        <FinanceCard title="A receber na semana" total={money(revenue)} tone="green" />
        <FinanceCard title="A pagar na semana" total={money(0)} tone="red" />
      </div>

      <div className="grid gap-8 xl:grid-cols-[1.4fr_1fr]">
        <div className="space-y-8">
          <Panel title="Utilização do Sistema" icon={PackageCheck}>
            <div className="grid gap-5 bg-[#eaffdf] p-6 md:grid-cols-[130px_1fr] md:items-center">
              <div className="grid h-24 w-24 place-items-center rounded-full bg-white text-center text-sm font-black text-[#537482] shadow-inner">
                GastroFlow
              </div>
              <p className="font-secondary text-slate-600">
                Você está usando o painel principal da <strong>GastroFlow</strong>. Acompanhe pedidos, estoque, caixa e integrações sem sair da operação.
              </p>
            </div>
          </Panel>

          <Panel title="Quadro de avisos" icon={FileText}>
            <div className="space-y-3 p-5 font-secondary text-sm text-slate-600">
              <p className="flex items-center gap-2"><Layers3 className="h-5 w-5 text-[#6dc7c8]" /> Há {productCount ?? 0} produtos ativos no cardápio.</p>
              <p className="flex items-center gap-2"><Building2 className="h-5 w-5 text-[#70a7d9]" /> Há {customerCount ?? 0} clientes cadastrados.</p>
              <p className="flex items-center gap-2"><ArrowRightFromLine className="h-5 w-5 text-[#22C55E]" /> Há {pending} pedidos aguardando aceite.</p>
              <p className="flex items-center gap-2"><Car className="h-5 w-5 text-[#70a7d9]" /> Há {preparing} pedidos em preparo.</p>
              <p className="flex items-center gap-2"><Cake className="h-5 w-5 text-[#70a7d9]" /> Configure aniversários e preferências no cadastro de clientes.</p>
            </div>
          </Panel>

          <Panel title="Vendas por mês" icon={BarChart3}>
            <div className="p-6">
              <div className="mb-6 flex justify-center gap-5 text-sm text-slate-500">
                <span className="flex items-center gap-2"><i className="h-3 w-10 rounded bg-[#7ccfd0]" /> Faturamento</span>
                <span className="flex items-center gap-2"><i className="h-3 w-10 rounded bg-[#69b6e9]" /> Quantidade</span>
              </div>
              <div className="flex h-72 items-end gap-4 border-l border-b border-slate-200 px-5">
                {[36, 48, 75, 52, 66, 86, 96].map((height, index) => (
                  <div key={index} className="flex flex-1 flex-col items-center gap-2">
                    <span className="w-full rounded-t bg-[#69b6e9]" style={{ height: `${height * 2}px` }} />
                    <small className="font-secondary text-xs text-slate-400">{String(index + 10).padStart(2, "0")}/26</small>
                  </div>
                ))}
              </div>
            </div>
          </Panel>

          <Panel title="Top produtos faturamento" icon={Trophy} action="Maio 2026">
            <div className="p-5">
              <table className="w-full text-left text-sm">
                <thead className="font-secondary text-slate-500">
                  <tr><th className="p-3">Cód</th><th>Produto</th><th className="text-right">Faturamento</th></tr>
                </thead>
                <tbody className="font-secondary">
                  {[
                    ["51", "Pizza pepperoni", money(3598.1)],
                    ["78", "Combo smash", money(1521.8)],
                    ["985", "Marguerita grande", money(987.88)],
                    ["28", "Limonada artesanal", money(577.98)],
                    ["102", "Caesar salad", money(498.3)],
                  ].map(([code, product, amount], index) => (
                    <tr key={code} className={index % 2 ? "bg-white" : "bg-slate-50"}>
                      <td className="p-3">{code}</td>
                      <td>{product}</td>
                      <td className="text-right">{amount}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <Link href="/dashboard/reports" className="mt-5 block text-right font-semibold text-blue-600">Ver relatório completo</Link>
            </div>
          </Panel>
        </div>

        <div className="space-y-8">
          <Panel title="Vendas por categoria" icon={PieChart} action="Maio 2026">
            <div className="p-6">
              <div className="mb-4 flex justify-center gap-4 text-sm text-slate-500">
                <span className="flex items-center gap-2"><i className="h-3 w-10 rounded bg-[#69b6e9]" /> Pizzas</span>
                <span className="flex items-center gap-2"><i className="h-3 w-10 rounded bg-[#7ccfd0]" /> Bebidas</span>
                <span className="flex items-center gap-2"><i className="h-3 w-10 rounded bg-[#ffbf7a]" /> Combos</span>
              </div>
              <div className="mx-auto h-52 w-52 rounded-full" style={{ background: "conic-gradient(#69b6e9 0 58%, #7ccfd0 58% 84%, #ffbf7a 84% 100%)" }} />
            </div>
          </Panel>

          <Panel title="Resultado consolidado" icon={ReceiptText} action="Maio 2026">
            <div className="space-y-3 p-5 font-secondary text-sm">
              {[
                ["+ Receita bruta", money(revenue || 8621.15), false],
                ["- Impostos", money(458.62), false],
                ["= Receita líquida", money((revenue || 8621.15) - 458.62), true],
                ["- Custo dos produtos (CMV)", money(2151.33), false],
                ["- Despesas operacionais", money(3543.46), false],
                ["= Lucro operacional", money(2146.76), true],
                ["+ Receitas/despesas diversas", money(151.78), false],
                ["= Lucro/prejuízo", money(2298.54), true],
              ].map(([label, value, positive]) => (
                <div key={label as string} className="flex justify-between gap-4">
                  <span className={positive ? "font-bold" : ""}>{label}</span>
                  <strong className={positive ? "text-[#4fc27d]" : "text-slate-600"}>{value}</strong>
                </div>
              ))}
            </div>
          </Panel>

          <Panel title="Últimos arquivos anexados" icon={Paperclip}>
            <div className="p-5 text-center font-secondary text-slate-500">
              <div className="grid grid-cols-2 border-b border-slate-200 pb-3 text-left font-bold text-slate-600">
                <span>Arquivo</span><span>Módulo</span>
              </div>
              <p className="mt-6 italic">Nenhum arquivo anexado.</p>
              <p className="mt-1 italic">É possível anexar arquivos nos cadastros.</p>
            </div>
          </Panel>

          <Panel title="Últimas Atividades" icon={Wrench}>
            <div className="space-y-4 p-5 font-secondary text-sm text-slate-600">
              {[
                ["Primeiro acesso", "agora"],
                ["Novo usuário", "agora"],
                ["Cadastro da empresa", "agora"],
              ].map(([title, time]) => (
                <div key={title} className="grid grid-cols-[24px_1fr_auto] items-center gap-3">
                  <span className="h-3 w-3 rounded-full bg-[#E26A2C]" />
                  <span>{title}</span>
                  <strong className="text-right text-slate-500">{restaurant.name}<br /><span className="font-normal text-slate-400">{time}</span></strong>
                </div>
              ))}
            </div>
          </Panel>
        </div>
      </div>

      <div className="grid gap-4 rounded border border-slate-200 bg-white p-5 shadow-sm md:grid-cols-4">
        {[
          ["Pedidos hoje", rows.length],
          ["Ticket médio", money(averageTicket)],
          ["Pendentes", pending],
          ["Em preparo", preparing],
        ].map(([label, value]) => (
          <div key={label} className="rounded bg-slate-50 p-4">
            <p className="font-secondary text-xs font-bold uppercase text-slate-500">{label}</p>
            <p className="mt-2 text-2xl font-black text-[#537482]">{value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

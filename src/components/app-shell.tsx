import Link from "next/link";
import { redirect } from "next/navigation";
import { Banknote, BarChart3, Boxes, ChefHat, ClipboardList, Cog, Grid3X3, Home, Plug, QrCode, ShoppingBag, Store, Users } from "lucide-react";
import { requireRestaurant } from "@/lib/auth";
import { signOut } from "@/app/actions";
import { BrandLogo } from "./brand-logo";

const nav = [
  ["Dashboard", "/dashboard", Home],
  ["Pedidos", "/dashboard/orders", ClipboardList],
  ["PDV", "/dashboard/pdv", ShoppingBag],
  ["Delivery", "/dashboard/delivery", Store],
  ["Cardápio", "/dashboard/menu", ChefHat],
  ["Categorias", "/dashboard/categories", Grid3X3],
  ["Produtos", "/dashboard/products", Boxes],
  ["Mesas", "/dashboard/tables", Store],
  ["Clientes", "/dashboard/customers", Users],
  ["Caixa", "/dashboard/cash-register", Banknote],
  ["Relatórios", "/dashboard/reports", BarChart3],
  ["Site online", "/dashboard/online-menu", QrCode],
  ["Integrações", "/dashboard/integrations", Plug],
  ["Configurações", "/dashboard/settings", Cog],
] as const;

export async function AppShell({ children }: { children: React.ReactNode }) {
  const { restaurant, role } = await requireRestaurant();
  if (!restaurant) redirect("/register");

  return (
    <div className="min-h-screen bg-[#FFF6E9] text-[#0F1720]">
      <aside className="fixed inset-y-0 left-0 hidden w-72 border-r border-white/10 bg-[#0F1720] p-5 text-white lg:block">
        <Link href="/dashboard" className="flex items-center gap-3 rounded-2xl bg-white/5 p-3">
          <BrandLogo className="w-40" priority />
          <span>
            <small className="text-slate-400">{restaurant.name}</small>
          </span>
        </Link>
        <nav className="mt-8 space-y-1">
          {nav.map(([label, href, Icon]) => (
            <Link key={href} href={href} className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold text-slate-300 hover:bg-white/10 hover:text-[#F5B342]">
              <Icon className="h-4 w-4" />
              {label}
            </Link>
          ))}
        </nav>
      </aside>
      <main className="lg:pl-72">
        <header className="sticky top-0 z-10 border-b border-[#0F1720]/10 bg-[#FFF6E9]/90 px-4 py-3 backdrop-blur lg:px-8">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="brand-kicker">Admin GastroFlow</p>
              <h1 className="text-xl font-black">{restaurant.name}</h1>
            </div>
            <div className="flex items-center gap-2">
              <Link href={`/r/${restaurant.slug}`} className="btn-muted text-sm">Ver site</Link>
              <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-bold uppercase text-slate-600">{role}</span>
              <form action={signOut}><button className="btn-muted text-sm">Sair</button></form>
            </div>
          </div>
        </header>
        <div className="p-4 lg:p-8">{children}</div>
      </main>
    </div>
  );
}

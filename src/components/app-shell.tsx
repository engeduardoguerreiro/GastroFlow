import Link from "next/link";
import { redirect } from "next/navigation";
import { Banknote, BarChart3, Boxes, Camera, ChefHat, ChevronDown, ClipboardList, Cog, Grid3X3, Home, LogOut, Megaphone, Plug, Plus, QrCode, Search, ShoppingBag, Store, UserCircle, Users } from "lucide-react";
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
  const { restaurant } = await requireRestaurant();
  if (!restaurant) redirect("/register");

  return (
    <div className="min-h-screen bg-[#eef2f4] text-[#26343c]">
      <aside className="fixed inset-y-0 left-0 hidden w-72 border-r border-white/10 bg-[#0F1720] p-5 text-white lg:block">
        <Link href="/dashboard" className="flex items-center gap-3 rounded-2xl bg-white/5 p-3">
          <BrandLogo priority />
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
        <header className="sticky top-0 z-10 border-b border-[#0F1720]/10 bg-[#607f8b] px-4 py-3 text-white shadow-sm lg:px-8">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h1 className="text-xl font-semibold">Painel inicial</h1>
              <p className="font-secondary text-xs text-white/70">{restaurant.name}</p>
            </div>
            <div className="flex items-center gap-2">
              <button className="hidden items-center gap-2 rounded bg-[#f5b342] px-4 py-2 text-sm font-bold text-white shadow-lg shadow-black/10 md:inline-flex">
                <Grid3X3 className="h-4 w-4" /> Tutoriais
              </button>
              <Link href="/dashboard/pdv" className="inline-flex items-center gap-2 rounded bg-[#12cf86] px-4 py-2 text-sm font-bold text-white shadow-lg shadow-black/10">
                <Plus className="h-4 w-4" /> Novo <ChevronDown className="h-3 w-3" />
              </Link>
              <Link href={`/r/${restaurant.slug}`} className="hidden rounded border border-white/20 px-3 py-2 text-sm font-semibold text-white/90 md:inline-flex">Ver site</Link>
              <div className="group relative">
                <button className="flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-2 py-1">
                  <Search className="h-4 w-4 text-white/70" />
                  <span className="hidden text-sm font-semibold md:inline">{restaurant.name}</span>
                  <span className="grid h-8 w-8 place-items-center rounded-full bg-gradient-to-br from-white to-slate-300 text-[#607f8b] shadow-inner">
                    <UserCircle className="h-6 w-6" />
                  </span>
                  <ChevronDown className="h-3 w-3" />
                </button>
                <div className="invisible absolute right-0 top-11 w-56 overflow-hidden rounded bg-[#334850] opacity-0 shadow-2xl transition group-hover:visible group-hover:opacity-100">
                  <Link href="/dashboard/settings" className="flex items-center gap-3 px-4 py-3 text-sm font-semibold text-white hover:bg-white/10"><Camera className="h-4 w-4" /> Minha conta</Link>
                  <Link href="/dashboard/customers" className="flex items-center gap-3 px-4 py-3 text-sm font-semibold text-white hover:bg-white/10"><Users className="h-4 w-4" /> Usuários</Link>
                  <Link href="/dashboard/integrations" className="flex items-center gap-3 px-4 py-3 text-sm font-semibold text-white hover:bg-white/10"><Megaphone className="h-4 w-4" /> Indique e ganhe!</Link>
                  <Link href="/dashboard/settings" className="flex items-center gap-3 px-4 py-3 text-sm font-semibold text-white hover:bg-white/10"><Cog className="h-4 w-4" /> Configurações</Link>
                  <form action={signOut}><button className="flex w-full items-center gap-3 px-4 py-3 text-sm font-semibold text-white hover:bg-white/10"><LogOut className="h-4 w-4" /> Sair</button></form>
                </div>
              </div>
            </div>
          </div>
        </header>
        <div className="p-4 lg:p-8">{children}</div>
      </main>
    </div>
  );
}

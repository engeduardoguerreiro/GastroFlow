import Link from "next/link";
import { BrandLogo } from "@/components/brand-logo";
import { register } from "../actions";

export default function RegisterPage() {
  return (
    <main className="grid min-h-screen place-items-center px-5 py-10">
      <form action={register} className="glass w-full max-w-2xl rounded-2xl p-6">
        <BrandLogo className="mb-6 h-12 w-auto" priority />
        <h1 className="text-3xl font-black">Criar conta e restaurante</h1>
        <p className="font-secondary mt-2 text-slate-300">O primeiro usuário será owner do restaurante.</p>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <input className="field" name="email" type="email" placeholder="Email" required />
          <input className="field" name="password" type="password" placeholder="Senha" minLength={6} required />
          <input className="field md:col-span-2" name="restaurant_name" placeholder="Nome do restaurante" required />
          <input className="field" name="slug" placeholder="Slug público, ex: minha-pizzaria" />
          <input className="field" name="description" placeholder="Descrição curta" />
        </div>
        <button className="btn-primary mt-6 w-full">Começar agora</button>
        <p className="mt-5 text-sm text-slate-300">Já tem conta? <Link className="font-bold text-[#F5B342]" href="/login">Entrar</Link></p>
      </form>
    </main>
  );
}

import Link from "next/link";
import { BrandLogo } from "@/components/brand-logo";
import { signIn } from "../actions";

export default function LoginPage() {
  return (
    <main className="grid min-h-screen place-items-center px-5">
      <form action={signIn} className="glass w-full max-w-md rounded-2xl p-6">
        <BrandLogo className="mb-6 w-56" priority />
        <h1 className="text-3xl font-black">Entrar</h1>
        <p className="font-secondary mt-2 text-slate-300">Acesse o painel do restaurante.</p>
        <div className="mt-6 space-y-4">
          <input className="field" name="email" type="email" placeholder="Email" required />
          <input className="field" name="password" type="password" placeholder="Senha" required />
          <button className="btn-primary w-full">Entrar</button>
        </div>
        <p className="mt-5 text-sm text-slate-300">Ainda não tem conta? <Link className="font-bold text-[#F5B342]" href="/register">Criar cadastro</Link></p>
      </form>
    </main>
  );
}

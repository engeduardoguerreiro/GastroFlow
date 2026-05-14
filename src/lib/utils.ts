import { clsx, type ClassValue } from "clsx";
import type { OrderStatus, Role } from "./types";

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

export function money(value: number | string | null | undefined) {
  return new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(Number(value ?? 0));
}

export function slugify(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");
}

export const statusLabel: Record<OrderStatus, string> = {
  pending: "Novo",
  accepted: "Aceito",
  preparing: "Em preparo",
  ready: "Pronto",
  out_for_delivery: "Em entrega",
  completed: "Finalizado",
  canceled: "Cancelado",
};

export const statusClass: Record<OrderStatus, string> = {
  pending: "bg-yellow-100 text-yellow-800 border-yellow-200",
  accepted: "bg-blue-100 text-blue-800 border-blue-200",
  preparing: "bg-[#E26A2C]/15 text-[#A9471B] border-[#E26A2C]/25",
  ready: "bg-purple-100 text-purple-800 border-purple-200",
  out_for_delivery: "bg-cyan-100 text-cyan-800 border-cyan-200",
  completed: "bg-emerald-100 text-emerald-800 border-emerald-200",
  canceled: "bg-red-100 text-red-800 border-red-200",
};

const grants: Record<Role, string[]> = {
  owner: ["*"],
  admin: ["*"],
  manager: ["orders", "menu", "reports", "customers", "tables"],
  cashier: ["orders", "pdv", "cash-register", "customers"],
  kitchen: ["orders"],
};

export function can(role: Role | null | undefined, permission: string) {
  if (!role) return false;
  return grants[role]?.includes("*") || grants[role]?.includes(permission);
}

"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { requireRestaurant } from "@/lib/auth";
import { slugify } from "@/lib/utils";
import type { OrderStatus } from "@/lib/types";

function text(formData: FormData, key: string, fallback = "") {
  return String(formData.get(key) ?? fallback).trim();
}

function num(formData: FormData, key: string, fallback = 0) {
  const value = Number(String(formData.get(key) ?? "").replace(",", "."));
  return Number.isFinite(value) ? value : fallback;
}

export async function signIn(formData: FormData) {
  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithPassword({
    email: text(formData, "email"),
    password: text(formData, "password"),
  });
  if (error) redirect(`/login?error=${encodeURIComponent(error.message)}`);
  redirect("/dashboard");
}

export async function signOut() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/");
}

export async function register(formData: FormData) {
  const supabase = await createClient();
  const email = text(formData, "email");
  const password = text(formData, "password");
  const restaurantName = text(formData, "restaurant_name");
  const slug = slugify(text(formData, "slug") || restaurantName);

  const { data, error } = await supabase.auth.signUp({ email, password });
  if (error) redirect(`/register?error=${encodeURIComponent(error.message)}`);
  const user = data.user;
  if (!user) redirect("/login?message=Confirme seu email para continuar");

  const { data: restaurant, error: restaurantError } = await supabase
    .from("restaurants")
    .insert({
      owner_id: user.id,
      name: restaurantName,
      slug,
      description: text(formData, "description", "Delivery moderno com pedidos online."),
      email,
      is_open: true,
      delivery_enabled: true,
      pickup_enabled: true,
      table_service_enabled: true,
    })
    .select("id")
    .single();

  if (restaurantError) redirect(`/register?error=${encodeURIComponent(restaurantError.message)}`);

  await supabase.from("restaurant_users").insert({
    restaurant_id: restaurant.id,
    user_id: user.id,
    role: "owner",
  });

  redirect("/dashboard");
}

export async function saveCategory(formData: FormData) {
  const { supabase, restaurant } = await requireRestaurant();
  const id = text(formData, "id");
  const payload = {
    restaurant_id: restaurant.id,
    name: text(formData, "name"),
    description: text(formData, "description") || null,
    display_order: num(formData, "display_order"),
    active: formData.get("active") === "on",
  };
  if (id) await supabase.from("categories").update(payload).eq("id", id);
  else await supabase.from("categories").insert(payload);
  revalidatePath("/dashboard/categories");
  revalidatePath("/dashboard/menu");
}

export async function toggleCategory(formData: FormData) {
  const { supabase } = await requireRestaurant();
  await supabase.from("categories").update({ active: formData.get("active") === "true" }).eq("id", text(formData, "id"));
  revalidatePath("/dashboard/categories");
}

export async function saveProduct(formData: FormData) {
  const { supabase, restaurant } = await requireRestaurant();
  const id = text(formData, "id");
  const payload = {
    restaurant_id: restaurant.id,
    category_id: text(formData, "category_id") || null,
    name: text(formData, "name"),
    description: text(formData, "description") || null,
    price: num(formData, "price"),
    image_url: text(formData, "image_url") || null,
    active: formData.get("active") === "on",
    preparation_time: num(formData, "preparation_time", 15),
    stock_control_enabled: formData.get("stock_control_enabled") === "on",
    stock_quantity: num(formData, "stock_quantity", 0),
  };
  if (id) await supabase.from("products").update(payload).eq("id", id);
  else await supabase.from("products").insert(payload);
  revalidatePath("/dashboard/products");
  revalidatePath("/dashboard/menu");
  redirect("/dashboard/products");
}

export async function toggleProduct(formData: FormData) {
  const { supabase } = await requireRestaurant();
  await supabase.from("products").update({ active: formData.get("active") === "true" }).eq("id", text(formData, "id"));
  revalidatePath("/dashboard/products");
}

export async function updateRestaurant(formData: FormData) {
  const { supabase, restaurant } = await requireRestaurant();
  await supabase.from("restaurants").update({
    name: text(formData, "name"),
    slug: slugify(text(formData, "slug")),
    description: text(formData, "description") || null,
    logo_url: text(formData, "logo_url") || null,
    cover_url: text(formData, "cover_url") || null,
    whatsapp: text(formData, "whatsapp") || null,
    address: text(formData, "address") || null,
    city: text(formData, "city") || null,
    state: text(formData, "state") || null,
    is_open: formData.get("is_open") === "on",
    delivery_enabled: formData.get("delivery_enabled") === "on",
    pickup_enabled: formData.get("pickup_enabled") === "on",
    table_service_enabled: formData.get("table_service_enabled") === "on",
  }).eq("id", restaurant.id);
  revalidatePath("/dashboard/settings");
  revalidatePath(`/r/${restaurant.slug}`);
}

export async function updateOrderStatus(formData: FormData) {
  const { supabase } = await requireRestaurant();
  await supabase.from("orders").update({ status: text(formData, "status") as OrderStatus }).eq("id", text(formData, "id"));
  revalidatePath("/dashboard/orders");
  revalidatePath(`/dashboard/orders/${text(formData, "id")}`);
}

async function createOrderFromCart(formData: FormData, source: "pdv" | "site" | "delivery" | "mesa", restaurantId: string, supabase: Awaited<ReturnType<typeof createClient>>) {
  const cart = JSON.parse(text(formData, "cart", "[]")) as Array<{ id: string; name: string; price: number; quantity: number; notes?: string }>;
  if (!cart.length) throw new Error("Carrinho vazio");
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const deliveryFee = num(formData, "delivery_fee");
  const discount = num(formData, "discount");
  const total = subtotal + deliveryFee - discount;

  const { data: order, error } = await supabase.from("orders").insert({
    restaurant_id: restaurantId,
    source,
    type: text(formData, "type", "pickup"),
    status: "pending",
    payment_status: source === "pdv" ? "paid" : "pending",
    payment_method: text(formData, "payment_method", "pix"),
    subtotal,
    delivery_fee: deliveryFee,
    discount,
    total,
    customer_name: text(formData, "customer_name") || "Cliente balcão",
    customer_phone: text(formData, "customer_phone") || null,
    delivery_address: text(formData, "delivery_address") || null,
    notes: text(formData, "notes") || null,
  }).select("id").single();
  if (error) throw error;

  await supabase.from("order_items").insert(cart.map((item) => ({
    restaurant_id: restaurantId,
    order_id: order.id,
    product_id: item.id,
    product_name: item.name,
    quantity: item.quantity,
    unit_price: item.price,
    total_price: item.price * item.quantity,
    notes: item.notes ?? null,
    selected_options: {},
  })));
  return order.id as string;
}

export async function createPdvOrder(formData: FormData) {
  const { supabase, restaurant } = await requireRestaurant();
  const id = await createOrderFromCart(formData, "pdv", restaurant.id, supabase);
  revalidatePath("/dashboard/orders");
  redirect(`/dashboard/orders/${id}`);
}

export async function createOnlineOrder(formData: FormData) {
  const supabase = await createClient();
  const restaurantId = text(formData, "restaurant_id");
  await createOrderFromCart(formData, "site", restaurantId, supabase);
  redirect(`/r/${text(formData, "slug")}?success=1`);
}

export async function saveIntegration(formData: FormData) {
  const { supabase, restaurant } = await requireRestaurant();
  const provider = text(formData, "provider");
  await supabase.from("integrations").upsert({
    restaurant_id: restaurant.id,
    provider,
    enabled: formData.get("enabled") === "on",
    status: formData.get("enabled") === "on" ? "pending" : "disconnected",
    credentials: {
      clientId: text(formData, "client_id"),
      clientSecret: text(formData, "client_secret"),
      token: text(formData, "token"),
      merchantId: text(formData, "merchant_id"),
    },
    settings: {
      webhookUrl: text(formData, "webhook_url"),
      environment: text(formData, "environment", "sandbox"),
    },
  }, { onConflict: "restaurant_id,provider" });
  revalidatePath("/dashboard/integrations");
}

import { notFound } from "next/navigation";
import { requireRestaurant } from "@/lib/auth";
import type { Category, Product } from "@/lib/types";
import { ProductForm } from "../../product-form";

export default async function EditProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const { supabase, restaurant } = await requireRestaurant();
  const [{ data: categories }, { data: product }] = await Promise.all([
    supabase.from("categories").select("*").eq("restaurant_id", restaurant.id).order("display_order"),
    supabase.from("products").select("*").eq("restaurant_id", restaurant.id).eq("id", id).maybeSingle(),
  ]);
  if (!product) notFound();
  return <ProductForm categories={(categories ?? []) as Category[]} product={product as Product} />;
}

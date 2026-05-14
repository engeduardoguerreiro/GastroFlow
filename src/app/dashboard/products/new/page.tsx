import { requireRestaurant } from "@/lib/auth";
import type { Category } from "@/lib/types";
import { ProductForm } from "../product-form";

export default async function NewProductPage() {
  const { supabase, restaurant } = await requireRestaurant();
  const { data } = await supabase.from("categories").select("*").eq("restaurant_id", restaurant.id).order("display_order");
  return <ProductForm categories={(data ?? []) as Category[]} />;
}

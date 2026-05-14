export type Role = "owner" | "admin" | "manager" | "cashier" | "kitchen";
export type OrderStatus = "pending" | "accepted" | "preparing" | "ready" | "out_for_delivery" | "completed" | "canceled";
export type OrderSource = "pdv" | "mesa" | "delivery" | "site" | "ifood" | "99food" | "keeta" | "rappi" | "manual";

export type Restaurant = {
  id: string;
  owner_id: string;
  name: string;
  slug: string;
  description: string | null;
  logo_url: string | null;
  cover_url: string | null;
  phone: string | null;
  whatsapp: string | null;
  email: string | null;
  address: string | null;
  city: string | null;
  state: string | null;
  zip_code: string | null;
  is_open: boolean;
  opening_hours: Record<string, unknown> | null;
  delivery_enabled: boolean;
  pickup_enabled: boolean;
  table_service_enabled: boolean;
  created_at: string;
};

export type Category = {
  id: string;
  restaurant_id: string;
  name: string;
  description: string | null;
  display_order: number;
  active: boolean;
  created_at: string;
};

export type Product = {
  id: string;
  restaurant_id: string;
  category_id: string | null;
  name: string;
  description: string | null;
  price: number;
  image_url: string | null;
  active: boolean;
  preparation_time: number | null;
  stock_control_enabled: boolean;
  stock_quantity: number | null;
  created_at: string;
  categories?: Pick<Category, "name"> | null;
};

export type Customer = {
  id: string;
  restaurant_id: string;
  name: string;
  phone: string | null;
  email: string | null;
  address: string | null;
  neighborhood: string | null;
  city: string | null;
  state: string | null;
  zip_code: string | null;
  notes: string | null;
  created_at: string;
};

export type Order = {
  id: string;
  restaurant_id: string;
  customer_id: string | null;
  order_number: number;
  source: OrderSource;
  type: "dine_in" | "delivery" | "pickup";
  status: OrderStatus;
  payment_status: "pending" | "paid" | "refunded";
  payment_method: "cash" | "credit_card" | "debit_card" | "pix" | "online" | "other";
  subtotal: number;
  delivery_fee: number;
  discount: number;
  total: number;
  customer_name: string | null;
  customer_phone: string | null;
  delivery_address: string | null;
  table_id: string | null;
  notes: string | null;
  external_order_id: string | null;
  external_platform: string | null;
  created_at: string;
  updated_at: string;
};

export type OrderItem = {
  id: string;
  restaurant_id: string;
  order_id: string;
  product_id: string | null;
  product_name: string;
  quantity: number;
  unit_price: number;
  total_price: number;
  notes: string | null;
  selected_options: Record<string, unknown> | null;
  created_at: string;
};

export type Table = {
  id: string;
  restaurant_id: string;
  number: number;
  name: string | null;
  status: "available" | "occupied" | "reserved" | "closed";
  created_at: string;
};

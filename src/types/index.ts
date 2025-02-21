// Category type based on API response
export interface Category {
  id: number;
  name: string;
  display_name: string;
  image: string;
  is_closed: boolean;
  opens_at: string | null;
  count_sub_categories: number;
}

// ExtraOption type for options within extrasWithOptions
export interface ExtraOption {
  id: number;
  type: string;
  name: string;
  max_qty: number;
  option_has_price: boolean;
  currency: string;
  price: number;
  extrasWithOptions: any[]; // Can refine if nested extras are used
}

// Extra type for extrasWithOptions in MenuItem
export interface Extra {
  is_active: number;
  name: string;
  max_options: number;
  extra_type_name: string;
  is_required: number;
  extra_id: number;
  option: ExtraOption[];
}

// Simplified type for selected extras in CartItem
export interface SelectedExtra {
  extra_id: number;
  option_id?: number; // Optional, as not all extras have an option_id
}

// MenuItem type based on API response
export interface MenuItem {
  id: number;
  name: string;
  display_name: string;
  description: string;
  price: number;
  image: string | null;
  calories: number | null;
  is_category_off: boolean;
  in_cart: boolean;
  in_cart_count: number;
  additional_items: any[];
  dietarySymbols: any[];
  extrasWithOptions: Extra[];
}

// CartItem extends MenuItem with cart-specific fields
export interface CartItem extends MenuItem {
  quantity: number;
  selectedExtras: SelectedExtra[]; // Use simpler type for cart
}

// Cart state for Redux
export interface CartState {
  items: CartItem[];
  totalPrice: number;
}

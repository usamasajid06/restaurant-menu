export interface Category {
  id: number;
  name: string;
  display_name: string;
  image: string;
  is_closed: boolean;
  opens_at: string | null;
  count_sub_categories: number;
}

export interface ExtraOption {
  id: number;
  type: string;
  name: string;
  max_qty: number;
  option_has_price: boolean;
  currency: string;
  price: number;
  extrasWithOptions: any[];
}

export interface Extra {
  is_active: number;
  name: string;
  max_options: number;
  extra_type_name: string;
  is_required: number;
  extra_id: number;
  option: ExtraOption[];
}

export interface OptionalExtra {
  id: number;
  name: string;
  price: number;
}

export interface RequiredExtra {
  id: number;
  name: string;
  options: string[];
}

export interface SelectedExtra {
  extra_id: number;
  option_id?: number;
}

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
  optionalExtras?: OptionalExtra[];
  requiredExtras?: RequiredExtra[];
}

export interface CartItem extends MenuItem {
  quantity: number;
  selectedExtras: SelectedExtra[];
  selectedOptionalExtras: OptionalExtra[];
  selectedRequiredExtras: { [key: string]: string };
}

export interface CartState {
  items: CartItem[];
  totalPrice: number;
}

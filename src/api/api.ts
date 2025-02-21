import axios from "axios";
import { Category, MenuItem, CartItem } from "../types";

const BASE_URL =
  "https://stg.tdh.start-tech.ae/api/8661e1bc-87d4-11ef-ba55-0050563f7167/restaurant";

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    Accept: "application/json",
    lang: "en",
  },
});

export const fetchCategories = async (): Promise<Category[]> => {
  const response = await api.get(
    "/categories/2da6c53a-522d-485d-b77c-2fafd601ff0c"
  );
  return response.data.data.categories;
};

export const fetchItemsByCategory = async (
  categoryId: number
): Promise<MenuItem[]> => {
  const response = await api.get(
    `/2da6c53a-522d-485d-b77c-2fafd601ff0c?cat=${categoryId}`
  );
  return response.data.data.items.data;
};

export const addItemToOrder = async (item: CartItem): Promise<void> => {
  const formData = new FormData();
  formData.append("restaurant_id", "1");
  formData.append("item_id", item.id.toString());
  formData.append("quantity", item.quantity.toString());
  if (item.selectedExtras && item.selectedExtras.length > 0) {
    item.selectedExtras.forEach((extra, index) => {
      formData.append(`extras[${index}][extra_id]`, extra.extra_id.toString());
      if (extra.option_id) {
        formData.append(
          `extras[${index}][option_id]`,
          extra.option_id.toString()
        );
      }
    });
  }
  await api.post("/order/order-item", formData);
};

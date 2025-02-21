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
  try {
    const response = await api.get(
      "/categories/2da6c53a-522d-485d-b77c-2fafd601ff0c"
    );
    const categories = response.data.data.categories.map((cat: any) => {
      if (cat.name === "Breakfast") {
        return {
          ...cat,
          is_closed: false,
          opens_at: "7:00 AM",
        };
      }
      return {
        ...cat,
        is_closed: cat.is_closed || false,
        opens_at: cat.opens_at || null,
      };
    });
    return categories;
  } catch (error) {
    console.error("Error fetching categories:", error);
    throw error;
  }
};
export const fetchItemsByCategory = async (
  categoryId: number
): Promise<MenuItem[]> => {
  try {
    const response = await api.get(
      `/2da6c53a-522d-485d-b77c-2fafd601ff0c?cat=${categoryId}`
    );
    const items = response.data.data.items.data.map((item: any) => ({
      ...item,
      optionalExtras: [
        { id: 1, name: "Truffle and parmesan fries", price: 30 },
        { id: 2, name: "French fries", price: 30 },
        { id: 3, name: "Garden salad", price: 30 },
        { id: 4, name: "Grilled vegetables", price: 30 },
        { id: 5, name: "Steamed broccoli", price: 30 },
        { id: 6, name: "Steamed potato", price: 30 },
        { id: 7, name: "Mashed potato", price: 30 },
        { id: 8, name: "Basmati rice", price: 30 },
        { id: 9, name: "Wild mushroom", price: 15 },
        { id: 10, name: "BBQ sauce", price: 15 },
        { id: 11, name: "Lemon butter", price: 15 },
        { id: 12, name: "Veal jus", price: 15 },
        { id: 13, name: "Peppercorn", price: 15 },
        { id: 14, name: "Anakena merlot", price: 55 },
        { id: 15, name: "Anakena sauvignon blanc", price: 55 },
      ],
      requiredExtras: [
        {
          id: 16,
          name: "Choice of Side",
          options: [
            "Grilled vegetables",
            "Basmati rice",
            "Steamed broccoli",
            "Truffle and parmesan fries",
            "French fries",
            "Garden salad",
            "Mashed potato",
          ],
        },
        {
          id: 17,
          name: "Choice of Sauce",
          options: [
            "Peppercorn",
            "Mushroom sauce",
            "BBQ sauce",
            "Lemon butter",
            "Veal jus",
            "Wild mushroom",
            "Peppercorn sauce",
          ],
        },
        {
          id: 18,
          name: "Cooking Preferences",
          options: [
            "Rare",
            "Extra rare",
            "Medium-rare",
            "Medium-well",
            "Medium",
            "Medium rare",
            "Well done",
          ],
        },
      ],
    }));
    return items;
  } catch (error) {
    console.error("Error fetching items:", error);
    throw error;
  }
};

export const addItemToOrder = async (item: CartItem): Promise<void> => {
  try {
    const formData = new FormData();
    formData.append("restaurant_id", "1");
    formData.append("item_id", item.id.toString());
    formData.append("quantity", item.quantity.toString());

    if (item.selectedExtras && item.selectedExtras.length > 0) {
      item.selectedExtras.forEach((extra, index) => {
        formData.append(
          `extras[${index}][extra_id]`,
          extra.extra_id.toString()
        );
        if (extra.option_id) {
          formData.append(
            `extras[${index}][option_id]`,
            extra.option_id.toString()
          );
        }
      });
    }

    if (item.selectedOptionalExtras && item.selectedOptionalExtras.length > 0) {
      item.selectedOptionalExtras.forEach((extra, index) => {
        formData.append(`optional_extras[${index}][id]`, extra.id.toString());
      });
    }

    if (item.selectedRequiredExtras) {
      Object.entries(item.selectedRequiredExtras).forEach(
        ([key, value], index) => {
          formData.append(`required_extras[${index}][name]`, key);
          formData.append(`required_extras[${index}][value]`, value);
        }
      );
    }

    await api.post("/order/order-item", formData);
  } catch (error) {
    console.error("Error adding item to order:", error);
    throw error;
  }
};

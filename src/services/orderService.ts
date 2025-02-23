import { api } from "./config";
import { CartItem } from "../types";

export const addItemToOrder = async (item: CartItem): Promise<void> => {
  try {
    console.log("Adding item to order:", item);
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

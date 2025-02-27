import { api } from "./config";
import { MenuItem, Extra, OptionalExtra, RequiredExtra } from "../types";

export const fetchItemsByCategory = async (
  categoryId: number
): Promise<MenuItem[]> => {
  try {
    console.log(
      "Fetching items from:",
      `${api.defaults.baseURL}/2da6c53a-522d-485d-b77c-2fafd601ff0c?cat=${categoryId}`
    );
    const response = await api.get(
      `/2da6c53a-522d-485d-b77c-2fafd601ff0c?cat=${categoryId}`
    );
    const items = response.data?.data.items.data.map((item: any) => {
      const extrasWithOptions: Extra[] = item.extrasWithOptions || [];

      const optionalExtras: OptionalExtra[] = [];
      const requiredExtras: RequiredExtra[] = [];

      extrasWithOptions.forEach((extra: Extra) => {
        if (extra.is_required === 1) {
          requiredExtras.push({
            id: extra.extra_id,
            name: extra.name,
            options: extra.option.map((opt) => opt.name),
          });
        } else {
          extra.option.forEach((opt) => {
            optionalExtras.push({
              id: opt.id,
              name: opt.name,
              price: opt.price || 0,
            });
          });
        }
      });

      return {
        ...item,
        extrasWithOptions,
        optionalExtras,
        requiredExtras,
      };
    });
    return items;
  } catch (error) {
    throw error;
  }
};

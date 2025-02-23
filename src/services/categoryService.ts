import { api } from "./config";
import { Category } from "../types";

export const fetchCategories = async (): Promise<Category[]> => {
  try {
    console.log(
      "Fetching categories from:",
      `${api.defaults.baseURL}/categories/2da6c53a-522d-485d-b77c-2fafd601ff0c`
    );
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
    throw error;
  }
};

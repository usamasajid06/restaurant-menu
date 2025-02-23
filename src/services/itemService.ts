import { api } from "./config";
import { MenuItem } from "../types";

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
    console.log("Items response:", response.data);
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

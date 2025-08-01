import { createContext, useContext } from "react";

export const ItemContext = createContext({
  items: [
    {
      itemId: 0,
      itemName: "Predefined",
      itemCompleted: false,
    },
  ],
  addItem: (id) => {},
  deleteItem: (id) => {},
  updateItem: (id, updates) => {},
  toggleCompleted: (id) => {},
});

export const ItemProvider = ItemContext.Provider;

export default function useItems() {
  return useContext(ItemContext);
}

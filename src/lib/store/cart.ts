import { create, } from "zustand";
import { Product } from "../types/product";

export interface CartItem extends Product {
  quantity: number;
}

interface CartStore {
  items: CartItem[];
  add: (item: Omit<CartItem, "quantity">) => void;
  remove: (id: number) => void;
  clear: () => void;
  getTotal: () => number;
  getCount: () => number;
}

export const useCart = create<CartStore>((set, get) => ({
  items: [],

  add: (item) =>
    set((state) => {
      const existing = state.items.find((i) => i.id === item.id);
      if (existing) {
        return {
          items: state.items.map((i) =>
            i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
          ),
        };
      }
      return { items: [...state.items, { ...item, quantity: 1 }] };
    }),

  remove: (id) =>
    set((state) => ({
      items: state.items.filter((item) => item.id !== id),
    })),

  clear: () => set({ items: [] }),

  getTotal: () =>
    get().items.reduce((sum, i) => sum + i.price * i.quantity, 0),

  getCount: () =>
    get().items.reduce((sum, i) => sum + i.quantity, 0),
}));

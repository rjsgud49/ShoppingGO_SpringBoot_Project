import { create } from "zustand";
import axios from "../api/axios";

export interface CartItem {
    id: number;
    quantity: number;
    productId: number;
    productName: string;
    imageUrl: string;
    price?: number; // API에서 price 안 넘기면 undefined → 보호 코드 포함
}

interface CartStore {
    items: CartItem[];
    loadCart: (userId: number) => Promise<void>;
}

export const useCartStore = create<CartStore>((set) => ({
    items: [],

    loadCart: async (userId: number) => {
        const res = await axios.get(`/cart/${userId}`);

        // price 값을 API가 안 줄 경우 → 프론트에서 계산할 수 있게 보호
        const itemsWithPrice = res.data.map((item: CartItem) => ({
            ...item,
            price: item.price ?? 0,
        }));

        set({ items: itemsWithPrice });
    },
}));

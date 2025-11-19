import axios from "./axios";

export const updateCart = (data: { cartItemId: number; quantity: number }) =>
    axios.put("/cart/update", data);

export const deleteCartItem = (id: number) =>
    axios.delete(`/cart/${id}`);

export const addToCart = (data: { userId: number; productId: number; quantity: number }) =>
    axios.post("/cart/add", data);

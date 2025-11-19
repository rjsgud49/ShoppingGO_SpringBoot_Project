import api from "./axios";

const API_URL = "/orders";

export const getOrders = () => api.get(API_URL);

export const deleteOrder = (id: number) =>
    api.delete(`${API_URL}/${id}`);

export const updateOrderStatus = (id: number, status: string) =>
    api.put(`${API_URL}/${id}/status?status=${status}`);

export const createOrder = (payload: {
    userId: number;
    items: { productId: number; quantity: number }[];
}) => api.post(API_URL, payload);

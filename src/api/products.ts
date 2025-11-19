import axios from "./axios";

export const getProducts = () => axios.get("/products");
export const getProductById = (id: number) => axios.get(`/products/${id}`);
export const createProduct = (data: any) => axios.post(`/products`, data);
export const updateProduct = (id: number, data: any) => axios.put(`/products/${id}`, data);
export const deleteProduct = (id: number) => axios.delete(`/products/${id}`);
export const getByCategory = (category: string) => axios.get(`/products/category/${category}`);

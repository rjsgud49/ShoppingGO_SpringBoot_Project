import axios from "./axios";

export const registerUser = (data: any) => axios.post(`/users/register`, data);
export const getUsers = () => axios.get(`/users`);
export const deleteUser = (id: number) => axios.delete(`/users/${id}`);

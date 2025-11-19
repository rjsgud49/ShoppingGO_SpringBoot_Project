import { create } from "zustand";
import { login } from "../api/auth";

interface AuthState {
    token: string | null;
    refreshToken: string | null;
    loginAction: (email: string, password: string) => Promise<void>;
    logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
    token: localStorage.getItem("token"),
    refreshToken: localStorage.getItem("refreshToken"),

    loginAction: async (email, password) => {
        const data = await login(email, password); // res.data가 넘어옴

        const access = data.accessToken;
        const refresh = data.refreshToken;

        localStorage.setItem("token", access);
        localStorage.setItem("refreshToken", refresh);

        set({
            token: access,
            refreshToken: refresh,
        });
    },

    logout: () => {
        localStorage.removeItem("token");
        localStorage.removeItem("refreshToken");

        set({
            token: null,
            refreshToken: null,
        });
    },
}));

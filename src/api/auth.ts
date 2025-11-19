import axios from "./axios";

export const login = (email: string, password: string) => {
    return axios.post("/auth/login", null, {
        params: { email, password },
    }).then(res => {
        return res.data;
    });
};


export const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("refreshToken");
};

export const refreshToken = () =>
    axios.post("/auth/refresh", null, {
        headers: {
            "Refresh-Token": localStorage.getItem("refreshToken") || ""
        }
    }).then(res => {
        const { accessToken } = res.data;

        localStorage.setItem("token", accessToken);
        return accessToken;
    });

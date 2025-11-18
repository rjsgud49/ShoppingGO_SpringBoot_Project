import axios from "axios";

const instance = axios.create({
    baseURL: "http://localhost:8081/api",   
});

// 모든 요청에 Authorization 헤더 자동 추가
instance.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default instance;

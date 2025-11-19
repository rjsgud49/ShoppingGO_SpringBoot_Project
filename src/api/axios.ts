import axios from "axios";

const instance = axios.create({
    baseURL: "http://localhost:8081/api",
});

// ----------------------------
// 1) 요청 시 AccessToken 자동 추가
// ----------------------------
instance.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// ----------------------------
// 2) 응답에서 401이 뜨면 Refresh Token으로 재발급
// ----------------------------
instance.interceptors.response.use(
    (response) => response, // 성공은 그대로 반환

    async (error) => {
        const originalRequest = error.config;

        // AccessToken 만료 → 401 → refresh 시도
        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            const refreshToken = localStorage.getItem("refreshToken");
            if (!refreshToken) {
                console.log("리프레시 토큰 없음 → 재로그인 필요");
                return Promise.reject(error);
            }

            try {
                // refresh API 호출
                const res = await axios.post(
                    "http://localhost:8081/api/auth/refresh",
                    null,
                    {
                        headers: {
                            "Refresh-Token": refreshToken,
                        },
                    }
                );

                const newAccess = res.data.accessToken;

                // 새 AccessToken 저장
                localStorage.setItem("token", newAccess);

                // 다시 Authorization 헤더에 붙여 재시도
                originalRequest.headers.Authorization = `Bearer ${newAccess}`;

                return instance(originalRequest); // 요청 재실행
            } catch (refreshError) {
                console.log("리프레시 토큰 만료 → 재로그인 필요");
                localStorage.removeItem("token");
                localStorage.removeItem("refreshToken");
                return Promise.reject(refreshError);
            }
        }

        return Promise.reject(error);
    }
);

export default instance;

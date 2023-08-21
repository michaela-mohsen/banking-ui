import axios from "axios";
import TokenService from "./services/TokenService";
import authHeader from "./services/Auth-Header";

const instance = axios.create({
    baseURL: "http://localhost:8006/api",
    headers: {
        "Content-type": "application/json"
    }
});

instance.interceptors.request.use(
    (config) => {
        const token = TokenService.getLocalToken();
        if (token) {
            config.headers["Authorization"] = 'Bearer ' + token;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

instance.interceptors.response.use(
    (res) => {
        return res;
    },
    async (err) => {
        const originalConfig = err.config;

        if (originalConfig.url !== "/auth/log-in" && err.response) {
            // Access Token was expired
            if (err.response.status === 401 && !originalConfig._retry) {

                originalConfig._retry = true;

                try {
                    const rs = await instance.post("/auth/refresh-token", {
                        refreshToken: TokenService.getLocalRefreshToken(),
                    }, { headers: authHeader() });

                    const { accessToken } = rs.data;
                    TokenService.updateLocalToken(accessToken);

                    return instance(originalConfig);
                } catch (_error) {
                    return Promise.reject(_error);
                }
            }
        }

        return Promise.reject(err);
    }
);

export default instance;
import axios from "axios";
import TokenService from "./services/TokenService";

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

export default instance;
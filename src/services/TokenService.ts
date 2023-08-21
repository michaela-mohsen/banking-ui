import httpCommon from "../http-common";

const getLocalRefreshToken = () => {
    const userString = localStorage.getItem("user");
    if (userString) {
        const user = JSON.parse(userString);
        return user.refreshToken;
    }
}

const getLocalToken = () => {
    const userString = localStorage.getItem("user");
    if (userString) {
        const user = JSON.parse(userString);
        return user.token;
    }
}

const updateLocalToken = (token: string) => {
    const userString = localStorage.getItem("user");
    if (userString) {
        const user = JSON.parse(userString);
        user.token = token;
        return localStorage.setItem("user", JSON.stringify(user));
    }
}

const refreshToken = (refreshToken: string) => {
    return httpCommon.post("/auth/refresh-token", refreshToken);
}

const TokenService = {
    getLocalRefreshToken,
    getLocalToken,
    updateLocalToken,
    refreshToken
}

export default TokenService;
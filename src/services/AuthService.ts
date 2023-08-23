import httpCommon from "../http-common";
import ILoginData from "../types/Login";
import IRegisterData from "../types/Register";
import authHeader from "./Auth-Header";

const register = (data: IRegisterData) => {
    return httpCommon.post<IRegisterData>("/auth/sign-up", data);
}

const loginPage = () => {
    return httpCommon.get("/auth/log-in");
}

const login = (data: ILoginData) => {
    return httpCommon.post("/auth/sign-in", data);
}

const logout = () => {
    localStorage.removeItem("user");
    return httpCommon.get("/auth/sign-out", { headers: authHeader() });
}

const getCurrentUser = () => {
    const userString = localStorage.getItem("user");
    if (userString) return JSON.parse(userString);
    else return "Not sure what this is";
}

const AuthService = {
    register,
    login,
    logout,
    getCurrentUser,
    loginPage
};

export default AuthService;
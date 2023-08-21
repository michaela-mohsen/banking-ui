import httpCommon from "../http-common";
import ILoginData from "../types/Login";
import IRegisterData from "../types/Register";

const register = (data: IRegisterData) => {
    return httpCommon.post<IRegisterData>("/auth/sign-up", data);
}

const login = (data: ILoginData) => {
    return httpCommon.post("/auth/sign-in", data);
}

const logout = () => {
    localStorage.removeItem("user");
    return httpCommon.delete("/auth/sign-out");
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
    getCurrentUser
};

export default AuthService;
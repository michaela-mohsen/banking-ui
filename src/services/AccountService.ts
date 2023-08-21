import httpCommon from "../http-common"
import IAccountData from "../types/Account"
import authHeader from "./Auth-Header";

const getAll = () => {
    return httpCommon.get<Array<IAccountData>>("/user/accounts", { headers: authHeader() });
};

const get = (id: any) => {
    return httpCommon.get<IAccountData>(`/user/accounts/${id}`, { headers: authHeader() });
};

const create = (data: IAccountData) => {
    return httpCommon.post<IAccountData>("/user/accounts/new", data, { headers: authHeader() });
};

const update = (id: any, data: IAccountData) => {
    return httpCommon.put<IAccountData>(`/user/accounts/status/${id}`, data, { headers: authHeader() });
};

const findByProductType = (type: string) => {
    return httpCommon.get<Array<IAccountData>>(`/user/accounts/search?type=${type}`, { headers: authHeader() });
};

const AccountService = {
    getAll,
    get,
    create,
    update,
    findByProductType
};

export default AccountService;
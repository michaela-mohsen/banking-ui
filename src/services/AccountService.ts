import httpCommon from "../http-common"
import IAccountData from "../types/Account"

const getAll = () => {
    return httpCommon.get<Array<IAccountData>>("/accounts");
};

const get = (id: any) => {
    return httpCommon.get<IAccountData>(`/accounts/${id}`);
};

const create = (data: IAccountData) => {
    return httpCommon.post<IAccountData>("/accounts/new", data);
};

const update = (id: any, data: IAccountData) => {
    return httpCommon.put<IAccountData>(`/accounts/status/${id}`, data);
};

const findByProductType = (type: string) => {
    return httpCommon.get<Array<IAccountData>>(`/accounts/search?type=${type}`);
};

const AccountService = {
    getAll,
    get,
    create,
    update,
    findByProductType
};

export default AccountService;
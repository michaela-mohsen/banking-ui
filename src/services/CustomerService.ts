import httpCommon from "../http-common"
import ICustomerData from "../types/Customer"
import authHeader from "./Auth-Header";

const getAll = (params: any) => {
    return httpCommon.get<Array<ICustomerData>>("/user/customers", { params, headers: authHeader() });
}

const get = (id: any) => {
    return httpCommon.get<ICustomerData>(`/user/customers/${id}`, { headers: authHeader() })
}

const create = (data: ICustomerData) => {
    return httpCommon.post<ICustomerData>("/user/customers/new", data, { headers: authHeader() });
}

const update = (id: any, data: ICustomerData) => {
    return httpCommon.put<ICustomerData>(`/user/customers/update/${id}`, data, { headers: authHeader() });
}

const remove = (id: any) => {
    return httpCommon.delete<any>(`/customers/delete/${id}`, { headers: authHeader() });
}

const findByLastNameAndBirthDate = (lastName: string, birthDate: string) => {
    return httpCommon.get<ICustomerData>(`/customers/search?lastName=${lastName}&birthDate=${birthDate}`, { headers: authHeader() });
}

const CustomerService = {
    getAll,
    get,
    findByLastNameAndBirthDate,
    create,
    update,
    remove
};

export default CustomerService;
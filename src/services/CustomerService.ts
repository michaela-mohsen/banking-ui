import httpCommon from "../http-common"
import ICustomerData from "../types/Customer"

const getAll = (params: any) => {
    return httpCommon.get<Array<ICustomerData>>("/customers", { params });
}

const get = (id: any) => {
    return httpCommon.get<ICustomerData>(`/customers/${id}`)
}

const create = (data: ICustomerData) => {
    return httpCommon.post<ICustomerData>("/customers/new", data);
}

const update = (id: any, data: ICustomerData) => {
    return httpCommon.put<ICustomerData>(`/customers/update/${id}`, data);
}

const remove = (id: any) => {
    return httpCommon.delete<any>(`/customers/delete/${id}`);
}

const findByLastNameAndBirthDate = (lastName: string, birthDate: string) => {
    return httpCommon.get<ICustomerData>(`/customers/search?lastName=${lastName}&birthDate=${birthDate}`);
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
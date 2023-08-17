import IAccountData from "./Account"

export default interface ICustomerData {
    id?: any,
    birthDate: string,
    firstName: string,
    lastName: string,
    address: string,
    city: string,
    state: string,
    zipCode: string
    accounts: Array<IAccountData>
}
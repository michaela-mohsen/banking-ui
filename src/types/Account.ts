import ITransactionData from "./Transaction"

export default interface IAccountData {
    id?: any,
    availableBalance: number,
    pendingBalance: number,
    active: string,
    lastName: string,
    birthDate: string,
    branch: string,
    employee: number,
    product: string,
    lastActivityDate: string,
    openDate: string,
    transactions: Array<ITransactionData>
}
import httpCommon from "../http-common"
import ITransactionData from "../types/Transaction"
import authHeader from "./Auth-Header";

const create = (data: ITransactionData, params: any) => {
    return httpCommon.post<ITransactionData>("/user/transactions/new", data, { params, headers: authHeader() });
}

const TransactionService = {
    create
};

export default TransactionService;
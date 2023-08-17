import httpCommon from "../http-common"
import ITransactionData from "../types/Transaction"

const create = (data: ITransactionData, params: any) => {
    return httpCommon.post<ITransactionData>("/transactions/new", data, { params });
}

const TransactionService = {
    create
};

export default TransactionService;
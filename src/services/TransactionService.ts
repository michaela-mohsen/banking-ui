import httpCommon from "../http-common"
import ITransactionData from "../types/Transaction"

const create = (data: ITransactionData) => {
    return httpCommon.post<ITransactionData>("/transactions/new", data);
}

const TransactionService = {
    create
};

export default TransactionService;
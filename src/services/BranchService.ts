import httpCommon from "../http-common"
import IBranchData from "../types/Branch"

const getAll = () => {
    return httpCommon.get<Array<IBranchData>>("/branches");
}

const findByName = (name: string) => {
    return httpCommon.get<IBranchData>(`/branches/search?name=${name}`);
}

const BranchService = {
    getAll,
    findByName
};

export default BranchService;
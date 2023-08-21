import httpCommon from "../http-common"
import IBranchData from "../types/Branch"
import authHeader from "./Auth-Header";

const getAll = () => {
    return httpCommon.get<Array<IBranchData>>("/user/branches", { headers: authHeader() });
}

const findByName = (name: string) => {
    return httpCommon.get<IBranchData>(`/user/branches/search?name=${name}`, { headers: authHeader() });
}

const BranchService = {
    getAll,
    findByName
};

export default BranchService;
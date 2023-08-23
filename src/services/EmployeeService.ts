import httpCommon from "../http-common";
import IEmployeeData from "../types/Employee";
import authHeader from "./Auth-Header";

const findByEmail = (email: string) => {
    return httpCommon.get<IEmployeeData>(`/user/employees/search?email=${email}`, { headers: authHeader() });
}
const EmployeeService = {
    findByEmail
};

export default EmployeeService;
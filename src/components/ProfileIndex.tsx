import { useEffect, useState } from "react";
import AuthService from "../services/AuthService";
import EmployeeService from "../services/EmployeeService";
import IEmployeeData from "../types/Employee";

const ProfileIndex: React.FC = () => {
    const currentUser = AuthService.getCurrentUser();
    const initialEmployeeData = {
        id: 0,
        firstName: "",
        lastName: "",
        email: "",
        title: "",
        branch: "",
        startDate: "",
        department: "",
        oldPassword: "",
        newPassword: ""
    }

    const [currentEmployee, setCurrentEmployee] = useState<IEmployeeData>(initialEmployeeData);

    const getEmployeeByEmail = (email: string) => {
        EmployeeService.findByEmail(email).then((response: any) => {
            setCurrentEmployee(response.data);
        })
    }

    useEffect(() => {
        if (currentUser) getEmployeeByEmail(currentUser.email);
    }, []);

    return <div className="card mt-2">
        <div className="card-header">
            <h4 className="card-title text-primary text-uppercase">{currentEmployee.firstName} {currentEmployee.lastName}</h4>
            <h5 className="card-subtitle text-secondary">{currentEmployee.title}</h5>
        </div>
        <div className="card-body">
            <dl>
                <dt className="text-dark">Department</dt>
                <dd className="text-gray">{currentEmployee.department}</dd>
                <dt className="text-dark">Branch</dt>
                <dd className="text-gray">{currentEmployee.branch}</dd>
                <dt className="text-dark">Start Date</dt>
                <dd className="text-gray">{currentEmployee.startDate}</dd>
            </dl>
        </div>
    </div>
}
export default ProfileIndex;
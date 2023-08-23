import { useEffect, useState } from "react";
import AuthService from "../services/AuthService";
import EmployeeService from "../services/EmployeeService";
import IEmployeeData from "../types/Employee";

const Profile: React.FC = () => {
    const currentUser = AuthService.getCurrentUser();
    const initialEmployeeData = {
        id: 0,
        firstName: "",
        lastName: "",
        email: "",
        title: "",
        branch: "",
        startDate: "",
        department: ""
    }
    useEffect(() => {
        if (currentUser.email) getEmployeeByEmail(currentUser.email);
    }, [currentUser.email]);

    const [currentEmployee, setCurrentEmployee] = useState<IEmployeeData>(initialEmployeeData);

    const getEmployeeByEmail = (email: string) => {
        EmployeeService.findByEmail(email).then((response: any) => {
            setCurrentEmployee(response.data);
        })
    }

    return <div>There should be an employee here. Is it {currentEmployee.firstName}?</div>
};
export default Profile;
import { useState, useEffect, ChangeEvent } from "react";
import AuthService from "../services/AuthService";
import EmployeeService from "../services/EmployeeService";
import IEmployeeData from "../types/Employee";
import ICustomErrorData from "../types/CustomError";
import { useNavigate } from "react-router-dom";

const UpdateProfile: React.FC = () => {
    let navigate = useNavigate();
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
    const [branches] = useState<Array<string>>(["Headquarters", "Woburn Branch", "Quincy Branch", "So. NH Branch"]);
    const [titles] = useState<Array<string>>(["President", "Administrator", "Operations Manager", "Loan Manager", "Head Teller", "Teller"]);
    const [errorMessages, setErrorMessages] = useState<Array<ICustomErrorData>>(
        []
    );
    const [customErrorMessage, setCustomErrorMessage] = useState<string>("");
    const [noErrors, setNoErrors] = useState<boolean>(true);

    const getEmployeeByEmail = (email: string) => {
        EmployeeService.findByEmail(email).then((response: any) => {
            setCurrentEmployee(response.data);
        })
    }

    useEffect(() => {
        if (currentUser) getEmployeeByEmail(currentUser.email);
    }, []);

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setCurrentEmployee({ ...currentEmployee, [name]: value });
    };

    const handleOptionChange = (event: ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = event.target;
        setCurrentEmployee({ ...currentEmployee, [name]: value });
    }

    const updateEmployee = (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        let updateEmployeeFunction = EmployeeService.update(currentEmployee.id, currentEmployee);
        updateEmployeeFunction.then((response) => {
            setNoErrors(true);
            navigate("/profile");
        }).catch((error) => {
            if (Array.isArray(error.response.data)) {
                setNoErrors(false);
                setErrorMessages(Array.from(error.response.data));
            } else {
                setNoErrors(false);
                setCustomErrorMessage(error.response.data);
            }
        })
    }

    const renderTitles = (currentTitle: string) => {
        titles.forEach((title) => {
            const el = document.getElementById(currentTitle);
            if (title === currentTitle) {
                el?.setAttribute("selected", "");
            }
        })
        return <select
            className="form-select"
            id="title"
            name="title"
            onInput={handleOptionChange}>
            {titles.map((title, id) => (
                <option key={id} id={`${title}`} value={title}>
                    {title}
                </option>
            ))}
        </select>
    }

    const renderBranches = (currentBranch: string) => {
        branches.forEach((branch) => {
            const el = document.getElementById(currentBranch);
            if (branch === currentBranch) {
                el?.setAttribute("checked", "");
            }
        })
        return <div>
            {branches?.map((branch, id) => (
                <label className="form-radio" key={id}>
                    <input
                        id={`${branch}`}
                        type="radio"
                        name="branch"
                        value={branch}
                        onChange={handleInputChange}
                        placeholder="branch"
                    />
                    <em className="form-icon"></em>
                    {branch}
                </label>
            ))}
        </div>
    }


    const renderErrorMessage = (field: string) => {
        let messages: string[] = [];
        const el = document.getElementById(field + "-group");
        el?.setAttribute("class", "form-group")
        if (!noErrors && errorMessages.length > 0) {
            errorMessages.forEach((eMessage) => {
                if (eMessage.field === field) {
                    el?.setAttribute("class", "form-group has-error")
                    messages.push(eMessage.message + " ");
                }
            });
        }
        return <div className="form-input-hint">{messages}</div>;
    }

    const renderCustomErrorMessage = () => {
        if (!noErrors && customErrorMessage !== "") {
            return <div className="toast toast-error">{customErrorMessage}</div>
        }
    }

    return <div>
        {currentEmployee ? (
            <div>
                <form className="card m-2 form-horizontal" onSubmit={updateEmployee}>
                    <div className="card-body columns">
                        {renderCustomErrorMessage()}
                        <div className="column col-12 py-2">
                            <div className="form-group" id="firstName-group">
                                <div className="col-3 col-sm-12">
                                    <label className="form-label" htmlFor="firstName">
                                        First Name:
                                    </label>
                                </div>
                                <div className="col-9 col-sm-12">
                                    <input className="form-input" title="firstName" name="firstName" type="text" value={currentEmployee.firstName} onChange={handleInputChange} />
                                </div>
                                {renderErrorMessage("firstName")}
                            </div>
                        </div>
                        <div className="column col-12 py-2">
                            <div className="form-group" id="lastName-group">
                                <div className="col-3 col-sm-12">
                                    <label className="form-label" htmlFor="lastName">
                                        Last Name:
                                    </label>
                                </div>
                                <div className="col-9 col-sm-12">
                                    <input className="form-input" title="lastName" name="lastName" type="text" value={currentEmployee.lastName} onChange={handleInputChange} />
                                </div>
                            </div>
                        </div>
                        <div className="column col-12 py-2">
                            <div className="form-group" id="email-group">
                                <div className="col-3 col-sm-12">
                                    <label className="form-label" htmlFor="email">
                                        Email:
                                    </label>
                                </div>
                                <div className="col-9 col-sm-12">
                                    <input className="form-input" title="email" name="email" type="email" value={currentEmployee.email} onChange={handleInputChange} />
                                </div>
                                {renderErrorMessage("email")}
                            </div>
                        </div>
                        <div className="column col-12 py-2">
                            <div className="form-group" id="title-group">
                                <div className="col-3 col-sm-12">
                                    <label className="form-label form-label-inline" htmlFor="title">
                                        Title:
                                    </label>
                                </div>
                                <div className="col-9 col-sm-12">
                                    {renderTitles(currentEmployee.title)}
                                    {renderErrorMessage("title")}
                                </div>
                            </div>
                        </div>
                        <div className="column col-12 py-2">
                            <div className="form-group" id="branch-group">
                                <div className="col-3 col-sm-12">
                                    <label className="form-label form-label-inline" htmlFor="branch">
                                        Branch:
                                    </label>
                                </div>
                                <div className="col-9 col-sm-12">
                                    {renderBranches(currentEmployee.branch)}
                                </div>
                            </div>
                        </div>
                        <div className="column col-12 py-2">
                            <div className="form-group" id="oldPassword-group">
                                <div className="col-3 col-sm-12">
                                    <label className="form-label" htmlFor="oldPassword">
                                        Current Password:
                                    </label>
                                </div>
                                <div className="col-9 col-sm-12">
                                    <input className="form-input" title="oldPassword" name="oldPassword" type="password" value={currentEmployee.oldPassword} onChange={handleInputChange} />
                                </div>
                                {renderErrorMessage("oldPassword")}
                            </div>
                        </div>
                        <div className="column col-12 py-2">
                            <div className="form-group" id="newPassword-group">
                                <div className="col-3 col-sm-12">
                                    <label className="form-label" htmlFor="newPassword">
                                        New Password:
                                    </label>
                                </div>
                                <div className="col-9 col-sm-12">
                                    <input className="form-input" title="newPassword" name="newPassword" type="password" value={currentEmployee.newPassword} onChange={handleInputChange} />
                                </div>
                                {renderErrorMessage("newPassword")}
                            </div>
                        </div>
                    </div>
                    <div className="card-footer text-center">
                        <button className="btn btn-primary" type="submit">
                            Update
                        </button>
                    </div>
                </form>
            </div>)
            : (<div>no one is here!</div>)}
    </div>
}

export default UpdateProfile;
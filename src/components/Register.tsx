import { ChangeEvent, useState } from "react";
import IRegisterData from "../types/Register";
import ICustomErrorData from "../types/CustomError";
import AuthService from "../services/AuthService";
import { Link } from "react-router-dom";

const Register: React.FC = () => {
    const initialRegisterState = {
        id: 0,
        email: "",
        password: "",
        confirmPassword: "",
        firstName: "",
        lastName: "",
        title: "",
        avatar: "",
        branch: ""
    }

    const [submitted, setSubmitted] = useState<boolean>(false);
    const [register, setRegister] = useState<IRegisterData>(initialRegisterState);
    const [noErrors, setNoErrors] = useState<boolean>(true);
    const [errorMessages, setErrorMessages] = useState<Array<ICustomErrorData>>([]);
    const [customErrorMessage, setCustomErrorMessage] = useState<string>("");
    const [branches] = useState<Array<string>>(["Headquarters", "Woburn Branch", "Quincy Branch", "So. NH Branch"]);
    const [titles] = useState<Array<string>>(["Administrator", "Operations Manager", "Loan Manager", "Head Teller", "Teller"]);

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setRegister({ ...register, [name]: value });
    }

    const handleOptionChange = (event: ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = event.target;
        setRegister({ ...register, [name]: value });
    }

    const handleRegister = (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        let data = {
            email: register.email,
            password: register.password,
            confirmPassword: register.confirmPassword,
            firstName: register.firstName,
            lastName: register.lastName,
            title: register.title,
            avatar: register.avatar,
            branch: register.branch
        }

        let registerFunction = AuthService.register(data);
        registerFunction.then((response: any) => {
            setRegister(response.data);
            setNoErrors(true);
            setSubmitted(true);
        }).catch((error) => {
            setSubmitted(false);
            if (Array.isArray(error.response.data)) {
                setNoErrors(false);
                setErrorMessages(Array.from(error.response.data));
            } else {
                setNoErrors(false);
                setCustomErrorMessage(error.response.data);
            }
        })
    }

    const renderErrorMessages = (field: string) => {
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

    return <div className="card p-centered mt-2">
        <div className="card-header">
            <h3 className="card-title text-center">User Account Registration</h3>
        </div>
        <div className="card-body">
            {submitted ? (<div className="toast toast-primary p-2"><Link to="/login" className="btn btn-link text-light">User registered successfully. Please log in.</Link></div>) : (<form
                className="form-horizontal px-2 s-rounded" onSubmit={handleRegister}>
                <div className="columns">
                    {renderCustomErrorMessage()}
                    <div className="column col-12 py-2">
                        <div className="form-group" id="firstName-group">
                            <div className="column col-4">
                                <label className="form-label form-label-inline" htmlFor="firstName">
                                    First Name:
                                </label>
                            </div>
                            <div className="column col-8">
                                <input
                                    id="firstName"
                                    className="form-input"
                                    type="text"
                                    name="firstName"
                                    value={register.firstName}
                                    onChange={handleInputChange} />
                                {renderErrorMessages("firstName")}
                            </div>
                        </div>
                    </div>
                    <div className="column col-12 py-2">
                        <div className="form-group" id="lastName-group">
                            <div className="column col-4">
                                <label className="form-label form-label-inline" htmlFor="lastName">
                                    Last Name:
                                </label>
                            </div>
                            <div className="column col-8">
                                <input
                                    id="lastName"
                                    className="form-input"
                                    type="text"
                                    name="lastName"
                                    value={register.lastName}
                                    onChange={handleInputChange}
                                />
                                {renderErrorMessages("lastName")}
                            </div>
                        </div>
                    </div>
                    <div className="column col-12 py-2">
                        <div className="form-group" id="title-group">
                            <div className="column col-4">
                                <label className="form-label form-label-inline" htmlFor="title">
                                    Title:
                                </label>
                            </div>
                            <div className="column col-8">
                                <select
                                    className="form-select"
                                    id="title"
                                    name="title"
                                    onInput={handleOptionChange}>
                                    <option value={""}>Select a title</option>
                                    {titles?.map((title, id) => (
                                        <option key={id} value={title}>
                                            {title}
                                        </option>
                                    ))}
                                </select>
                                {renderErrorMessages("title")}
                            </div>
                        </div>
                    </div>
                    <div className="column col-12 py-2">
                        <div className="form-group" id="branch-group">
                            <div className="column col-4">
                                <label className="form-label form-label-inline" htmlFor="branch">
                                    Branch:
                                </label>
                            </div>
                            <div className="column col-8">
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
                                {renderErrorMessages("branch")}
                            </div>
                        </div>
                    </div>
                    <div className="column col-12 py-2">
                        <div className="form-group" id="email-group">
                            <div className="column col-4">
                                <label className="form-label form-label-inline" htmlFor="email">
                                    Email:
                                </label>
                            </div>
                            <div className="column col-8">
                                <input
                                    id="email"
                                    className="form-input"
                                    type="email"
                                    name="email"
                                    value={register.email}
                                    onChange={handleInputChange}
                                />
                                {renderErrorMessages("email")}
                            </div>
                        </div>
                    </div>
                    <div className="column col-12 py-2">
                        <div className="form-group" id="password-group">
                            <div className="column col-4">
                                <label className="form-label form-label-inline" htmlFor="password">
                                    Password:
                                </label>
                            </div>
                            <div className="column col-8">
                                <input
                                    id="password"
                                    className="form-input"
                                    type="password"
                                    name="password"
                                    value={register.password}
                                    onChange={handleInputChange}
                                />
                                {renderErrorMessages("password")}
                            </div>
                        </div>
                    </div>
                    <div className="column col-12 py-2">
                        <div className="form-group" id="confirmPassword-group">
                            <div className="column col-4">
                                <label
                                    className="form-label form-label-inline"
                                    htmlFor="confirmPassword">
                                    Confirm Password:
                                </label>
                            </div>
                            <div className="column col-8">
                                <input
                                    id="confirmPassword"
                                    className="form-input"
                                    type="password"
                                    name="confirmPassword"
                                    value={register.confirmPassword}
                                    onChange={handleInputChange}
                                />
                                {renderErrorMessages("confirmPassword")}
                            </div>
                        </div>
                    </div>
                </div>
                <button type="submit" className="btn btn-success p-centered">
                    Register
                </button>
            </form>)}
        </div>
    </div>
};
export default Register;
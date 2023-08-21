import { ChangeEvent, useEffect, useState } from "react";
import ILoginData from "../types/Login";
import ICustomErrorData from "../types/CustomError";
import { Link, useNavigate } from "react-router-dom";
import { Form } from "react-hooks-form";
import AuthService from "../services/AuthService";
import IUserData from "../types/User";

const Login: React.FC = () => {
    let navigate = useNavigate();

    const initialLoginState = {
        username: "",
        password: ""
    }

    const [loginPage, setLoginPage] = useState<string>("");

    const [login, setLogin] = useState<ILoginData>(initialLoginState);
    const [noErrors, setNoErrors] = useState<boolean>(true);
    const [errorMessages, setErrorMessages] = useState<Array<ICustomErrorData>>([]);
    const [customErrorMessage, setCustomErrorMessage] = useState<string>("");

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setLogin({ ...login, [name]: value });
    }

    useEffect(() => {
        handleLoginPage();
    }, []);

    const handleLoginPage = () => {
        let loginPageFunction = AuthService.loginPage();
        loginPageFunction.then((response: any) => {
            setLoginPage(response.data)
        });
    }

    const handleLogin = () => {
        let data = {
            username: login.username,
            password: login.password
        }

        let loginFunction = AuthService.login(data);
        loginFunction.then((response: any) => {
            if (response.data) {
                localStorage.setItem("user", JSON.stringify(response.data));
            }
            navigate("/profile")
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

    return <div className="card p-centered col-6 mt-2">
        <div className="card-header">
            <h2 className="card-title text-center">Login</h2>
        </div>
        <Form className="card-body form-horizontal s-rounded" onSubmit={handleLogin}>
            <div className="columns">
                {renderCustomErrorMessage()}
                <div className="column col-12 py-2">
                    <div className="form-group" id="username-group">
                        <div className="col-3 col-sm-12">
                            <label className="form-label" htmlFor="username">Username:</label>
                        </div>
                        <div className="col-9 col-sm-12">
                            <input className="form-input" title="username" name="username" type="text" value={login.username} onChange={handleInputChange} />
                        </div>
                        {renderErrorMessages("username")}
                    </div>
                </div>
                <div className="column col-12 py-2">
                    <div className="form-group" id="password-group">
                        <div className="col-3 col-sm-12">
                            <label className="form-label" htmlFor="password">Password:</label>
                        </div>
                        <div className="col-9 col-sm-12">
                            <input className="form-input" title="password" name="password" type="password" value={login.password} onChange={handleInputChange} />
                        </div>
                        {renderErrorMessages("password")}
                    </div>
                </div>
                <div className="column py-2 text-center">
                    <button className="btn btn-primary" type="submit">Log in</button>
                </div>
            </div>
        </Form>
        <div className="card-footer text-center">
            <span>New User? Register here.</span>
        </div>
    </div>
};

export default Login;
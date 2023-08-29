import { useEffect, useState } from "react";
import { NavLink, Outlet, useParams } from "react-router-dom";
import ICustomerData from "../types/Customer";
import CustomerService from "../services/CustomerService";

const Customer: React.FC = () => {
    const { id } = useParams();
    const initialCustomerState = {
        id: null,
        birthDate: "",
        firstName: "",
        lastName: "",
        address: "",
        city: "",
        state: "",
        zipCode: "",
        accounts: []
    };
    const [currentCustomer, setCurrentCustomer] =
        useState<ICustomerData>(initialCustomerState);

    const getCustomer = (id: string) => {
        CustomerService.get(id).then((response) => {
            setCurrentCustomer(response.data);
        })
    }

    useEffect(() => {
        if (id) getCustomer(id);
    }, [id]);

    const renderAccounts = (numberOfAccounts: number) => {
        if (numberOfAccounts > 0) {
            return <div>
                <button className="btn btn-link text-dark" disabled>Accounts</button>
                <ul className="nav">
                    {currentCustomer.accounts.map((account) => (
                        <li key={account?.id} className="nav-item" id={"account-" + account.id}><NavLink
                            to={"/customers/" + currentCustomer.id + "/accounts/" + account.id}
                            className={({ isActive }) => isActive ? "btn btn-link active" : "btn btn-link"}>
                            {account.product}
                        </NavLink></li>
                    ))}
                </ul>
            </div>
        }
    }

    return <div className="columns">
        <div className="column col-4 text-left">
            <ul className="nav">
                <li className="nav-item">
                    <NavLink className={({ isActive }) => isActive ? "btn btn-link active" : "btn btn-link"} to={"/customers/" + currentCustomer.id + "/update"}>Update customer information</NavLink>
                </li>
                <li className="nav-item">
                    <NavLink className={({ isActive }) => isActive ? "btn btn-link active" : "btn btn-link"} to={"/customers/" + currentCustomer.id + "/add-account"}>Add a new account</NavLink>
                </li>
                <li className="nav-item" id="accounts-link">
                    {renderAccounts(currentCustomer.accounts.length)}
                </li>
            </ul>
        </div>
        <div className="column col-8">
            <Outlet />
        </div>
    </div>
}

export default Customer;
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ICustomerData from "../types/Customer";
import CustomerService from "../services/CustomerService";
import IAccountData from "../types/Account";

const CustomerIndex: React.FC = () => {
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

    const [activeAccounts, setActiveAccounts] = useState<Array<IAccountData>>([]);
    const [inactiveAccounts, setInactiveAccounts] = useState<Array<IAccountData>>([]);


    const getCustomer = (id: string) => {
        CustomerService.get(id).then((response) => {
            setCurrentCustomer(response.data);
            getAccounts(response.data.accounts);
        })
    }

    useEffect(() => {
        if (id) getCustomer(id);
    }, [id]);

    const getAccounts = (accounts: Array<IAccountData>) => {
        let activeAccounts: Array<IAccountData> = [];
        let inactiveAccounts: Array<IAccountData> = [];

        if (accounts.length > 0) {
            accounts.forEach((account) => {
                if (account.active === "true") {
                    activeAccounts.push(account);
                } else {
                    inactiveAccounts.push(account);
                }
            });
        }
        setActiveAccounts(activeAccounts);
        setInactiveAccounts(inactiveAccounts);
    }

    return <div className="empty">
        <div className="empty-icon">
            <i className="icon icon-people"></i>
        </div>
        <p className="empty-title h5">{currentCustomer.firstName} {currentCustomer.lastName}</p>
        <p className="empty-subtitle">{inactiveAccounts.length} inactive account(s) | {activeAccounts.length} active account(s)</p>
    </div>;
}
export default CustomerIndex;
import { ChangeEvent, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import CustomerService from "../services/CustomerService";
import ICustomerData from "../types/Customer";
import { Form } from "react-hooks-form";
import ICustomErrorData from "../types/CustomError";

const UpdateCustomer: React.FC = (props) => {
    const { id } = useParams();
    let navigate = useNavigate();

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

    const [currentCustomer, setCurrentCustomer] = useState<ICustomerData>(initialCustomerState);
    const [errorMessages, setErrorMessages] = useState<Array<ICustomErrorData>>(
        []
    );
    const [noErrors, setNoErrors] = useState<boolean>(true);

    const getCustomer = (id: string) => {
        CustomerService.get(id).then((response) => {
            setCurrentCustomer(response.data);
        })
    }

    useEffect(() => {
        if (id) getCustomer(id);
    }, [id]);

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setCurrentCustomer({ ...currentCustomer, [name]: value });
    };

    const updateCustomer = () => {
        let updateCustomerFunction = CustomerService.update(currentCustomer.id, currentCustomer);

        updateCustomerFunction.then((response) => {
            setNoErrors(true);
            navigate("/customers");
        }).catch((error) => {
            if (Array.isArray(error.response.data)) {
                setErrorMessages(Array.from(error.response.data));
                setNoErrors(false);
            }
        });
        return updateCustomerFunction;
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

    return <div>
        {currentCustomer ? (
            <div>
                <Form className="card m-2 form-horizontal" onSubmit={updateCustomer}>
                    <div className="card-header">
                        <h3 className="card-title text-center">Update Customer Information</h3>
                    </div>
                    <div className="card-body">
                        <div className="column col-12 py-2">
                            <div className="form-group" id="firstName-group">
                                <div className="col-3 col-sm-12">
                                    <label className="form-label" htmlFor="firstName">
                                        First Name:
                                    </label>
                                </div>
                                <div className="col-9 col-sm-12">
                                    <input
                                        className="form-input"
                                        type="text"
                                        id="firstName"
                                        value={currentCustomer.firstName}
                                        onChange={handleInputChange}
                                        name="firstName"
                                    />
                                    {renderErrorMessage("firstName")}
                                </div>

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
                                    <input
                                        className="form-input"
                                        type="text"
                                        id="lastName"
                                        value={currentCustomer.lastName}
                                        onChange={handleInputChange}
                                        name="lastName"
                                    />
                                    {renderErrorMessage("lastName")}
                                </div>

                            </div>
                        </div>
                        <div className="column col-12 py-2">
                            <div className="form-group" id="birthDate-group">
                                <div className="col-3 col-sm-12">
                                    <label className="form-label" htmlFor="birthDate">
                                        Birth Date:
                                    </label>
                                </div>
                                <div className="col-9 col-sm-12">
                                    <input
                                        className="form-input"
                                        type="date"
                                        id="birthDate"
                                        value={currentCustomer.birthDate}
                                        onChange={handleInputChange}
                                        name="birthDate"
                                    />
                                    {renderErrorMessage("birthDate")}
                                </div>
                            </div>
                        </div>
                        <div className="column col-12 py-2">
                            <div className="form-group" id="address-group">
                                <div className="col-3 col-sm-12">
                                    <label className="form-label" htmlFor="address">
                                        Address:
                                    </label>
                                </div>
                                <div className="col-9 col-sm-12">
                                    <input
                                        className="form-input"
                                        type="text"
                                        id="address"
                                        value={currentCustomer.address}
                                        onChange={handleInputChange}
                                        name="address"
                                    />
                                    {renderErrorMessage("address")}
                                </div>
                            </div>
                        </div>
                        <div className="column col-12 py-2">
                            <div className="form-group" id="city-group">
                                <div className="col-3 col-sm-12">
                                    <label className="form-label" htmlFor="city">
                                        City:
                                    </label>
                                </div>
                                <div className="col-9 col-sm-12">
                                    <input
                                        className="form-input"
                                        type="text"
                                        id="city"
                                        value={currentCustomer.city}
                                        onChange={handleInputChange}
                                        name="city"
                                    />
                                    {renderErrorMessage("city")}
                                </div>
                            </div>
                        </div>
                        <div className="column col-12 py-2">
                            <div className="form-group" id="state-group">
                                <div className="col-3 col-sm-12">
                                    <label className="form-label" htmlFor="state">
                                        State:
                                    </label>
                                </div>
                                <div className="col-9 col-sm-12">
                                    <input
                                        className="form-input"
                                        type="text"
                                        id="state"
                                        value={currentCustomer.state}
                                        onChange={handleInputChange}
                                        name="state"
                                    />
                                    {renderErrorMessage("state")}
                                </div>
                            </div>
                        </div>
                        <div className="column col-12 py-2">
                            <div className="form-group" id="zipCode-group">
                                <div className="col-3 col-sm-12">
                                    <label className="form-label" htmlFor="zipCode">
                                        Zip Code:
                                    </label>
                                </div>
                                <div className="col-9 col-sm-12">
                                    <input
                                        className="form-input"
                                        type="text"
                                        id="zipCode"
                                        value={currentCustomer.zipCode}
                                        onChange={handleInputChange}
                                        name="zipCode"
                                    />
                                    {renderErrorMessage("zipCode")}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="card-footer text-center">
                        <button className="btn btn-primary" type="submit">
                            Submit
                        </button>
                    </div>
                </Form>
            </div>
        ) : (<div>couldn't find a customer!</div>)}
    </div>;
};
export default UpdateCustomer;
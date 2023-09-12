import { ChangeEvent, useState } from "react";
import ICustomerData from "../types/Customer";
import CustomerService from "../services/CustomerService";
import { useNavigate } from "react-router-dom";
import ICustomErrorData from "../types/CustomError";
import { Form } from "react-hooks-form";

const AddCustomer: React.FC = () => {
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
	let navigate = useNavigate();
	const [customer, setCustomer] = useState<ICustomerData>(initialCustomerState);
	const [submitted, setSubmitted] = useState<boolean>(false);
	const [errorMessages, setErrorMessages] = useState<Array<ICustomErrorData>>(
		[]
	);
	const [noErrors, setNoErrors] = useState<boolean>(true);
	const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
		const { name, value } = event.target;
		setCustomer({ ...customer, [name]: value });
	};

	const saveCustomer = () => {
		let data = {
			birthDate: customer.birthDate,
			firstName: customer.firstName,
			lastName: customer.lastName,
			address: customer.address,
			city: customer.city,
			state: customer.state,
			zipCode: customer.zipCode,
			accounts: []
		};

		let createCustomerFunction = CustomerService.create(data);

		createCustomerFunction
			.then((response: any) => {
				setCustomer({
					birthDate: response.data.birthDate,
					firstName: response.data.firstName,
					lastName: response.data.lastName,
					address: response.data.address,
					city: response.data.city,
					state: response.data.state,
					zipCode: response.data.zipCode,
					accounts: response.data.accounts
				});
				setSubmitted(true);
				setNoErrors(true);
				navigate("/customers");
			}).catch((error) => {
				if (Array.isArray(error.response.data)) {
					setErrorMessages(Array.from(error.response.data));
					setNoErrors(false);
				}
			});
		return createCustomerFunction;
	};

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
	return (
		<div>
			<Form className="card m-2 form-horizontal" onSubmit={saveCustomer}>
				<div className="card-header">
					<h3 className="card-title text-center">Add New Customer</h3>
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
									value={customer.firstName}
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
									value={customer.lastName}
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
									value={customer.birthDate}
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
									value={customer.address}
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
									value={customer.city}
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
									value={customer.state}
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
									value={customer.zipCode}
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
	);
};

export default AddCustomer;

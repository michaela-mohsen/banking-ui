import { ChangeEvent, useEffect, useState } from "react";
import IAccountData from "../types/Account";
import AccountService from "../services/AccountService";
import IBranchData from "../types/Branch";
import BranchService from "../services/BranchService";
import IProductData from "../types/Product";
import ProductService from "../services/ProductService";
import { Form } from "react-hooks-form";
import ICustomErrorData from "../types/CustomError";
import IEmployeeData from "../types/Employee";
import EmployeeService from "../services/EmployeeService";
import { useNavigate, useParams } from "react-router-dom";
import ICustomerData from "../types/Customer";
import CustomerService from "../services/CustomerService";

const AddAccount: React.FC = () => {
	const { id } = useParams();

	const navigate = useNavigate();
	const currentUser = localStorage.getItem("user");

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

	const initialAccountState = {
		id: null,
		availableBalance: 0,
		pendingBalance: 0,
		active: "true",
		lastName: "",
		birthDate: "",
		branch: "",
		employee: 0,
		product: "",
		lastActivityDate: "",
		openDate: "",
		transactions: [],
	};

	const initialEmployeeState = {
		id: 0,
		firstName: "",
		lastName: "",
		email: "",
		branch: "",
		department: "",
		startDate: "",
		title: "",
		oldPassword: "",
		newPassword: ""
	}

	const [account, setAccount] = useState<IAccountData>(initialAccountState);
	const [employee, setEmployee] = useState<IEmployeeData>(initialEmployeeState);
	const [customer, setCustomer] = useState<ICustomerData>(initialCustomerState);
	const [noErrors, setNoErrors] = useState<boolean>(true);
	const [branches, setBranches] = useState<Array<IBranchData>>([]);
	const [products, setProducts] = useState<Array<IProductData>>([]);
	const [errorMessages, setErrorMessages] = useState<Array<ICustomErrorData>>(
		[]
	);
	const [customErrorMessage, setCustomErrorMessage] = useState<string>("");

	useEffect(() => {
		findAllBranches();
	}, [branches]);

	useEffect(() => {
		findAllProducts();
	}, [products]);

	useEffect(() => {
		if (currentUser) {
			const userString = JSON.parse(currentUser);
			findEmployeeByEmail(userString.email);
		}
	}, [currentUser]);

	useEffect(() => {
		if (id) findCustomer(id);
	}, [id]);

	const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
		const { name, value } = event.target;
		setAccount({ ...account, [name]: value });
	};

	const handleOptionChange = (event: ChangeEvent<HTMLSelectElement>) => {
		const { name, value } = event.currentTarget;
		setAccount({ ...account, [name]: value });
	};

	const findAllBranches = () => {
		BranchService.getAll().then((response: any) => {
			setBranches(response.data);
		});
	};

	const findAllProducts = () => {
		ProductService.getAll().then((response: any) => {
			setProducts(response.data);
		});
	};

	const findEmployeeByEmail = (email: string) => {
		EmployeeService.findByEmail(email).then((response: any) => {
			setEmployee(response.data);
		});
	};

	const findCustomer = (id: string) => {
		CustomerService.get(id).then((response: any) => {
			setCustomer(response.data);
		})
	};

	const renderBranchOptions = (branchName: string) => {

		branches.forEach((branch) => {
			const el = document.getElementById(branch.name);
			if (branch.name === branchName) {
				el?.setAttribute("checked", "");
				el?.setAttribute("disabled", "");
			} else {
				el?.setAttribute("disabled", "");
			}

		});
		return <div>
			{branches?.map((branch) => (
				<label className="form-radio" key={branch.id}>
					<input
						id={`${branch.name}`}
						type="radio"
						name="branch"
						value={branch.name}
						onChange={handleInputChange}
						placeholder="branch"
					/>
					<em className="form-icon"></em>
					{branch.name}
				</label>
			))}
		</div>
	}

	const saveAccount = (e: { preventDefault: () => void; }) => {
		e.preventDefault();
		let data = {
			availableBalance: account.availableBalance,
			pendingBalance: account.pendingBalance,
			active: account.active,
			lastName: customer.lastName,
			birthDate: customer.birthDate,
			branch: employee.branch,
			employee: employee.id,
			product: account.product,
			lastActivityDate: account.lastActivityDate,
			openDate: account.openDate,
			transactions: account.transactions,
		};

		let createAccountFunction = AccountService.create(data);

		createAccountFunction
			.then((response: any) => {
				setAccount({
					id: response.data.id,
					availableBalance: response.data.availableBalance,
					pendingBalance: response.data.pendingBalance,
					active: response.data.active,
					lastName: response.data.lastName,
					birthDate: response.data.birthDate,
					branch: response.data.branch,
					employee: response.data.employee,
					product: response.data.product,
					openDate: response.data.openDate,
					lastActivityDate: response.data.lastActivityDate,
					transactions: response.data.transactions,
				});
				setNoErrors(true);
				navigate("/customers/" + customer.id);
				window.location.reload();
			})
			.catch((error) => {
				if (Array.isArray(error.response.data)) {
					setErrorMessages(Array.from(error.response.data));
					setNoErrors(false);
				} else {
					setNoErrors(false);
					setCustomErrorMessage(error.response.data);
				}
			});
		return createAccountFunction;
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

	const renderCustomErrorMessage = () => {
		if (!noErrors && customErrorMessage !== "") {
			return <div className="toast toast-error">{customErrorMessage}</div>
		}
	}

	return (
		<div>
			<form className="card m-2 form-horizontal" onSubmit={saveAccount}>
				<div className="card-header">
					<h3 className="card-title text-center">New Account</h3>
				</div>
				<div className="card-body columns">
					{renderCustomErrorMessage()}
					<div className="column col-12 py-2">
						<div className="form-group" id="product-group">
							<div className="col-3 col-sm-12">
								<label className="form-label" htmlFor="product">
									Product:
								</label>
							</div>
							<div className="col-9 col-sm-12">
								<select
									className="form-select"
									id="product"
									name="product"
									onInput={handleOptionChange}>
									<option value={""}>Select a product</option>
									{products?.map((product) => (
										<option key={product.id} value={product.name}>
											{product.name}
										</option>
									))}
								</select>
								{renderErrorMessage("product")}
							</div>
						</div>
					</div>
					<div className="column col-12 py-2">
						<div className="form-group" id="availableBalance-group">
							<div className="col-3 col-sm-12">
								<label className="form-label" htmlFor="availableBalance">
									Available Balance:
								</label>
							</div>
							<div className="col-9 col-sm-12">
								<input
									className="form-input"
									title="availableBalanceError"
									name="availableBalance"
									type="number"
									value={account.availableBalance}
									onChange={handleInputChange}
								/>
								{renderErrorMessage("availableBalance")}
							</div>
						</div>
					</div>
					<div className="column col-12 py-2">
						<div className="form-group" id="pendingBalance-group">
							<div className="col-3 col-sm-12">
								<label className="form-label" htmlFor="pendingBalance">
									Pending Balance:
								</label>
							</div>
							<div className="col-9 col-sm-12">
								<input
									title="pendingBalanceError"
									className="form-input"
									type="number"
									name="pendingBalance"
									value={account.pendingBalance}
									onChange={handleInputChange}
								/>
								{renderErrorMessage("pendingBalance")}
							</div>
						</div>
					</div>
					<div className="column col-12 py-2">
						<div className="form-group" id="lastName-group">
							<div className="col-3 col-sm-12">
								<label className="form-label" htmlFor="lastName">
									Customer's Last Name:
								</label>
							</div>
							<div className="col-9 col-sm-12">
								<input
									id="lastName"
									className="form-input"
									type="text"
									name="lastName"
									value={customer.lastName}
									onChange={handleInputChange}
									disabled
								/>
								{renderErrorMessage("lastName")}
							</div>
						</div>
					</div>
					<div className="column col-12 py-2">
						<div className="form-group" id="birthDate-group">
							<div className="col-3 col-sm-12">
								<label className="form-label" htmlFor="birthDate">
									Customer's DOB:
								</label>
							</div>
							<div className="col-9 col-sm-12">
								<input
									className="form-input"
									type="date"
									value={customer.birthDate}
									onChange={handleInputChange}
									name="birthDate"
									id="birthDate"
									disabled
								/>
								{renderErrorMessage("birthDate")}
							</div>
						</div>
					</div>
					<div className="column col-12 py-2">
						<div className="form-group" id="branch-group">
							<div className="col-3">Branch:</div>
							<div className="col-9">
								{renderBranchOptions(employee.branch)}
							</div>
						</div>
					</div>
					<div className="column col-12 py-2">
						<div className="form-group" id="employee-group">
							<div className="col-3 col-sm-12">
								<label className="form-label" htmlFor="employee">
									Employee:
								</label>
							</div>
							<div className="col-9 col-sm-12">
								<input
									className="form-input"
									type="number"
									id="employee"
									value={employee.id}
									onChange={handleInputChange}
									name="employee"
									disabled
								/>
								{renderErrorMessage("employee")}
							</div>
						</div>
					</div>
				</div>
				<div className="card-footer text-center">
					<button className="btn btn-primary" type="submit">
						Create
					</button>
				</div>
			</form>
		</div>
	);
};

export default AddAccount;

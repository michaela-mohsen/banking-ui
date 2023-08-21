import { ChangeEvent, useEffect, useState } from "react";
import IAccountData from "../types/Account";
import AccountService from "../services/AccountService";
import IBranchData from "../types/Branch";
import BranchService from "../services/BranchService";
import IProductData from "../types/Product";
import ProductService from "../services/ProductService";
import { Form } from "react-hooks-form";
import ICustomErrorData from "../types/CustomError";
import TokenService from "../services/TokenService";

const AddAccount: React.FC = () => {
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

	const [account, setAccount] = useState<IAccountData>(initialAccountState);
	const [noErrors, setNoErrors] = useState<boolean>(true);
	const [branches, setBranches] = useState<Array<IBranchData>>([]);
	const [products, setProducts] = useState<Array<IProductData>>([]);
	const [errorMessages, setErrorMessages] = useState<Array<ICustomErrorData>>(
		[]
	);
	useEffect(() => {
		findAllBranches();
	}, [branches]);

	useEffect(() => {
		findAllProducts();
	}, [products]);

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

	const saveAccount = () => {
		let data = {
			availableBalance: account.availableBalance,
			pendingBalance: account.pendingBalance,
			active: account.active,
			lastName: account.lastName,
			birthDate: account.birthDate,
			branch: account.branch,
			employee: account.employee,
			product: account.product,
			lastActivityDate: account.lastActivityDate,
			openDate: account.openDate,
			transactions: account.transactions,
		};

		let createAccountFunction = AccountService.create(data);

		createAccountFunction
			.then((response: any) => {
				setAccount({
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
			})
			.catch((error) => {
				if (Array.isArray(error.response.data)) {
					setErrorMessages(Array.from(error.response.data));
					setNoErrors(false);
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

	return (
		<div>
			<Form className="card m-2 form-horizontal" onSubmit={saveAccount}>
				<div className="card-header">
					<h2 className="card-title text-center">New Account</h2>
				</div>
				<div className="card-body columns">
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
									value={account.lastName}
									onChange={handleInputChange}
								/>
								{renderErrorMessage("lastName")}
							</div>
						</div>
					</div>
					<div className="column col-12 py-2">
						<div className="form-group" id="birthDate-group">
							<div className="col-3 col-sm-12">
								<label className="form-label" htmlFor="birthDate">
									Customer's Date of Birth:
								</label>
							</div>
							<div className="col-9 col-sm-12">
								<input
									className="form-input"
									type="date"
									value={account.birthDate}
									onChange={handleInputChange}
									name="birthDate"
									id="birthDate"
								/>
								{renderErrorMessage("birthDate")}
							</div>
						</div>
					</div>
					<div className="column col-12 py-2">
						<div className="form-group" id="branch-group">
							<div className="col-3">Branch:</div>
							<div className="col-9">
								{branches?.map((branch) => (
									<label className="form-radio" key={branch.id}>
										<input
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
								{renderErrorMessage("branch")}
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
									value={account.employee}
									onChange={handleInputChange}
									name="employee"
								/>
								{renderErrorMessage("employee")}
							</div>
						</div>
					</div>
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
				</div>
				<div className="card-footer text-center">
					<button className="btn btn-primary" type="submit">
						Create
					</button>
				</div>
			</Form>
		</div>
	);
};

export default AddAccount;

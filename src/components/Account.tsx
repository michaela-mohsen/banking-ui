import { ChangeEvent, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import IAccountData from "../types/Account";
import AccountService from "../services/AccountService";
import CustomerService from "../services/CustomerService";
import ICustomerData from "../types/Customer";
import ITransactionData from "../types/Transaction";
import TransactionService from "../services/TransactionService";

const Account: React.FC = () => {
	const { id } = useParams();

	const formatter = new Intl.NumberFormat("en-US", {
		style: "currency",
		currency: "USD",
	});

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

	const initialCustomerState = {
		id: null,
		birthDate: "",
		firstName: "",
		lastName: "",
		address: "",
		city: "",
		state: "",
		zipCode: "",
	};

	const initialTransactionState = {
		id: null,
		amount: 0,
		fundsAvailableDate: "",
		date: "",
		time: "",
		type: "",
		account: 0,
	};

	const [transaction, setTransaction] = useState<ITransactionData>(
		initialTransactionState
	);

	const [submitted, setSubmitted] = useState<boolean>(false);

	const [currentAccount, setCurrentAccount] =
		useState<IAccountData>(initialAccountState);
	const [currentCustomer, setCurrentCustomer] =
		useState<ICustomerData>(initialCustomerState);
	const getAccount = (id: string) => {
		AccountService.get(id).then((response: any) => {
			setCurrentAccount(response.data);
		});
	};

	const getCustomer = (lastName: string, birthDate: string) => {
		CustomerService.findByLastNameAndBirthDate(lastName, birthDate).then(
			(response: any) => {
				setCurrentCustomer(response.data);
			}
		);
	};

	useEffect(() => {
		if (id) getAccount(id);
	}, [id]);

	useEffect(() => {
		if ((currentAccount.lastName, currentAccount.birthDate))
			getCustomer(currentAccount.lastName, currentAccount.birthDate);
	}, [currentAccount.birthDate, currentAccount.lastName]);

	const refreshPage = () => {
		if (id) getAccount(id);
	};

	const updateIsActive = (status: string) => {
		let data = {
			id: currentAccount.id,
			availableBalance: currentAccount.availableBalance,
			pendingBalance: currentAccount.pendingBalance,
			active: status,
			lastName: currentAccount.lastName,
			birthDate: currentAccount.birthDate,
			branch: currentAccount.branch,
			employee: currentAccount.employee,
			product: currentAccount.product,
			lastActivityDate: currentAccount.lastActivityDate,
			openDate: currentAccount.openDate,
			transactions: currentAccount.transactions,
		};

		AccountService.update(currentAccount.id, data).then((response: any) => {
			refreshPage();
		});
	};

	const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
		const { name, value } = event.target;
		setTransaction({ ...transaction, [name]: value });
	};

	const saveTransaction = () => {
		let data = {
			id: transaction.id,
			amount: transaction.amount,
			fundsAvailableDate: "",
			date: "",
			time: "",
			type: transaction.type,
			account: currentAccount.id,
		};

		TransactionService.create(data).then((response: any) => {
			setTransaction({
				amount: response.data.amount,
				fundsAvailableDate: response.data.fundsAvailableDate,
				date: response.data.date,
				time: response.data.time,
				type: response.data.type,
				account: response.data.account,
			});
			setSubmitted(true);
			refreshPage();
		});
	};

	const renderToggleTransactions = () => {
		let transactions = currentAccount.transactions;
		if (transactions.length > 0) {
			return (
				<table className="table text-center table-striped table-hover">
					<thead>
						<tr className="text-primary">
							<th>Amount</th>
							<th>Date</th>
							<th>Time</th>
							<th>Transaction Type</th>
							<th>Funds Available On</th>
						</tr>
					</thead>
					<tbody>
						{currentAccount.transactions.map((transaction) => (
							<tr key={transaction.id}>
								<td>{formatter.format(transaction.amount)}</td>
								<td>{transaction.date}</td>
								<td>{transaction.time}</td>
								<td>{transaction.type}</td>
								<td>{transaction.fundsAvailableDate}</td>
							</tr>
						))}
					</tbody>
				</table>
			);
		} else {
			return (
				<div className="empty">
					<div className="empty-icon">
						<i className="icon icon-stop"></i>
					</div>
					<p className="empty-title h5">No transactions found</p>
					<div className="empty-action">
						<a className="btn btn-primary" href="#create-transaction">
							Add transaction
						</a>
					</div>
				</div>
			);
		}
	};

	const renderButtonActive = (status: string) => {
		if (status.startsWith("t")) {
			return (
				<div className="btn-group">
					<button
						className="btn btn-error"
						onClick={() => updateIsActive("false")}>
						Deactivate
					</button>
					<a className="btn btn-primary" href="#create-transaction">
						Add transaction
					</a>
				</div>
			);
		} else {
			return (
				<div className="btn-group">
					<button
						className="btn btn-success"
						onClick={() => updateIsActive("true")}>
						Activate
					</button>
					<button className="btn btn-primary" disabled>
						Add transaction
					</button>
				</div>
			);
		}
	};

	return (
		<div className="py-2">
			{currentAccount ? (
				<div className="columns">
					<div className="modal modal-sm" id="create-transaction">
						<a href="#close" className="modal-overlay" aria-label="Close"></a>
						<div className="modal-container">
							<div className="modal-header">
								<a
									href="#close"
									className="btn btn-clear float-right"
									aria-label="close"></a>
								<div className="modal-title h4">Add Transaction</div>
							</div>
							<div className="modal-body">
								<div className="content columns text-center">
									{submitted ? (
										<div>I've been submitted. yay!</div>
									) : (
										<div>
											<form
												className="form-horizontal"
												onSubmit={saveTransaction}>
												<div className="columns">
													<div className="column col-12 py-2">
														<div className="form-group">
															<div className="col-6 col-sm-12">
																<label className="form-label" htmlFor="type">
																	Transaction Type:
																</label>
															</div>
															<div className="col-6 col-sm-12">
																<label className="form-radio">
																	<input
																		type="radio"
																		name="type"
																		value={"WITHDRAWAL"}
																		onChange={handleInputChange}
																	/>
																	<em className="form-icon"></em> Withdrawal
																</label>
																<label className="form-radio">
																	<input
																		type="radio"
																		name="type"
																		value={"DEPOSIT"}
																		onChange={handleInputChange}
																	/>
																	<em className="form-icon"></em> Deposit
																</label>
															</div>
														</div>
													</div>
													<div className="column col-12 py-2">
														<div className="form-group">
															<div className="col-6 col-sm-12">
																<label htmlFor="amount">Amount:</label>
															</div>
															<div className="col-6 col-sm-12">
																<input
																	className="form-input"
																	type="text"
																	id="amount"
																	name="amount"
																	value={transaction.amount}
																	onChange={handleInputChange}
																/>
															</div>
														</div>
													</div>
												</div>
												<div className="modal-footer">
													<button className="btn btn-primary" type="submit">
														Submit
													</button>
												</div>
											</form>
										</div>
									)}
								</div>
							</div>
						</div>
					</div>
					<div className="column col-4">
						<div className="panel">
							<div className="panel-header">
								<div className="panel-title h5 text-primary">
									{currentAccount.id}
								</div>
								<div className="panel-subtitle text-bold">
									{currentAccount.product}
								</div>
								<div className="tile tile-centered pt-2">
									<div className="tile-content columns">
										<div className="tile-subtitle text-bold column">
											{formatter.format(currentAccount.pendingBalance)}{" "}
											<span className="text-gray">pending</span>
										</div>
									</div>
								</div>
								<div className="tile tile-centered pb-2">
									<div className="tile-content columns">
										<div className="tile-subtitle text-bold column">
											{formatter.format(currentAccount.availableBalance)}{" "}
											<span className="text-gray">available</span>
										</div>
									</div>
								</div>
							</div>
							<div className="divider"></div>
							<div className="panel-body">
								<div className="accordion">
									<input
										type="radio"
										id="accordion-1"
										name="accordion-checkbox"
										hidden
										checked
									/>
									<label className="accordion-header" htmlFor="accordion-1">
										<i className="icon icon-arrow-right mr-1"></i>
										Account Info
									</label>
									<div className="accordion-body">
										<div className="tile tile-centered py-2">
											<div className="tile-content">
												<div className="tile-title text-bold">
													<span className="text-gray">Created at</span>{" "}
													{currentAccount.branch}
												</div>
											</div>
										</div>
										<div className="tile tile-centered py-2">
											<div className="tile-content">
												<div className="tile-title text-bold">
													<span className="text-gray">Opened on</span>{" "}
													{currentAccount.openDate}
												</div>
											</div>
										</div>
										<div className="tile tile-centered py-2">
											<div className="tile-content">
												<div className="tile-title text-bold">
													<span className="text-gray">Last activity</span>{" "}
												</div>
												<div className="tile-title text-bold">
													{currentAccount.lastActivityDate}
												</div>
											</div>
										</div>
									</div>
								</div>
								<div className="accordion">
									<input
										type="radio"
										id="accordion-2"
										name="accordion-checkbox"
										hidden
									/>
									<label className="accordion-header" htmlFor="accordion-2">
										<i className="icon icon-arrow-right mr-1"></i>
										Customer Info
									</label>
									<div className="accordion-body">
										<div className="tile tile-centered py-2">
											<div className="tile-content">
												<div className="tile-title text-bold">
													{currentCustomer?.lastName},{" "}
													{currentCustomer?.firstName}
												</div>
											</div>
										</div>
										<div className="tile tile-centered pt-2">
											<div className="tile-content">
												<div className="tile-title text-bold">
													{currentCustomer?.address}
												</div>
											</div>
										</div>
										<div className="tile tile-centered pb-2">
											<div className="tile-content">
												<div className="tile-title text-bold text-gray">
													{currentCustomer?.city}, {currentCustomer?.state}{" "}
													{currentCustomer?.zipCode}
												</div>
											</div>
										</div>
										<div className="tile tile-centered py-2">
											<div className="tile-content">
												<div className="tile-title text-bold">
													{currentCustomer.birthDate}
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
							<div className="panel-footer p-centered">
								<div className="btn-group btn-group-block">
									{renderButtonActive(currentAccount.active)}
								</div>
							</div>
						</div>
					</div>
					<div className="column col-8">{renderToggleTransactions()}</div>
				</div>
			) : (
				<div>howdy, how's it going?</div>
			)}
		</div>
	);
};

export default Account;

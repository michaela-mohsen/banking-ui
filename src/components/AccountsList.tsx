import { ChangeEvent, useEffect, useState } from "react";
import IAccountData from "../types/Account";
import AccountService from "../services/AccountService";
import { Link } from "react-router-dom";
import TokenService from "../services/TokenService";
import AuthService from "../services/AuthService";

const AccountsList: React.FC = () => {
	const [accounts, setAccounts] = useState<Array<IAccountData>>([]);
	const [currentAccount, setCurrentAccount] = useState<IAccountData | null>(
		null
	);
	const [typeLoan, setTypeLoan] = useState<string>("LOAN");
	const [typeAccount, setTypeAccount] = useState<string>("ACCOUNT");

	useEffect(() => {
		retrieveAccounts();
	}, []);

	const currencyFormatter = new Intl.NumberFormat("en-US", {
		style: "currency",
		currency: "USD",
	});

	const formatDate = (date: string) => {
		const d = new Date(date);
		const dtf = new Intl.DateTimeFormat("en", { month: "2-digit", year: "numeric", day: "2-digit" });
		return dtf.format(d);
	};

	const onChangeTypeLoan = (e: ChangeEvent<HTMLInputElement>) => {
		const typeLoan = e.target.value;
		setTypeLoan(typeLoan);
	};

	const onChangeTypeAccount = (e: ChangeEvent<HTMLInputElement>) => {
		const typeAccount = e.target.value;
		setTypeAccount(typeAccount);
	};

	const retrieveAccounts = () => {
		AccountService.getAll().then((response: any) => {
			setAccounts(response.data);
			setCurrentAccount(null);
		}).catch((error) => {
			if (error.response && error.response.status === 401) {
				const refreshToken = TokenService.getLocalRefreshToken();
				TokenService.refreshToken(refreshToken).then((response: any) => {
					TokenService.updateLocalToken(response.data.accessToken);
				});
			}
		});
	};

	const refreshList = () => {
		retrieveAccounts();
		setCurrentAccount(null);
	};

	const setActiveAccount = (account: IAccountData) => {
		setCurrentAccount(account);
	};

	const findByProductLoan = () => {
		AccountService.findByProductType(typeLoan).then((response: any) => {
			setAccounts(response.data);
			setCurrentAccount(null);
		}).catch((error) => {
			if (error.response && error.response.status === 401) {
				const refreshToken = TokenService.getLocalRefreshToken();
				TokenService.refreshToken(refreshToken).then((response: any) => {
					TokenService.updateLocalToken(response.data.accessToken);
				});
			}
		});
	};

	const findByProductAccount = () => {
		AccountService.findByProductType(typeAccount).then((response: any) => {
			setAccounts(response.data);
			setCurrentAccount(null);
		}).catch((error) => {
			if (error.response && error.response.status === 401) {
				const refreshToken = TokenService.getLocalRefreshToken();
				TokenService.refreshToken(refreshToken).then((response: any) => {
					TokenService.updateLocalToken(response.data.accessToken);
				});
			}
		});
	};

	const renderStatus = (status: string) => {
		if (status.startsWith("true")) {
			return "ACTIVE";
		} else {
			return "INACTIVE";
		}
	};

	return (
		<div className="columns">
			<div className="column col-6 py-2">
				<label className="chip" htmlFor="tag-0">
					<input
						type="radio"
						id="tag-0"
						className="filter-tag"
						name="typeLoan"
						defaultValue=""
						onChange={onChangeTypeLoan}
						hidden
					/>
					<button className="btn btn-link" type="button" onClick={refreshList}>
						All Types
					</button>
				</label>
				<label className="chip" htmlFor="tag-0">
					<input
						type="radio"
						id="tag-1"
						className="filter-tag"
						name="typeLoan"
						value={"LOAN"}
						onChange={onChangeTypeLoan}
						hidden
					/>
					<button
						className="btn btn-link"
						type="button"
						onClick={findByProductLoan}>
						Loans
					</button>
				</label>
				<label className="chip" htmlFor="tag-1">
					<input
						type="radio"
						id="tag-2"
						className="filter-tag"
						name="filter-radio"
						value="ACCOUNT"
						onChange={onChangeTypeAccount}
						hidden
					/>
					<button
						className="btn btn-link"
						type="button"
						onClick={findByProductAccount}>
						Accounts
					</button>
				</label>
			</div>
			<div className="column col-6 py-2">
				<Link to={"/accounts/add-account"} className="btn btn-primary">
					Create new account
				</Link>
			</div>
			<div className="column col-6">
				{accounts?.map((account) => (
					<div
						className="tile tile-centered my-2"
						onClick={() => setActiveAccount(account)}
						key={account.id}>
						<div className="tile-content">
							<h5 className="tile-title">{account.id}</h5>
							<div className="tile-subtitle">
								{account.lastName} · {formatDate(account.birthDate)}
							</div>
							<div className="tile-subtitle text-gray">
								Last activity {account.lastActivityDate}
							</div>
						</div>
						<div className="tile-action">
							<button
								className="btn btn-link"
								type="button"
								title="more"
								onClick={() => setActiveAccount(account)}>
								<i className="icon icon-more-vert"></i>
							</button>
						</div>
						<div className="divider"></div>
					</div>
				))}
			</div>
			<div className="column col-6">
				{currentAccount ? (
					<div className="card">
						<div className="card-header">
							<h3 className="card-title">{currentAccount.id}</h3>
							<h5 className="card-subtitle text-gray">
								<div className="columns">
									<div className="column">{currentAccount.lastName}</div>
									<div className="divider-vert"></div>
									<div className="column">
										{formatDate(currentAccount.birthDate)}
									</div>
								</div>
							</h5>
						</div>
						<div className="divider"></div>
						<div className="card-body">
							<div className="tile tile-centered py-2">
								<div className="tile-content columns">
									<div className="tile-title text-bold column">
										Available Balance:
									</div>
									<div className="tile-subtitle column">
										{currencyFormatter.format(currentAccount.availableBalance)}
									</div>
								</div>
							</div>
							<div className="tile tile-centered py-2">
								<div className="tile-content columns">
									<div className="tile-title text-bold column">
										Pending Balance:
									</div>
									<div className="tile-subtitle column">
										{currencyFormatter.format(currentAccount.pendingBalance)}
									</div>
								</div>
							</div>
							<div className="tile tile-centered py-2">
								<div className="tile-content columns">
									<div className="tile-title text-bold column">Created at:</div>
									<div className="tile-subtitle column">
										{currentAccount.branch}
									</div>
								</div>
							</div>
							<div className="tile tile-centered py-2">
								<div className="tile-content columns">
									<div className="tile-title text-bold column">Product:</div>
									<div className="tile-subtitle column">
										{currentAccount.product}
									</div>
								</div>
							</div>
							<div className="tile tile-centered py-2">
								<div className="tile-content columns">
									<div className="tile-title text-bold column">Status:</div>
									<div className="tile-subtitle column">
										{renderStatus(currentAccount.active)}
									</div>
								</div>
							</div>
						</div>
						<div className="card-footer">
							<Link
								to={"/accounts/" + currentAccount.id}
								className="btn btn-primary">
								Transactions and more
							</Link>
						</div>
					</div>
				) : (
					<div className="empty">
						<h5 className="empty-title">Please choose an account.</h5>
					</div>
				)}
			</div>
		</div>
	);
};

export default AccountsList;

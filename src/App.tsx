import React from "react";
import "./App.css";
import { Link, Route, Routes } from "react-router-dom";
import AddAccount from "./components/AddAccount";
import AccountsList from "./components/AccountsList";
import Account from "./components/Account";
import CustomersList from "./components/CustomersList";
import AddCustomer from "./components/AddCustomer";

function App() {
	return (
		<div className="App">
			<header className="navbar bg-secondary">
				<section className="navbar-section">
					<ul className="nav">
						<li className="nav-item">
							<a className="btn btn-link text-primary" href="@{/home}">
								Home
							</a>
						</li>
					</ul>
				</section>
				<section className="navbar-section">
					<ul className="nav">
						<li className="nav-item">
							<Link to={"/accounts"} className="btn btn-link text-primary">
								Accounts
							</Link>
						</li>
					</ul>
				</section>
				<section className="navbar-section">
					<ul className="nav">
						<li className="nav-item">
							<Link to={"/customers"} className="btn btn-link text-primary">
								Customers
							</Link>
						</li>
					</ul>
				</section>
				<section className="navbar-section">
					<ul className="nav">
						<li className="nav-item">
							<a className="btn btn-link text-primary" href="@{/employees}">
								Employees
							</a>
						</li>
					</ul>
				</section>
				<section className="navbar-section">
					<ul className="nav">
						<li className="nav-item">
							<a className="btn btn-link text-primary" href="@{/logout}">
								Logout
							</a>
						</li>
					</ul>
				</section>
			</header>
			<div className="container">
				<Routes>
					<Route path="/" element={<AccountsList />} />
					<Route path="/accounts" element={<AccountsList />} />
					<Route path="/customers" element={<CustomersList />} />
					<Route path="/accounts/add-account" element={<AddAccount />} />
					<Route path="/customers/add-customer" element={<AddCustomer />} />
					<Route path="/accounts/:id" element={<Account />} />
				</Routes>
			</div>
		</div>
	);
}

export default App;

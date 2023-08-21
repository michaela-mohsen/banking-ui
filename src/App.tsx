import React, { useEffect, useState } from "react";
import "./App.css";
import { Link, Route, Routes, useNavigate } from "react-router-dom";
import AddAccount from "./components/AddAccount";
import AccountsList from "./components/AccountsList";
import Account from "./components/Account";
import CustomersList from "./components/CustomersList";
import AddCustomer from "./components/AddCustomer";
import UpdateCustomer from "./components/UpdateCustomer";
import Login from "./components/Login";
import Profile from "./components/Profile";
import AuthService from "./services/AuthService";

function App() {
	let navigate = useNavigate();

	const logOut = () => {
		AuthService.logout();
		navigate("/login")
	};

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
							<Link to={"/profile"} className="btn btn-link text-primary">
								Profile
							</Link>
						</li>
					</ul>
				</section>
				<section className="navbar-section">
					<ul className="nav">
						<li className="nav-item">
							<button type="button" className="btn btn-link" onClick={logOut}>Log Out</button>
						</li>
					</ul>
				</section>
			</header>
			<div className="container">
				<Routes>
					<Route path="/" element={<AccountsList />} />
					<Route path="/login" element={<Login />} />
					<Route path="/profile" element={<Profile />} />
					<Route path="/accounts" element={<AccountsList />} />
					<Route path="/customers" element={<CustomersList />} />
					<Route path="/accounts/add-account" element={<AddAccount />} />
					<Route path="/customers/add-customer" element={<AddCustomer />} />
					<Route path="/customers/update-customer/:id" element={<UpdateCustomer />} />
					<Route path="/accounts/:id" element={<Account />} />
				</Routes>
			</div>
		</div>
	);
}

export default App;
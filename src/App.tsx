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
import Register from "./components/Register";
import Customer from "./components/Customer";
import { useEffect, useState } from "react";
import CustomerIndex from "./components/CustomerIndex";

function App() {
	let navigate = useNavigate();
	const currentUser = AuthService.getCurrentUser();

	const [userIsLoggedIn, setUserIsLoggedIn] = useState<boolean>(false);

	const logOut = () => {
		AuthService.logout();
		localStorage.removeItem("user");
		navigate("/login")
		window.location.reload();
		setUserIsLoggedIn(false);
	};


	useEffect(() => {
		if (currentUser) AuthService.getCurrentUser();
	}, [currentUser])

	return (
		<div className="App">
			<header className="navbar bg-secondary">
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
					<Route path="/" element={<Login />} />
					<Route path="/login" element={<Login />} />
					<Route path="/register" element={<Register />} />
					<Route path="/profile" element={<Profile />} />
					<Route path="/accounts" element={<AccountsList />} />
					<Route path="/customers" element={<CustomersList />} />
					<Route path="/customers/:id" element={<Customer />}>
						<Route index={true} element={<CustomerIndex />} />
						<Route path="/customers/:id/update" element={<UpdateCustomer />} />
						<Route path="/customers/:id/add-account" element={<AddAccount />} />
						<Route path="/customers/:id/accounts/:accountId" element={<Account />} />
					</Route>
					<Route path="/customers/add-customer" element={<AddCustomer />} />
				</Routes>
			</div>
		</div>
	);
}

export default App;
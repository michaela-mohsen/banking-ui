import "./App.css";
import { NavLink, Route, Routes, useNavigate } from "react-router-dom";
import AddAccount from "./components/AddAccount";
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
import UpdateProfile from "./components/UpdateProfile";
import ProfileIndex from "./components/ProfileIndex";

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

	const toggleNavbarIfLoggedIn = () => {
		if (currentUser) {
			return (<header className="navbar bg-secondary">
				<section className="navbar-center">
					<NavLink className={({ isActive }) => isActive ? "btn btn-link active" : "btn btn-link"} to={"/customers"}>Customers</NavLink>
				</section>
				<section className="navbar-center">
					<NavLink className={({ isActive }) => isActive ? "btn btn-link active" : "btn btn-link"} to={"/profile"}>Profile</NavLink>
				</section>
				<section className="navbar-center">
					<button type="button" className="btn btn-link" onClick={logOut}>Log Out</button>
				</section>
			</header>);
		}
	}

	return (
		<div className="App">
			{toggleNavbarIfLoggedIn()}
			<div className="container">
				<Routes>
					<Route path="/" element={<Login />} />
					<Route path="/login" element={<Login />} />
					<Route path="/register" element={<Register />} />
					<Route path="/profile" element={<Profile />}>
						<Route index={true} element={<ProfileIndex />} />
						<Route path="/profile/home" element={<ProfileIndex />} />
						<Route path="/profile/update" element={<UpdateProfile />} />
					</Route>
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
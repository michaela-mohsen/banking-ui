import { ChangeEvent, useEffect, useState } from "react";
import ICustomerData from "../types/Customer";
import CustomerService from "../services/CustomerService";
import { Link } from "react-router-dom";
import Pagination from "@mui/material/Pagination";

const CustomersList: React.FC = () => {
	const [customers, setCustomers] = useState<Array<ICustomerData>>([]);
	const [lastName, setLastName] = useState<string>("");
	const [page, setPage] = useState<number>(0);
	const [count, setCount] = useState<number>(0);
	const [size] = useState<number>(10);

	const retrieveCustomers = () => {
		const params = getRequestParams(lastName, page, size);
		CustomerService.getAll(params).then((response: any) => {
			const { customers, totalPages, lastName } = response.data;
			setCustomers(customers);
			setCount(totalPages);
			setLastName(lastName);
			console.log(
				"last name: " + lastName + ", page: " + page + ", size: " + size
			);
		});
	};
	const getRequestParams = (
		searchLastName: string,
		page: number,
		pageSize: number
	) => {
		let params = { lastName, page, size };
		if (searchLastName) {
			params["lastName"] = searchLastName;
		}

		if (page) {
			params["page"] = page - 1;
		}

		if (pageSize) {
			params["size"] = pageSize;
		}

		return params;
	};

	useEffect(() => {
		retrieveCustomers();
	}, [page]);

	const handlePageChange = (event: any, value: number) => {
		setPage(value);
	};

	const deleteCustomer = (id: number) => {
		CustomerService.remove(id).then((response) => {
			retrieveCustomers();
		})
	}

	const onChangeSearchLastName = (e: ChangeEvent<HTMLInputElement>) => {
		const lastName = e.target.value;
		setLastName(lastName);
	};

	const renderCustomerAccounts = (customer: ICustomerData) => {
		if (customer.accounts.length > 0) {
			return <ul className="menu">
				{customer.accounts.map((account) => (
					<li key={account?.id} className="menu-item"><Link
						to={"/accounts/" + account.id}
						className="btn btn-link">
						{account.product}
					</Link></li>
				))}
			</ul>;
		} else {
			return <ul className="menu">
				<li className="menu-item"><Link to={"/accounts/add-account"} className="btn btn-link">
					Add new account
				</Link></li>
			</ul>;
		}
	}

	return (
		<div>
			<div className="columns py-2">
				<div className="column col-8 text-left">
					<Link to={"/customers/add-customer"} className="btn btn-primary">
						Add new customer
					</Link>
				</div>
				<div className="column col-4 text-right input-group">
					<input
						type="search"
						className="form-input"
						placeholder="search by last name"
						value={lastName}
						onChange={onChangeSearchLastName}
					/>
					<button
						className="btn btn-primary input-group-btn"
						type="button"
						title="search"
						onClick={retrieveCustomers}>
						<em className="icon icon-search"></em>
					</button>
				</div>
			</div>
			<table className="table table-striped table-hover text-center">
				<thead>
					<tr className="text-primary">
						<th>ID</th>
						<th>First Name</th>
						<th>Last Name</th>
						<th>Birth Date</th>
						<th>Address</th>
						<th>Accounts</th>
						<th>Actions</th>
					</tr>
				</thead>
				<tbody>
					{customers?.map((customer) => (
						<tr key={customer.id}>
							<td>{customer.id}</td>
							<td>{customer.firstName}</td>
							<td>{customer.lastName}</td>
							<td>{customer.birthDate}</td>
							<td>
								{customer.address} {customer.city}, {customer.state}{" "}
								{customer.zipCode}
							</td>
							<td>
								<div className="accordion">
									<input type="checkbox" id={"accordion-" + customer.id} name="accordion-checkbox" hidden />
									<label className="accordion-header" htmlFor={"accordion-" + customer.id}>
										<i className="icon icon-arrow-right mr-1"></i>
										{customer.accounts.length}
									</label>
									<div className="accordion-body">
										{renderCustomerAccounts(customer)}
									</div>
								</div>
							</td>
							<td>
								<div className="btn-group btn-group-block">
									<Link to={"/customers/update-customer/" + customer.id} className="btn btn-primary">Update</Link>
									<button className="btn btn-error" onClick={() => deleteCustomer(customer.id)}>Delete</button>
								</div>
							</td>
						</tr>
					))}
				</tbody>
			</table>
			<div className="columns py-2">
				<div className="column col-5 d-invisible"></div>
				<div className="column col-auto">
					<Pagination
						count={count}
						page={page}
						siblingCount={1}
						boundaryCount={1}
						variant="text"
						shape="circular"
						color="standard"
						onChange={handlePageChange}
					/>
				</div>
				<div className="column col-auto d-invisible"></div>
			</div>
		</div>
	);
};

export default CustomersList;

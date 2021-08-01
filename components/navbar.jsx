import styles from "../styles/components/Navbar.module.css";
import Link from "next/link";
import { getDashboardLink } from "../utils/sidebar-links";
import Router, { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import CompanyService from "../services/companies/companies";
import globalStyles from "../styles/global-colors.module.css";

export default function NavBar() {
	const authUser = useSelector((state) => state.authUser);
	const cart = useSelector((state) => state.cart);
	const [cartLength, setCartLength] = useState(0);

	const [isLoggedIn, setIsLoggedIn] = useState(true);

	useEffect(() => {
		getCompanies().then();
	}, []);

	useEffect(() => {
		if (authUser.fullNames) setIsLoggedIn(true);
		else setIsLoggedIn(false);

		setCartLength(cart.length);
	}, [authUser, cart]);

	const [search, setSearch] = useState("");

	const [companies, setCompanies] = useState([]);

	const getCompanies = async () => {
		try {
			const response = await CompanyService.getValid();
			setCompanies(response.data);
		} catch (err) {
			console.log(err);
		}
	};

	const router = useRouter();

	const handleKeyDown = (event) => {
		console.log("ksd");
		if (event.key === "Enter") {
			event.preventDefault();
			handleSearch();
		}
	};

	const handleSearch = () => {
		router
			.push({
				pathname: "/search/results",
				query: { text: search },
			})
			.then();
	};

	const logOut = (e) => {
		e.preventDefault();
		localStorage.removeItem("mcs-auth-token");
		window.location.href = "/auth/login";
	};

	return (
		<div>
			<nav
				className="navbar navbar-expand-lg shadow-sm px-0"
				style={{ minHeight: 60 }}
			>
				<Link href="/" passHref>
					<div className="navbar-brand pl-3">
						<div className="d-flex align-items-center">
							<img
								src={"/favicon_io/favicon-32x32.png"}
								height={30}
								width={30}
								alt="Logo ..."
								className="mr-2"
							/>
							<span className={styles.brandName}>
								Mount Carmel School
							</span>
						</div>
					</div>
				</Link>

				<button
					className="navbar-toggler"
					type="button"
					data-toggle="collapse"
					data-target="#navbarTogglerDemo01"
					aria-controls="navbarTogglerDemo01"
					aria-expanded="false"
					aria-label="Toggle navigation"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 24 24"
						width="24"
						height="24"
					>
						<path fill="none" d="M0 0h24v24H0z" />
						<path d="M3 4h18v2H3V4zm6 7h12v2H9v-2zm-6 7h18v2H3v-2z" />
					</svg>
				</button>
				<div
					className="collapse navbar-collapse px-0"
					style={{ marginRight: "0.5rem" }}
					id="navbarTogglerDemo01"
				>
					<div className="d-block d-md-flex justify-content-between w-100 align-items-center">
						<div />
						<div
							className="d-md-flex justify-content-between align-items-center flex-grow-1 px-xl-5"
							style={{ marginRight: "1.5rem" }}
						>
							<div>
								<ul className="navbar-nav pr-lg-5 py-2">
									<div className="dropdown show nav-item">
										<a
											className="nav-link dropdown-toggle"
											href="#"
											role="button"
											id="dropdownMenuLink"
											data-toggle="dropdown"
											aria-haspopup="true"
											aria-expanded="false"
										>
											<span
												className="pt-1 text-secondary"
												style={{ fontSize: 14 }}
											>
												Companies
											</span>
											<svg
												xmlns="http://www.w3.org/2000/svg"
												viewBox="0 0 24 24"
												width="18"
												height="18"
												style={{ marginTop: "-1px" }}
											>
												<path
													fill="none"
													d="M0 0h24v24H0z"
												/>
												<path
													fill="gray"
													d="M12 13.172l4.95-4.95 1.414 1.414L12 16 5.636 9.636 7.05 8.222z"
												/>
											</svg>
										</a>
										<div
											className="dropdown-menu mb-4"
											aria-labelledby="dropdownMenuLink"
										>
											{companies.map((company) => {
												return (
													<Link
														key={company._id}
														passHref
														href={
															"/companies/" +
															company._id
														}
													>
														<div className="dropdown-item cursor-pointer">
															{company.name}
														</div>
													</Link>
												);
											})}
										</div>
									</div>
								</ul>
							</div>
							<form className="d-inline-block w-75 mr-5">
								<div className="form-control d-flex w-100 h-100 px-3  pl-4">
									<input
										onKeyDown={handleKeyDown}
										onChange={(event) =>
											setSearch(event.target.value)
										}
										placeholder="Search for anything"
										style={{
											border: "none",
											fontSize: 13,
											color: "#707070",
											backgroundColor: "transparent",
										}}
										className="flex-grow-1"
									/>
									<div
										onClick={() => handleSearch()}
										className="cursor-pointer"
									>
										<svg
											xmlns="http://www.w3.org/2000/svg"
											viewBox="0 0 24 24"
											width="18"
											style={{ verticalAlign: "sub" }}
											height="18"
										>
											<path
												fill="none"
												d="M0 0h24v24H0z"
											/>
											<path
												d="M18.031 16.617l4.283 4.282-1.415 1.415-4.282-4.283A8.96 8.96 0 0 1 11 20c-4.968 0-9-4.032-9-9s4.032-9 9-9 9 4.032 9 9a8.96 8.96 0 0 1-1.969 5.617zm-2.006-.742A6.977 6.977 0 0 0 18 11c0-3.868-3.133-7-7-7-3.868 0-7 3.132-7 7 0 3.867 3.132 7 7 7a6.977 6.977 0 0 0 4.875-1.975l.15-.15z"
												fill="rgba(102,102,102,1)"
											/>
										</svg>
									</div>
								</div>
							</form>

							<Link href={"/cart/my-cart"} passHref>
								<div
									className={
										"text-center c-pointer ml-4 " +
										styles.myCartArea
									}
								>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										height="27px"
										viewBox="0 0 28 28"
										width="27px"
										fill="gray"
									>
										<path d="M0 0h24v24H0V0z" fill="none" />
										<path d="M15.55 13c.75 0 1.41-.41 1.75-1.03l3.58-6.49c.37-.66-.11-1.48-.87-1.48H5.21l-.94-2H1v2h2l3.6 7.59-1.35 2.44C4.52 15.37 5.48 17 7 17h12v-2H7l1.1-2h7.45zM6.16 6h12.15l-2.76 5H8.53L6.16 6zM7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zm10 0c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z" />
									</svg>
									{cartLength > 0 && (
										<div className={styles.badge}>
											{cartLength}
										</div>
									)}
								</div>
							</Link>
						</div>
						<div className="d-flex">
							{isLoggedIn ? (
								<div className="ml-auto dropdown">
									<div
										className={
											"ml-auto mr-4 d-flex cursor-pointer dropdown-toggle d-flex justify-content-center align-items-center " +
											styles.userDropdown
										}
										id="dropdownMenuButton"
										data-toggle="dropdown"
									>
										{/*<img src={"https://ecommerce-backend-apis.herokuapp.com/"+authUser.profile} alt="" className="nav-bar-avatar rounded-circle" width={30} height={30}/>*/}
										<img
											className="nav-bar-avatar rounded-circle"
											width={30}
											height={30}
											src={authUser.imageUrl}
											onError={(e) => {
												e.target.onerror = null;
												e.target.src =
													"https://ui-avatars.com/api/?name=" +
													authUser.username;
											}}
											alt={authUser.username}
										/>
										<h6
											className="ml-3 mt-2 mr-2"
											style={{
												color: "#707070",
												letterSpacing: "0.6px",
												textTransform: "capitalize",
											}}
										>
											{authUser.username}
										</h6>
										<span
											style={{
												marginLeft: "5px",
												verticalAlign: "top",
											}}
										>
											<svg
												id="Component_3"
												data-name="Component 3"
												xmlns="http://www.w3.org/2000/svg"
												width="6"
												height="10"
												viewBox="0 0 6 11.057"
											>
												<path
													id="Path_6"
													data-name="Path 6"
													d="M3106.947,2498h6l-3.139,4Z"
													transform="translate(-3106.946 -2490.943)"
													fill="#707070"
												/>
												<path
													id="Path_7"
													data-name="Path 7"
													d="M0,0H6L2.861,4Z"
													transform="translate(6 4) rotate(180)"
													fill="#707070"
												/>
											</svg>
										</span>
									</div>
									<div
										className="dropdown-menu"
										aria-labelledby="dropdownMenuButton"
									>
										<Link
											href={getDashboardLink(authUser)}
											passHref
										>
											<a
												className="dropdown-item"
												href="#"
											>
												Dashboard
											</a>
										</Link>
										<Link href={"/account/settings"}>
											<a
												className="dropdown-item"
												href="#"
											>
												Account settings
											</a>
										</Link>
										<Link href={"/cart/my-cart"} passHref>
											<a
												className="dropdown-item"
												href="#"
											>
												Visit the cart
											</a>
										</Link>
										<a
											className="dropdown-item"
											href="#"
											onClick={logOut}
										>
											Log out
										</a>
									</div>
								</div>
							) : (
								<div className={"button-group ml-auto mr-auto"}>
									<button
										style={{
											border: "1px solid #ff5555",
											fontSize: "13px",
										}}
										className={
											"btn  mr-3  " +
											" " +
											globalStyles.globalHoverBackColor +
											" " +
											globalStyles.globalTextColor +
											" " +
											globalStyles.globalHoverTextColor
										}
										onClick={() =>
											Router.push("/auth/login")
										}
									>
										Log in
									</button>
									<button
										style={{
											border: "1px solid #ff5555",
											fontSize: "13px",
										}}
										className={
											"btn text-white border-none " +
											globalStyles.globalBackColor
										}
										onClick={() =>
											Router.push("/auth/register")
										}
									>
										Register
									</button>
								</div>
							)}
						</div>
					</div>
				</div>
			</nav>
		</div>
	);
}

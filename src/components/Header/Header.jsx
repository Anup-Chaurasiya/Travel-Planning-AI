import { Link, NavLink, useNavigate } from "react-router-dom";
import { ModeToggle } from "../Theme/ModeToggle";
import { useCallback, useEffect, useState } from "react";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import { googleLogout } from "@react-oauth/google";
import { AuthDialog } from "../AuthDialog/AuthDialog";
import { useGoogleAuth } from "@/services/Auth";
import { FaUserAlt } from "react-icons/fa";
import { FaPlus } from "react-icons/fa";

export default function Header() {
	const [isOpen, setIsOpen] = useState(false);
	const [isSmallScreen, setIsSmallScreen] = useState(
		window.innerWidth < 1024
	);
	const [openDialog, setOpenDialog] = useState(false);
	const [loading, setLoading] = useState(false);
	const [redirectAfterLogin, setRedirectAfterLogin] = useState(false);

	const navigate = useNavigate();
	const login = useGoogleAuth(() => {
		setOpenDialog(false);
		setRedirectAfterLogin(true);
	});

	const toggleMenu = () => setIsOpen(!isOpen);

	const [users, setUsers] = useState(() => {
		return JSON.parse(localStorage.getItem("user"));
	});

	const updateUserAndRedirect = useCallback(() => {
		const storedUser = JSON.parse(localStorage.getItem("user"));
		setUsers(storedUser);
	}, []);

	useEffect(() => {
		const handleResize = () => setIsSmallScreen(window.innerWidth < 1024);
		window.addEventListener("resize", handleResize);

		return () => {
			window.removeEventListener("resize", handleResize);
		};
	}, []);

	useEffect(() => {
		if (redirectAfterLogin) {
			updateUserAndRedirect();
		}
	}, [redirectAfterLogin, updateUserAndRedirect]);

	useEffect(() => {
		if (users && redirectAfterLogin) {
			navigate("/my-trips");
		}
	}, [users, redirectAfterLogin, navigate]);

	return (
		<header className="w-full border-b-2 font-serif sm:text-sm md:text-xl border-neutral-600 shadow top-0 z-50">
			<nav className="container px-2 lg:px-6 py-2">
				<div className="flex flex-wrap justify-between items-center mx-auto">
					<Link to="/" className="flex items-center">
						<img
							src="/travelMate.png"
							className="mr-1 h-14 rounded-lg"
							alt="Logo"
						/>
					</Link>

					<button
						onClick={toggleMenu}
						className="lg:hidden text-gray-700 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-700"
					>
						<svg
							className="h-6 w-6"
							fill="none"
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth="2"
							viewBox="0 0 24 24"
							stroke="currentColor"
						>
							<path d="M4 6h16M4 12h16m-7 6h7" />
						</svg>
					</button>

					<div
						className={`${
							isOpen ? "block" : "hidden"
						} w-full lg:flex lg:w-auto lg:items-center`}
					>
						<ul className="flex flex-col mt-1 font-medium lg:flex-row lg:space-x-8 lg:mt-0 lg:ml-auto text-right leading-loose">
							{users ? (
								<>
									<li>
										<NavLink
											to="/my-trips"
											className={({ isActive }) =>
												`block pr-2 pl-2 duration-200 ${
													isActive
														? "text-customGreen font-bold dark:text-customBlue"
														: "text-gray-500"
												}`
											}
										>
											My Trip
										</NavLink>
									</li>
									<li>
										<NavLink
											to="/create-trip"
											className={({ isActive }) =>
												`block pr-2 pl-2 duration-200 ${
													isActive
														? "text-customGreen font-bold dark:text-customBlue"
														: "text-gray-500"
												}`
											}
										>
											Create New{" "}
											<span className="text-2xl font-bold ">
												+
											</span>
										</NavLink>
									</li>
									<li>
										<Popover>
											<PopoverTrigger>
												{users.picture ? (
													<img
														src={users.picture}
														alt="User"
														className="h-8 w-8 rounded-full"
													/>
												) : (
													<FaUserAlt className="h-8 w-8 rounded-full" />
												)}
											</PopoverTrigger>
											<PopoverContent
												className="w-17"
												data-side="bottom"
												side={
													isSmallScreen
														? "left"
														: "bottom"
												}
											>
												<Link
													to="/"
													onClick={() => {
														googleLogout();
														localStorage.clear();
														setUsers(null); // Ensure users state is updated
													}}
													className="transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110"
												>
													Logout
												</Link>
											</PopoverContent>
										</Popover>
									</li>
								</>
							) : (
								<li>
									<NavLink
										onClick={() => setOpenDialog(true)}
										className="block pr-2 pl-2 pb-2 duration-200 text-gray-500"
									>
										Login
									</NavLink>
									<AuthDialog
										open={openDialog}
										loading={loading}
										onLogin={login}
										onClose={() => setOpenDialog(false)}
									/>
								</li>
							)}
							<li className="block -mt-1.5 -pr-1 duration-200">
								<ModeToggle />
							</li>
						</ul>
					</div>
				</div>
			</nav>
		</header>
	);
}

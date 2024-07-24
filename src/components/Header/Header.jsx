import { Link, NavLink } from "react-router-dom";
import { ModeToggle } from "../Theme/ModeToggle";
import { useState } from "react";

export default function Header() {
	const [isOpen, setIsOpen] = useState(false);

	const toggleMenu = () => {
		setIsOpen(!isOpen);
	};

	return (
		<header className="w-full border-b-2 font-mono text-lg border-neutral-600 shadow top-0 z-50">
			<nav className="container px-2 lg:px-6 py-2">
				<div className="flex flex-wrap justify-between items-center mx-auto">
					<Link to="/" className="flex items-center">
						<img
							src="/travelMate.png"
							className="mr-1 h-14 rounded-lg"
							alt="Logo"
						/>
						{/* <h1 className="text-blue-600 text-lg md:text-xl lg:text-2xl font-mono font-extrabold">
							TravelMate
						</h1> */}
					</Link>

					<button
						onClick={toggleMenu}
						className="lg:hidden text-gray-700 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-700 "
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
						} w-full lg:flex lg:w-auto lg:items-center `}
					>
						<ul className="flex flex-col mt-1 font-medium lg:flex-row lg:space-x-8 lg:mt-0 lg:ml-auto text-right ">
							<li>
								<NavLink
									to="/about"
									className={({ isActive }) =>
										`block pr-2 pl-2 duration-200 ${
											isActive
												? "text-green-500font-bold"
												: "text-gray-500"
										} `
									}
								>
									About
								</NavLink>
							</li>
							<li>
								<NavLink
									to="/"
									className={({ isActive }) =>
										`block pr-2 pl-2 duration-200 ${
											isActive
												? "text-green-500 font-bold"
												: "text-gray-500"
										} `
									}
								>
									Sign In
								</NavLink>
							</li>
							<li>
								<NavLink
									to="/create-trip"
									className={({ isActive }) =>
										`block pr-2 pl-2 duration-200 ${
											isActive
												? "text-green-500 font-bold"
												: "text-gray-500"
										} `
									}
								>
									Get started
								</NavLink>
							</li>
							<li className="block -mt-1.5 -pr-1  duration-200 duration-110">
								<ModeToggle />
							</li>
						</ul>
					</div>
				</div>
			</nav>
		</header>
	);
}

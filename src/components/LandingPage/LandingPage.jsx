import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthDialog } from "../AuthDialog/AuthDialog";
import { useGoogleAuth } from "@/services/Auth";

export default function LandingPage() {
	const [openDialog, setOpenDialog] = useState(false);
	const [loading, setLoading] = useState(false);
	const navigate = useNavigate();

	const login = useGoogleAuth(() => {
		setOpenDialog(false);
		navigate("/create-trip");
	});

	useEffect(() => {
		const user = JSON.parse(localStorage.getItem("user"));
		if (user) {
			navigate("/create-trip");
		}
	}, [navigate]);

	return (
		<>
			<div className="container flex flex-col items-center gap-9 -mt-14 md:mt-0">
				<h1 className="container font-mono font-bold text-3xl md:text-4xl lg:text-[60px] p-1 text-center mt-16 ">
					<span className="text-blue-700 leading-tight">
						Explore Your Next Adventure with AI:
					</span>
					<span className="leading-tight">
						{" "}
						Customized Itineraries at Your Fingertips
					</span>
				</h1>
				<p className="text-sm md:text-lg lg:text-xl text-center p-1 text-gray-500">
					Your dedicated travel companion, crafting personalized
					journeys that match your passions and your pocket.
					<img className=" md:h-80 mx-auto" src="/landing.png" />
				</p>
				<button
					onClick={() => {
						const user = JSON.parse(localStorage.getItem("user"));
						if (user) {
							navigate("/create-trip");
						} else {
							setOpenDialog(true);
						}
					}}
					className="font-sans font-medium transition ease-in-out delay-150 bg-blue-600
                    hover:-translate-y-1 hover:scale-110 hover:bg-indigo-600 text-white
                    duration-300 rounded-lg text-sm lg:text-lg
                    px-4 items-center py-3 lg:py-3 ... focus:outline-none md:mb-36 lg:mb-32 xl:mb-24 "
				>
					Get Started, It's Free!
				</button>
			</div>
			<AuthDialog
				open={openDialog}
				loading={loading}
				onLogin={login}
				onClose={() => setOpenDialog(false)}
			/>
		</>
	);
}

import { Link } from "react-router-dom";

export default function LandingPage() {
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
				<Link to={"/create-trip"}>
					<button
						className="font-sans font-medium transition ease-in-out delay-150 bg-blue-600
						hover:-translate-y-1 hover:scale-110 hover:bg-indigo-600 text-white
						duration-300 rounded-lg text-sm lg:text-lg
						px-4 items-center py-3 lg:py-3 ... focus:outline-none md:mb-36 lg:mb-32 xl:mb-24 "
					>
						Get Started, It's Free!
					</button>
				</Link>
			</div>
		</>
	);
}

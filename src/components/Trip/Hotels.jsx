import React from "react";
import { Link } from "react-router-dom";

export const Hotels = ({ trip }) => {
	return (
		<div>
			<h1 className="font-bold text-lg sm:text-lg md:text-2xl mt-7 md:mt-10 lg:mt-16 mb-2">
				🏨 Hotel Recommendations 🏨
			</h1>
			<div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-3 xl:grid-cols-3 text-justify gap-3 md:gap-6 xl:gap-6">
				{trip?.tripData?.hotels?.map((hotel, index) => (
					<div
						key={index}
						className="text-sm lg:text-base hover:scale-105 transition-all border-2 border-customGreen dark:border-customBlue rounded-lg px-2 cursor-pointer"
					>
						<Link
							to={
								"https://www.google.com/maps/search/?api=1&query=" +
								hotel.HotelName +
								hotel.HotelAddress +
								trip?.userSelection?.location?.label
							}
							target="_blank"
						>
							{/* <img
							src={hotel.HotelImageURL || "/trip.jpg"}
							alt={`Image of ${hotel.HotelName}`}
						/> */}
							<h2 className="font-semibold text-sm md:text-lg mt-2">
								🏛️ {hotel.HotelName}
							</h2>
							<p className="">{hotel.Description}</p>
							<p className="my-2">
								<span className="font-semibold">Address: </span>{" "}
								{hotel.HotelAddress}
							</p>
							<p className="my-2">
								<span className="font-semibold">Price: </span>{" "}
								{hotel.Price}
							</p>
							<p className="mt-2 pb-1">
								<span className="font-semibold">Raiting: </span>
								{hotel.Rating}
							</p>
						</Link>
					</div>
				))}
			</div>
		</div>
	);
};

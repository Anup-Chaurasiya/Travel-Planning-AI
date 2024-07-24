import React from "react";
import { Link } from "react-router-dom";

export const Itinerary = ({ trip }) => {
	return (
		<div className="mt-10">
			<h1 className="font-bold text-lg md:text-2xl mt-5">
				🏖️ Trip Itinerary 🏖️
			</h1>
			<div className="text-justify ">
				{trip?.tripData?.itinerary?.map((day, dayIndex) => (
					<div key={dayIndex} className="text-sm lg:text-base">
						<h2 className="font-semibold text-md mt-4">
							🗓️ {day.Day}
						</h2>
						<div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3 md:gap-6 xl:gap-5">
							{day.Activities?.map((activity, activityIndex) => (
								<div
									key={activityIndex}
									className="mt-2 text-sm lg:text-base hover:scale-105 transition-all border-2 border-customGreen dark:border-customBlue rounded-lg px-2 cursor-pointer"
								>
									<Link
										to={
											"https://www.google.com/maps/search/?api=1&query=" +
											activity.PlaceName +
											trip?.userSelection?.location?.label
										}
										target="_blank"
									>
										{/* <img
									src={
										activity.PlaceImageURL || "/default.jpg"
									}
									alt={`Image of ${activity.PlaceName}`}
								/> */}
										<h3 className="font-semibold mt-1">
											📍 {activity.PlaceName}
										</h3>
										<p className="my-1">
											{activity.PlaceDetails}
										</p>
										<p className="my-1">
											<span className="font-bold">
												Best Time to Visit:{" "}
											</span>{" "}
											{activity.BestTimeToVisit}
										</p>
										<p className="my-1">
											<span className="font-bold">
												Ticket Pricing:
											</span>{" "}
											{activity.TicketPricing}
										</p>
										<p className="my-1">
											<span className="font-bold">
												Travel Time:{" "}
											</span>{" "}
											{activity.TravelTime}
										</p>
									</Link>
								</div>
							))}
						</div>
					</div>
				))}
			</div>
		</div>
	);
};

import { GetPlaceDetails } from "@/services/GlobalAPI";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function MyTripsCard({ trip }) {
	const [photoUrl, setPhotoUrl] = useState([]);

	useEffect(() => {
		if (trip) {
			GetPlacePhotos();
		}
	}, [trip]);

	const PHOTO_REF_URL =
		"https://places.googleapis.com/v1/{NAME}/media?maxHeightPx=1000&maxWidthPx=1000&key=" +
		import.meta.env.VITE_GOOGLE_PLACE_APIKEY;

	const GetPlacePhotos = async () => {
		const data = {
			textQuery: trip?.userSelection?.location?.label,
		};

		try {
			const result = await GetPlaceDetails(data);
			const photos = [9].map((index) =>
				PHOTO_REF_URL.replace(
					"{NAME}",
					result.data.places[0].photos[index].name
				)
			);
			setPhotoUrl(photos);
		} catch (error) {
			console.error("Error fetching place details:", error);
		}
	};

	return (
		<Link to={"/view-trip/" + trip?.id}>
			<div className="text-sm lg:text-base hover:scale-105 transition-all border-2 rounded-2xl px-1 cursor-pointer">
				<img
					className="h-56 w-full rounded-2xl p-2"
					src={photoUrl ? photoUrl : "/trip.jpg"}
				/>
				{/* Added alt attribute for better accessibility */}
				<div className="my-6 mx-2 ">
					<h2 className="font-semibold text-sm md:text-lg mt-2 text-left">
						🏛️ {trip?.userSelection?.location?.label}
					</h2>
					<h2 className="font-semibold text-sm md:text-lg mt-2 text-left">
						🏛️ No of Days: {trip?.userSelection?.noOfDays}
					</h2>
					<h2 className="font-semibold text-sm md:text-lg mt-2 text-left">
						🏛️ Budget: {trip?.userSelection?.budget}
					</h2>
					<h2 className="font-semibold text-sm md:text-lg mt-2 text-left">
						🏛️ Traveler: {trip?.userSelection?.people}
					</h2>
				</div>
			</div>
		</Link>
	);
}

export default MyTripsCard;

//  		https://places.googleapis.com/v1/{NAME}/media?maxHeightPx=1000&maxWidthPx=1000&key=

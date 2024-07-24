import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "@/services/fireBaseConfig";
import MyTripsCard from "./MyTripsCard";

export const MyTrips = () => {
	const navigate = useNavigate();
	const [userTrips, setUserTrips] = useState([]);

	useEffect(() => {
		const fetchUserTrips = async () => {
			const user = JSON.parse(localStorage.getItem("user"));
			if (!user) {
				navigate("/create-trip");
				return;
			}

			try {
				const q = query(
					collection(db, "AItrip"),
					where("userEmail", "==", user.email)
				);
				const querySnapshot = await getDocs(q);
				const trips = [];
				querySnapshot.forEach((doc) => {
					console.log(doc.id, " => ", doc.data());
					trips.push(doc.data()); // Accumulate trips
				});
				setUserTrips(trips); // Set all trips at once
			} catch (error) {
				console.error("Error fetching user trips: ", error);
			}
		};

		fetchUserTrips();
	}, [navigate]);

	return (
		<div className="container xl:px-40 font-mono">
			<h1 className="font-bold text-lg sm:text-lg md:text-2xl mt-6 md:mt-10 lg:mt-16 mb-8 md:mb-20">
				My Trips 🏕️🌴
			</h1>
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 text-justify gap-3 md:gap-6 xl:gap-6">
				{userTrips?.length > 0
					? userTrips.map((trip, index) => (
							<MyTripsCard key={index} trip={trip} /> // Properly render each card with a key
					  ))
					: [1, 2, 3, 4, 5].map((item, index) => (
							<div
								key={index}
								className="h-56 w-full bg-slate-300 dark:bg-slate-800 animate-pulse rounded-2xl p-2"
							></div>
					  ))}
			</div>
		</div>
	);
};

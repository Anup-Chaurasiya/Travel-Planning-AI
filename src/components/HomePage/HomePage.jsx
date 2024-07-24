import React, { useEffect, useState } from "react";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import { Button } from "../ui/button";
import { toast } from "sonner";
import { chatSession } from "@/services/AImodel";
import { useNavigate } from "react-router-dom";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
	AI_PROMPT,
	SelectBudgetOptions,
	SelectTravelerList,
} from "@/constants/options";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
} from "@/components/ui/dialog";
import { FcGoogle } from "react-icons/fc";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { doc, setDoc } from "firebase/firestore";
import { db } from "@/services/fireBaseConfig";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

export const HomePage = () => {
	const [place, setPlace] = useState();
	const [formData, setFormData] = useState([]);
	const [openDialog, setOpenDialog] = useState(false);
	const [loading, setLoading] = useState(false);

	const handleInputChanges = (name, value) => {
		setFormData({
			...formData,
			[name]: value,
		});
	};

	const login = useGoogleLogin({
		onSuccess: (codeResp) => GetUserProfile(codeResp),
		onError: (error) => console.log(error),
	});

	useEffect(() => {}, [formData]);

	const onGenerateTrip = async () => {
		const user = localStorage.getItem("user");

		if (!user) {
			setOpenDialog(true);
			return;
		}

		if (
			formData?.noOfDays > 15 ||
			formData?.noOfDays < 1 ||
			!formData?.location ||
			!formData?.budget ||
			!formData?.people
		) {
			toast("please fill all details!");
			return;
		}

		setLoading(true);
		toast(
			"Patience is a virtue, and awesome things take time. We'll get you there soon!"
		);

		const FINAL_PROMPT = AI_PROMPT.replace("{noOfDays}", formData?.noOfDays)
			.replace("{people}", formData?.people)
			.replace("{location}", formData?.location?.label)
			.replace("{budget}", formData?.budget);

		const result = await chatSession.sendMessage(FINAL_PROMPT);

		const responseText = result?.response?.text();
		console.log("--", responseText);

		const responseJSON = JSON.parse(responseText);
		setLoading(false);
		saveAiTrip(responseJSON);
	};

	const navigate = useNavigate();

	const saveAiTrip = async (TripData) => {
		setLoading(true);
		const user = JSON.parse(localStorage.getItem("user"));
		const docId = Date.now().toString();
		await setDoc(doc(db, "AItrip", docId), {
			userSelection: formData,
			tripData: TripData,
			userEmail: user?.email,
			id: docId,
		});
		setLoading(false);
		navigate("/view-trip/" + docId);
	};

	const GetUserProfile = (tokenInfo) => {
		axios
			.get(
				`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tokenInfo?.access_token}`,
				{
					headers: {
						Authorization: `Bearer ${tokenInfo?.access_token}`,
						Accept: `Application/json`,
					},
				}
			)
			.then((resp) => {
				console.log(resp);
				localStorage.setItem("user", JSON.stringify(resp.data));
				setOpenDialog(false);
				onGenerateTrip();
			});
	};

	const handleKeyDown = (event) => {
		if (event.keyCode === 38 || event.keyCode === 40) {
			event.preventDefault();
		}
	};

	return (
		<>
			<div className="w-full overflow-hidden px-3 md:px-14 lg:px-14 xl:px-40 font-serif ">
				<Card className="mt-6 border-y-4 p-6">
					<CardHeader>
						<CardTitle className="pt-5  text-left text-lg md:text-2xl lg:text-3xl font-bold tracking-wider md:tracking-widest">
							Please share your travel preferences with us🏕️🌴
						</CardTitle>
						<CardDescription className="pt-5 pb-3 text-justify md:text-left font-light text-sm md:text-lg lg:text-xl tracking-tighter md:tracking-widest">
							Simply provide some basic information, and our trip
							planner will create a personalized itinerary
							tailored to your preferences.
						</CardDescription>
					</CardHeader>
					<CardContent>
						<form>
							<div className="grid w-full items-center">
								<div className="flex flex-col space-y-10">
									<div className="space-y-2">
										<Label
											htmlFor="name"
											className="text-base md:text-lg"
										>
											What is your preferred destination?
										</Label>
										<div className="dark:text-slate-800 border-2 border-customGreen dark:border-customBlue">
											<GooglePlacesAutocomplete
												className=""
												apiKey={
													import.meta.env
														.VITE_GOOGLE_PLACE_APIKEY
												}
												selectProps={{
													place,
													onChange: (val) => {
														setPlace(val);
														handleInputChanges(
															"location",
															val
														);
													},
												}}
											/>
										</div>
									</div>
									<div>
										<Label
											htmlFor="days"
											className="text-base md:text-lg"
										>
											How many days do you plan to spend
											on your trip?
										</Label>
										<Input
											id="days"
											type="number"
											placeholder="EX. 3"
											min="0"
											onChange={(e) =>
												handleInputChanges(
													"noOfDays",
													e.target.value
												)
											}
											onKeyDown={handleKeyDown}
											className="border-2 border-customGreen dark:border-customBlue bg-white"
										/>
									</div>
									<div>
										<Label
											htmlFor="budget"
											className="text-base md:text-lg"
										>
											What's your spending limit?
										</Label>
										<div className="grid grid-cols-1 md:grid-cols-3 mt-5  cursor-pointer text-sm md:text-base lg:text-base items-center text-center">
											{SelectBudgetOptions.map(
												(item, index) => (
													<div
														key={index}
														onClick={() =>
															handleInputChanges(
																"budget",
																item.title
															)
														}
														className={`p-1 m-1 md:p-2 md:m-1 border-4 rounded-lg hover:shadow-lg border-customGreen dark:border-customBlue hover:shadow-customGreen dark:hover:shadow-customBlue ${
															formData?.budget ===
																item.title &&
															`shadow-xl border-customGreen dark:border-customBlue`
														}`}
													>
														<h2 className="font-bold text-md">
															<span className="text-lg">
																{item.icon}
															</span>{" "}
															{item.title}
														</h2>
														<h2 className="text-gray-600 dark:text-gray-400">
															{item.des}
														</h2>
													</div>
												)
											)}
										</div>
									</div>
									<div>
										<Label
											htmlFor="noOfPeople"
											className="text-base md:text-lg"
										>
											Who are you planning to travel with
											on your next adventure?
										</Label>
										<div className="grid grid-cols-2 mt-5 cursor-pointer text-[14px] md:text-base lg:text-base items-center text-center">
											{SelectTravelerList.map(
												(item, index) => (
													<div
														key={index}
														onClick={() =>
															handleInputChanges(
																"people",
																item.people
															)
														}
														className={`p-1 m-1 md:p-4 md:m-3 border-4 rounded-lg border-customGreen dark:border-customBlue hover:shadow-lg hover:shadow-customGreen dark:hover:shadow-customBlue ${
															formData?.people ===
																item.people &&
															`shadow-xl border-customGreen dark:border-customBlue`
														}`}
													>
														<h2 className="font-bold">
															<span className="text-xl">
																{item.icon}
															</span>{" "}
															{item.title}
														</h2>
														<h2 className="text-gray-600 dark:text-gray-400">
															{item.des}
														</h2>
													</div>
												)
											)}
										</div>
									</div>
								</div>
							</div>
						</form>
					</CardContent>
					<CardFooter className="flex justify-end mt-5">
						<Button
							disabled={loading}
							onClick={onGenerateTrip}
							className="bg-blue-700 hover:bg-indigo-700 dark:text-white hover:shadow-xl transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-100 md:text-lg"
						>
							{loading ? (
								<AiOutlineLoading3Quarters className="h-7 w-7 animate-spin" />
							) : (
								"Generate Trip"
							)}
						</Button>
					</CardFooter>
				</Card>
			</div>

			<Dialog open={openDialog}>
				<DialogContent>
					<DialogHeader>
						<DialogDescription>
							<img
								className="w-44 sm:w-52 md:w-64 lg:w-72 xl:w-80 rounded-lg"
								src="/travelMate.png"
							/>
							<h1 className="mx-auto mt-2 md:mt-4 text-left dark:text-green-400 text-green-600 font-semibold text-base md:text-2xl">
								Sign In with Google
							</h1>
							<p className="text-slate-600 dark:text-slate-400 text-[0.6rem] sm:text-[0.7rem] md:text-base ">
								Sign in to the App with Google authentication
								securely
							</p>
							<Button
								disabled={loading}
								onClick={login}
								className="w-full mt-5 gap-2 items-center text-base"
							>
								<FcGoogle className="h-7 w-7 " /> Sign in with
								Google
							</Button>
						</DialogDescription>
					</DialogHeader>
				</DialogContent>
			</Dialog>
		</>
	);
};

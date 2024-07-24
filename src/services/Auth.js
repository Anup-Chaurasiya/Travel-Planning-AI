import axios from "axios";
import { useGoogleLogin } from "@react-oauth/google";
import { toast } from "sonner";

export const GetUserProfile = (tokenInfo, setOpenDialog, onGenerateTrip) => {
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

export const useGoogleAuth = (setOpenDialog, onGenerateTrip) => {
	const login = useGoogleLogin({
		onSuccess: (codeResp) =>
			GetUserProfile(codeResp, setOpenDialog, onGenerateTrip),
		onError: (error) => {
			console.error(error);
			toast.error("Google login failed. Please try again.");
		},
	});
	return login;
};

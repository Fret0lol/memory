import {GoogleLogin, GoogleOAuthProvider} from "@react-oauth/google";
import {useStore} from "../store/auth";
import axios from "axios";
import User from "./User";

export default function Login() {
	const setAuthData = useStore((state) => state.setAuthData);

	return (
		<>
			{!useStore((state) => state.authData) ? (
				<>
					<h1>Welcome</h1>
					<GoogleOAuthProvider clientId={import.meta.env.VITE_APP_GOOGLE_CLIENT_ID}>
						<GoogleLogin
							useOneTap
							onSuccess={async (credentialResponse) => {
								console.log(credentialResponse);
								const data = await axios.post("http://localhost:3000/auth/login", {
									token: credentialResponse.credential,
								});								
								localStorage.setItem("AuthData", JSON.stringify(data.data));
								setAuthData(data.data);
							}}
							onError={() => {
								console.log("Login Failed");
							}}
						/>
					</GoogleOAuthProvider>
				</>
			) : (
				<>
					<h1>React x Nestjs Google Sign In</h1>
					<User />
				</>
			)}
		</>
	);
}

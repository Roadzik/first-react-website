import { useState, useEffect } from "react";
import "./Login.css";
import { Navigate } from "react-router-dom";

const Login = () => {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");

	const fetchImage = async (token) => {
		const response = await fetch(
			"http://localhost:4000/api/getProfilePicture",
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					authorization: `Bearer ${token}`,
				},
			}
		);
		return response.json();
	};

	const handleUserInput = () => {
		if (
			username === "" ||
			username == null ||
			password === "" ||
			password == null
		) {
			return 0;
		}
		return [setError("")];
	};
	async function handleSubmit(e) {
		e.preventDefault();
		if (!handleUserInput()) return setError("Please fill the data");

		const response = await fetch("http://localhost:4000/api/login", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ username, password }),
		});
		return response.json();
	}
	if (window.localStorage.getItem("authenticated"))
		return <Navigate replace to='/' />;
	else {
		return (
			<div className='login-container'>
				<div className='form-container'>
					<div className='error'>{error}</div>
					<form
						onSubmit={(e) =>
							handleSubmit(e).then((data) => {
								if (data.authenticated) {
									window.localStorage.setItem("accessToken", data.accessToken);
									window.localStorage.setItem(
										"authenticated",
										data.authenticated
									);
									fetchImage(window.localStorage.getItem("accessToken")).then(
										(data) => {
											window.localStorage.setItem("profilePicture", data);
										}
									);
								}
								setError(data.message);
							})
						}
						method='POST'
					>
						<label htmlFor='username'>Username</label>
						<input
							type='text'
							name='username'
							id='username'
							onInput={(e) => setUsername(e.target.value)}
						/>
						<label htmlFor='password'>Password</label>
						<input
							type='password'
							name='password'
							id='password'
							onInput={(e) => setPassword(e.target.value)}
						/>
						<input type='submit' value='Login' />
					</form>
				</div>
			</div>
		);
	}
};

export default Login;

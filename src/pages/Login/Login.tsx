import React, { useState } from "react";
import "./Login.css";
import { Navigate } from "react-router-dom";
import handleUserInput from "../../hooks/handleUserInput";
const Login = () => {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		if (!handleUserInput(username, password)) {
			return setError("Please fill the data");
		} else {
			setError("");
		}

		const response = await fetch("http://localhost:4000/api/login", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ username, password }),
		});
		return response.json();
	};

	if (window.localStorage.getItem("authenticated")) {
		return <Navigate replace to='/' />;
	} else {
		return (
			<div className='login-container'>
				<div className='form-container'>
					<div className='error'>{error}</div>
					<form
						onSubmit={(e) =>
							handleSubmit(e).then((data) => {
								if (data === undefined || data === null) return;
								if (data.authenticated) {
									window.localStorage.setItem("accessToken", data.accessToken);
									window.localStorage.setItem("username", data.username);
									window.localStorage.setItem("profileId", data.profileId);
									window.localStorage.setItem("ref", "0");
									window.localStorage.setItem(
										"authenticated",
										data.authenticated
									);
									window.localStorage.setItem(
										"profilePicture",
										data.profilePicture || "user.svg"
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
							onInput={(e) => setUsername((e.target as HTMLInputElement).value)}
						/>
						<label htmlFor='password'>Password</label>
						<input
							type='password'
							name='password'
							id='password'
							onInput={(e) => setPassword((e.target as HTMLInputElement).value)}
						/>
						<input type='submit' value='Login' />
					</form>
				</div>
			</div>
		);
	}
};

export default Login;

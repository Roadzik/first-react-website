import { FormEvent, useEffect, useState } from "react";
import PasswordRequirements from "../../components/PasswordRequirements/PasswordRequirements";
import "./Register.css";
import { Navigate } from "react-router-dom";

const Register = () => {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");
	const [color, setColor] = useState(".error");
	useEffect(() => {
		if (handleUserInput()) {
			setColor("green");
			setError("Data filled");
		} else {
			setColor("red");
			setError("Please fill the data");
		}
	}, [password]);

	const handleUserInput = () => {
		if (
			username === "" ||
			username == null ||
			password === "" ||
			password == null ||
			password.length < 8 ||
			!/[A-Z]/.test(password) ||
			!/[a-z]/.test(password) ||
			!/[`!@#$%^&*()_\-+=\[\]{};':"\\|,.<>\/?~ ]/.test(password)
		) {
			return 0;
		}
		return 1;
	};
	async function handleSubmit(e: FormEvent) {
		e.preventDefault();
		if (!handleUserInput()) {
			return { message: "Please fill the data" };
		}

		const response = await fetch("http://localhost:4000/api/register", {
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
			<div className='register-container'>
				<h2>Register</h2>
				<div className='form-container'>
					{error.length === 0 ? (
						""
					) : (
						<div style={{ color }} className='error'>
							{error}
						</div>
					)}
					<form
						onSubmit={(e) =>
							handleSubmit(e).then((data) => {
								setError(data.message);
								setColor("green");
								if (!data.created) setColor("red");
							})
						}
						method='POST'
					>
						<label htmlFor='username'>Username</label>
						<input
							type='text'
							name='username'
							id='username'
							onInput={(e) =>
								setUsername((e.target as HTMLTextAreaElement).value)
							}
						/>
						<label htmlFor='password'>Password</label>
						<input
							type='password'
							name='password'
							id='password'
							onInput={(e) => {
								setPassword((e.target as HTMLTextAreaElement).value);
							}}
						/>
						<PasswordRequirements password={password} />
						<input type='submit' value='Register' />
					</form>
				</div>
			</div>
		);
	}
};

export default Register;

import { useState } from "react";
import PasswordRequirements from "../../components/PasswordRequirements/PasswordRequirements";
import "./Register.css";
const Register = () => {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");
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
		)
			return 0;
		return [setError("")];
	};
	async function handleSubmit(e) {
		e.preventDefault();
		if (!handleUserInput()) return setError("Please fill the data");

		let response = await fetch("http://localhost:4000/api/register", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ username, password }),
		});

		return response.json();
	}

	return (
		<div className='register-container'>
			<div className='form-container'>
				{error.length === 0 ? "" : <div className='error'>{error}</div>}
				<form
					onSubmit={(e) => handleSubmit(e).then((data) => console.log(data))}
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
					<PasswordRequirements password={password} />
					<input type='submit' value='Register' />
				</form>
			</div>
		</div>
	);
};

export default Register;

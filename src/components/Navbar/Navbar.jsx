import { useEffect, useState } from "react";
import "./Navbar.css";

const Navbar = () => {
	const handleClick = () => {
		localStorage.clear();
	};
	useEffect(() => {
		console.log("navbar loaded");
	}, []);
	return (
		<nav className='navbar'>
			<a href='/'>
				<img src='/home.svg' alt='Home' />
			</a>
			<input
				type='text'
				name=''
				id=''
				className='search'
				placeholder='Search'
			/>
			<ul>
				<li>
					<a href='/notifications'>
						<img src='/notification.svg' alt='Notifications' />
					</a>
				</li>
				<li>
					<a href='/messages'>
						<img src='/message.svg' alt='Messages' />
					</a>
				</li>
				{!window.localStorage.getItem("authenticated") ? (
					<>
						<li>
							<a href='/login'>
								<button>Login</button>
							</a>
						</li>
						<li>
							<a href='/register'>
								<button>Register</button>
							</a>
						</li>
					</>
				) : (
					<>
						<li>
							<a href={"/profile/" + window.localStorage.getItem("profileId")}>
								<img
									src={"/" + window.localStorage.getItem("profilePicture")}
									alt='User'
									className='profile-picture'
								/>
							</a>
						</li>
						<li>
							<a href=''>
								<button onClick={handleClick}>Log out</button>
							</a>
						</li>
					</>
				)}
			</ul>
		</nav>
	);
};

export default Navbar;

import "./Navbar.css";
import { Link } from "react-router-dom";

const Navbar = () => {
	const handleClick = () => {
		localStorage.clear();
		window.location.reload(false);
	};

	return (
		<nav className='navbar'>
			<Link to='/'>
				<img src='/home.svg' alt='Home' />
			</Link>
			<input
				type='text'
				name=''
				id=''
				className='search'
				placeholder='Search'
			/>
			<ul>
				<li>
					<Link to='/notifications'>
						<img src='/notification.svg' alt='Notifications' />
					</Link>
				</li>
				<li>
					<Link to='/messages'>
						<img src='/message.svg' alt='Messages' />
					</Link>
				</li>
				{!window.localStorage.getItem("authenticated") ? (
					<>
						<li>
							<Link to='/login'>
								<button>Login</button>
							</Link>
						</li>
						<li>
							<Link to='/register'>
								<button>Register</button>
							</Link>
						</li>
					</>
				) : (
					<>
						<li>
							<Link to={"/profile/" + window.localStorage.getItem("profileId")}>
								<img
									src={"/" + window.localStorage.getItem("profilePicture")}
									alt='User'
									className='profile-picture'
								/>
							</Link>
						</li>
						<li>
							<Link to=''>
								<button onClick={handleClick}>Log out</button>
							</Link>
						</li>
					</>
				)}
			</ul>
		</nav>
	);
};

export default Navbar;

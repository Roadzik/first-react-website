import "./Profile.css";

const Profile = () => {
	return (
		<div className='profile'>
			<div className='menu'></div>
			<div className='main'>
				<div className='data'>
					<div className='data-container'>
						<img
							src={window.localStorage.getItem("profilePicture")}
							alt=''
							style={{
								width: "165px",
								height: "165px",
							}}
							className='profile-picture'
						/>
						<p>{window.localStorage.getItem("username")}</p>
					</div>
					<button>Message</button>
				</div>
				<p></p>
			</div>
			<div className='idk'></div>
		</div>
	);
};

export default Profile;

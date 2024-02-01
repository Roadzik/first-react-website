import "./Profile.css";
import PostList from "../../components/PostList/PostList";
import { useState, useEffect } from "react";
import getAllPosts from "../../hooks/getAllPosts";
import { Link, useParams } from "react-router-dom";
import getUserList from "../../hooks/getUserList";
import { Navigate } from "react-router-dom";

const Profile = () => {
	const { id } = useParams();
	const [posts, setPosts] = useState([]);
	const [userData, setUserData] = useState([]);
	useEffect(() => {
		getAllPosts(id).then((data) => {
			setPosts(data);
		});
		getUserList(id).then((data) => {
			setUserData(data);
		});
	}, []);
	if (userData.found === 404) return <Navigate replace to='/' />;
	else {
		return (
			<div className='profile'>
				<div className='menu'></div>
				<div>
					<div className='main'>
						<div className='data'>
							<div className='data-container'>
								<img
									src={"/" + userData.profilePicture}
									alt=''
									style={{
										width: "165px",
										height: "165px",
									}}
									className='profile-picture'
								/>
								<p>{userData.username}</p>
							</div>
							{id == window.localStorage.getItem("profileId") ? (
								<button>Edit</button>
							) : (
								<button>
									<Link to='/messages'>Message</Link>
								</button>
							)}
						</div>
					</div>
					<PostList posts={posts} />
				</div>
				<div className='idk'></div>
			</div>
		);
	}
};

export default Profile;

import "./Profile.css";
import PostList from "../PostList/PostList";
import { useState, useEffect } from "react";
import getAllPosts from "../../hooks/getAllPosts";
import { Link, useParams } from "react-router-dom";
import getUserList from "../../hooks/getUserList";
import { Navigate } from "react-router-dom";
interface userData {
	username: string;
	profilePicture: string;
	found: Number;
}
const Profile = () => {
	const { id } = useParams();
	const [posts, setPosts] = useState([]);
	const [userData, setUserData] = useState<userData>({
		username: "",
		profilePicture: "",
		found: 200,
	});
	const [error, setError] = useState("");

	const isError = (message: string) => {
		setError(message);
	};
	useEffect(() => {
		getAllPosts(id as string).then((data) => {
			setPosts(data);
		});
		getUserList(id as string).then((data) => {
			setUserData(data);
		});
	}, []);
	const createRecipent = () => {
		fetch(`${process.env.REACT_APP_BACKEND}/api/createRecipent`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${window.localStorage.getItem("accessToken")}`,
			},
			body: JSON.stringify({
				senderId: window.localStorage.getItem("profileId"),
				recipentId: id,
			}),
		});
	};
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
								<button onClick={createRecipent}>
									<Link to='/messages'>Message</Link>
								</button>
							)}
						</div>
					</div>
					<PostList posts={posts} isError={isError} />
				</div>
				<div className='idk'></div>
			</div>
		);
	}
};

export default Profile;

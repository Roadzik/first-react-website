import "./Profile.css";
import PostList from "../PostList/PostList";
import { useState, useEffect, useRef } from "react";
import getAllPosts from "../../hooks/getAllPosts";
import { Link, useParams } from "react-router-dom";
import getUserList from "../../hooks/getUserList";
import { Navigate } from "react-router-dom";
import me from "../../hooks/me";
interface userData {
	username: string;
	profilePicture: string;
	displayName: string;
	found: Number;
}
interface user {
	id: number;
	username: string;
	displayName: string;
	isAdmin: number;
	profilePicture: string;
	profileId: string;
	description: string;
}
interface newData {
	id: number;
	description: string | null;
	profilePicture: string;
	displayName: string;
	username: string;
}
const Profile = () => {
	const { id } = useParams();
	const [posts, setPosts] = useState([]);
	const [edit, setEdit] = useState<Boolean>(false);
	const [user, setUser] = useState<user>({
		id: 0,
		username: "",
		displayName: "",
		isAdmin: 0,
		profilePicture: "",
		description: "",
		profileId: "",
	});
	const [NewData, setNewData] = useState<newData>({
		id: 0,
		description: "",
		profilePicture: "",
		displayName: "",
		username: "",
	});
	const element = useRef<HTMLDivElement>(null);
	const [userData, setUserData] = useState<userData>({
		username: "",
		displayName: "",
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
		me().then((data: user) => {
			console.log(data);
			setUser(data);
			setNewData((prev) => ({
				...prev,
				username: data.username,
				profilePicture: data.profilePicture,
				displayName: data.displayName,
				description: data.description ?? "",
				id: data.id,
			}));
		});
	}, []);
	const handleDataUpdate = async (NewData: newData) => {
		const response = await fetch(
			`${process.env.REACT_APP_BACKEND}/api/UserDataUpdate`,
			{
				method: "PUT",
				headers: {
					"Content-type": "application/json",
					Authorization: `Bearer ${window.localStorage.getItem("accessToken")}`,
				},
				body: JSON.stringify({ data: NewData }),
			}
		);
	};
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
	const handleEdit = () => {
		document.body.style.overflow = "hidden";
		if (element.current !== null) {
			element.current.style.filter = "blur(3px)";
		}
		setEdit(true);
	};
	if (userData.found === 404) return <Navigate replace to='/' />;
	else {
		return (
			<div>
				{edit ? (
					<div className='edit' id='edit'>
						<div className='your-data'>
							<p>Your Data</p>
							<p
								onClick={() => {
									document.body.style.overflowY = "scroll";
									if (element.current !== null) {
										element.current.style.filter = "blur(0px)";
									}
									setEdit(false);
								}}
							>
								X
							</p>
						</div>
						<label htmlFor='username'>Username</label>
						<input
							onInput={(e) =>
								setNewData((prev) => ({
									...prev,
									username: (e.target as HTMLInputElement).value,
								}))
							}
							type='text'
							name='username'
							id='username'
							value={NewData.username}
						/>
						<label htmlFor='profilePicture'>Profile Picture</label>
						<input
							onInput={(e) =>
								setNewData((prev) => ({
									...prev,
									profilePicture: (e.target as HTMLInputElement).value,
								}))
							}
							type='text'
							name='profilePicture'
							id='profilePicture'
							placeholder='URL'
							value={NewData.profilePicture}
						/>
						<label htmlFor='Description'>Description</label>
						<input
							type='text'
							name='Description'
							id='Description'
							onInput={(e) => {
								setNewData((prev) => ({
									...prev,
									description: (e.target as HTMLInputElement).value,
								}));
							}}
							value={NewData.description ?? ""}
						/>
						<label htmlFor='DisplayName'>Display Name</label>
						<input
							type='text'
							name='DisplayName'
							id='DisplayName'
							onInput={(e) => {
								setNewData((prev) => ({
									...prev,
									displayName: (e.target as HTMLInputElement).value,
								}));
								console.log(NewData);
							}}
							value={NewData.displayName}
						/>
						<button
							onClick={() => {
								handleDataUpdate(NewData);
								window.localStorage.setItem(
									"profilePicture",
									NewData.profilePicture
								);
								window.localStorage.setItem(
									"description",
									NewData.description ?? ""
								);
								window.localStorage.setItem("username", NewData.username);
								window.localStorage.setItem("displayName", NewData.displayName);
							}}
						>
							Submit
						</button>
					</div>
				) : (
					<></>
				)}
				<div className='profile' ref={element}>
					<div className='menu'></div>
					<div className='byq'>
						<div className='main'>
							<div className='data'>
								<div className='data-container'>
									<img
										src={userData.profilePicture}
										alt=''
										style={{
											width: "165px",
											height: "165px",
										}}
										className='profile-picture'
									/>
									<div>
										<h4>{userData.username}</h4>
										<p>{userData.displayName}</p>
									</div>
								</div>
								{id == window.localStorage.getItem("profileId") ? (
									<button onClick={() => handleEdit()}>Edit</button>
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
			</div>
		);
	}
};

export default Profile;

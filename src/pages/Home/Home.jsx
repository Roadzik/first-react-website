import "./Home.css";
import React, { useEffect, useState } from "react";
import PostList from "../../components/PostList/PostList";
import getCurrentTime from "../../getCurrentTime";
import getPostsByUser from "../../hooks/getPostsByUser";
import getAllPosts from "../../hooks/getAllPosts";

const Home = () => {
	const [text, setText] = useState("");
	const [posts, setPosts] = useState(null);
	const [time, setTime] = useState(null);
	let currentTime = getCurrentTime();
	let timeDifference = (new Date(currentTime) - new Date(time)) / 1000;

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (timeDifference < 120 || time == null || text.length < 10) return;
		setTime(currentTime);
		const response = await fetch("http://localhost:4000/api/postCreation", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				authorization: `Bearer ${window.localStorage.getItem("accessToken")}`,
			},
			body: JSON.stringify({ text }),
		});
		return response.json();
	};

	useEffect(() => {
		getAllPosts().then((data) => {
			setPosts(data);
		});
		if (window.localStorage.getItem("authenticated")) {
			getPostsByUser().then((lastPostTime) => {
				setTime(lastPostTime);
			});
		}
	}, []);

	return (
		<div className='home'>
			<div className='menu' />
			<div className='main'>
				<div className='post-creator'>
					<div>
						<div>
							<div className='user-data'>
								{window.localStorage.getItem("authenticated") ? (
									<img
										src={window.localStorage.getItem("profilePicture")}
										alt='User'
										className='profile-picture'
									/>
								) : (
									<></>
								)}
								<p>{window.localStorage.getItem("username")}</p>
							</div>
							{window.localStorage.getItem("authenticated") && time != null ? (
								timeDifference > 120 ? (
									<p style={{ color: "green" }}>You can post</p>
								) : (
									<p style={{ color: "red" }}>
										Cooldown: {120 - timeDifference}
									</p>
								)
							) : (
								<></>
							)}
						</div>
						<form
							method='POST'
							onSubmit={(e) =>
								handleSubmit(e).then(() => {
									getAllPosts().then((data) => {
										setPosts(data);
									});
								})
							}
						>
							<textarea
								name='post'
								id='post'
								cols='50'
								rows='8'
								maxLength={255}
								minLength={10}
								onInput={(e) => setText(e.target.value)}
							/>
							<input type='submit' value='ClickMe' />
						</form>
					</div>
				</div>
				<PostList posts={posts} />
			</div>
			<div className='idk' />
		</div>
	);
};

export default Home;

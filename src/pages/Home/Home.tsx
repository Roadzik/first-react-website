import "./Home.css";
import React, { useEffect, useState } from "react";
import PostList from "../../components/PostList/PostList";
import getCurrentTime from "../../getCurrentTime";
import getPostsByUser from "../../hooks/getPostsByUser";
import getAllPosts from "../../hooks/getAllPosts";
import createPost from "../../hooks/createPost";

const Home = () => {
	if (window.localStorage.getItem("ref") === "0") {
		window.localStorage.setItem("ref", "1");
		window.location.reload();
	}
	const [text, setText] = useState("");
	const [posts, setPosts] = useState([]);
	const [time, setTime] = useState("");
	let currentTime = getCurrentTime();
	let timeDifference =
		(new Date(currentTime).getTime() - new Date(time).getTime()) / 1000;

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		if (timeDifference < 120 || time == null || text.length < 10) return;
		setTime(currentTime);
		createPost(text);
	};

	useEffect(() => {
		getAllPosts("%").then((data) => {
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
										src={"/" + window.localStorage.getItem("profilePicture")}
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
									getAllPosts("%").then((data) => {
										setPosts(data);
									});
								})
							}
						>
							<textarea
								name='post'
								id='post'
								cols={50}
								rows={8}
								maxLength={255}
								minLength={10}
								onInput={(e) => setText((e.target as HTMLInputElement).value)}
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

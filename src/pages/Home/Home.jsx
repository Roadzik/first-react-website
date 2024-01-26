import "./Home.css";
import React, { useEffect, useState } from "react";
import PostList from "../../components/PostList";

const Home = () => {
	const [text, setText] = useState("");
	const [posts, setPosts] = useState([{ text: "dasdasdasdasdasdas" }]);
	const handleSubmit = (e) => {
		e.preventDefault();
		fetch("http://localhost:4000/api/postCreation", {
			method: "POST",
			headers: { "Content-Type": "application-json" },
			body: JSON.stringify({ text }),
		});
		setPosts([...posts, { text }]);
	};

	// const firstRender = useFirstRender()
	// useEffect(() => {
	//   if (!firstRender && text !== '') { setPosts([...posts, { text, id: ++id }]) }
	// }, [text])

	return (
		<div className='home'>
			<div className='menu' />
			<div className='main'>
				<div className='post-creator'>
					<div>
						<img src='user.svg' alt='User' />
						<form onSubmit={(e) => handleSubmit(e)}>
							<textarea
								name='post'
								id='post'
								cols='50'
								rows='8'
								maxLength={255}
								onChange={(e) => setText(e.target.value)}
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

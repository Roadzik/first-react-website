import { Link } from "react-router-dom";
// import PostInteraction from "../PostInteraction/PostInteraction";
import "./PostList.css";
import { useState } from "react";
interface props {
	posts: {
		id: string;
		profileId: string;
		profilePicture: string;
		displayName: string;
		creationTime: string;
		text: string;
	}[];
}
const PostList = (props: props) => {
	const posts = props.posts;
	const [image, setImage] = useState("");
	if (posts === null) return;
	const handleLike = async (postId: string) => {
		const response = await fetch(
			`${process.env.REACT_APP_BACKEND}/api/getLikes`,
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${window.localStorage.getItem("accessToken")}`,
				},
				body: JSON.stringify({ postId: postId }),
			}
		);
		return response.json();
	};
	return (
		<div className='posts'>
			{posts.map((post) => (
				<div className='post-container' key={post.id}>
					<div className='top'>
						<div>
							<Link to={"/profile/" + post.profileId}>
								<img
									src={"/" + (post.profilePicture || "user.svg")}
									alt='User'
									className='profile-picture'
								/>
								<h4>{post.displayName}</h4>
							</Link>
						</div>
						<p>{post.creationTime}</p>
					</div>
					<p className='post-text'>{post.text}</p>
					<div className='post-interaction'>
						<button
							onClick={() =>
								handleLike(post.id).then((data) => {
									console.log(data.message);
								})
							}
						>
							<img src='like.svg' alt='' />
						</button>
						<img src='message.svg' alt='' />
					</div>
				</div>
			))}
		</div>
	);
};

export default PostList;

import { Link } from "react-router-dom";
// import PostInteraction from "../PostInteraction/PostInteraction";
import "./PostList.css";
import { useEffect, useState } from "react";
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
interface likes {
	postId: string;
	likesCount: string;
}
const PostList = (props: props) => {
	const posts = props.posts;
	const [images, setImages] = useState<Array<String>>([]);
	const [likes, setLikes] = useState<Array<likes>>([
		{
			postId: "",
			likesCount: "",
		},
	]);
	useEffect(() => {
		getLikes().then((data) => {
			setImages(data);
		});
		getAllLikes().then((data: likes[]) => {
			setLikes(data);
		});
	}, []);

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
		getLikes().then((data: []) => {
			setImages(data);
		});
		getAllLikes().then((data: likes[]) => {
			setLikes(data);
		});
		return response.json();
	};
	const getLikes = async () => {
		const response = await fetch(
			`${process.env.REACT_APP_BACKEND}/api/getLikesOfUser`,
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${window.localStorage.getItem("accessToken")}`,
				},
			}
		);
		return response.json();
	};
	const getAllLikes = async () => {
		const response = await fetch(
			`${process.env.REACT_APP_BACKEND}/api/getAllLikes`,
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
			}
		);
		return response.json();
	};
	console.log(images);
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
						{likes.map((like) =>
							post.id === like.postId ? <p>{like.likesCount}</p> : <></>
						)}

						<button
							onClick={() =>
								handleLike(post.id).then((data) => {
									console.log(data.message);
								})
							}
						>
							{images.includes(post.id) ? (
								<img src='liked.svg' alt='' />
							) : (
								<img src='like.svg' alt='' />
							)}
						</button>
						<img src='message.svg' alt='' />
					</div>
				</div>
			))}
		</div>
	);
};

export default PostList;

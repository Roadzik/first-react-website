import { Link, useParams } from "react-router-dom";
import "../PostList/PostList.css";
import { useEffect, useState } from "react";
import getPost from "../../hooks/getPost";
interface posts {
	creationTime: string;
	id: number;
	postId: string;
	profileId: string;
	profilePicture: string;
	text: string;
	userID: number;
	username: string;
}
interface likes {
	id: number;
	userId: number;
	postId: number;
	likesCount: number;
}
const Posts = () => {
	const { id } = useParams();
	const authed = window.localStorage.getItem("authenticated") ?? 0;
	const [images, setImages] = useState<Array<number>>([]);
	const [error, setError] = useState("");
	const [likes, setLikes] = useState<likes>({
		id: 0,
		userId: 0,
		postId: 0,
		likesCount: 0,
	});
	const [post, setPost] = useState<posts>({
		id: 0,
		text: "",
		userID: 0,
		postId: "",
		creationTime: "",
		profilePicture: "",
		profileId: "",
		username: "",
	});
	const getLikesOfPost = async (id: number) => {
		const response = await fetch(
			`${process.env.REACT_APP_BACKEND}/api/getLikesOfPost`,
			{
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ id: post.id }),
			}
		);
		return response.json();
	};
	const handleLike = async (postId: number) => {
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
		getAllLikes().then((data: likes) => {
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
	useEffect(() => {
		if (id !== undefined) {
			getPost(id).then((data: posts) => {
				setPost(data);
			});
			getLikesOfPost(post.id).then((data: likes) => {
				setLikes({ ...data });
			});
		}
	}, []);
	console.log(post);

	return (
		<div
			className='posts'
			style={{ backgroundColor: "#111315", color: "white", fontSize: "1.3rem" }}
		>
			<div className='post-container' key={post.id}>
				{error !== "" ? (
					<div className='error'>
						<div className='text-container'>
							<p>{error}</p>
							<p onClick={() => setError("")}>X</p>
						</div>
						<Link to='/login'>
							<button>Login</button>
						</Link>
					</div>
				) : (
					<></>
				)}
				<div className='top'>
					<div>
						<Link to={"/profile/" + post.profileId}>
							<img
								src={post.profilePicture || "user.svg"}
								alt='User'
								className='profile-picture'
							/>
							<h4>{post.username}</h4>
						</Link>
					</div>
					<p>{post.creationTime}</p>
				</div>
				<p className='post-text'>{post.text}</p>
				<div className='post-interaction'>
					<div className='likes'>
						{post.id === likes.postId ? <p>{likes.likesCount}</p> : <></>}

						<button
							onClick={() => {
								if (authed) {
									handleLike(post.id).then((data) => {
										console.log(data.message);
									});
								} else {
									setError("You need to be logged in to do this action.");
								}
							}}
						>
							{images.includes(post.id) ? (
								<img src='/liked.svg' alt='' />
							) : (
								<img src='/like.svg' alt='' />
							)}
						</button>
					</div>
					<img src='/message.svg' alt='' />
				</div>
			</div>
		</div>
	);
};

export default Posts;

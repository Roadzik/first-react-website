import "./PostInteraction.css";
const PostInteraction = () => {
	const handleLike = () => {
		const response = fetch(`${process.env.REACT_APP_BACKEND}/api/getLikes`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${window.localStorage.getItem("accessToken")}`,
			},
		});
	};
	return (
		<div className='post-interaction'>
			<img src='like.svg' alt='' />
			<img src='message.svg' alt='' />
		</div>
	);
};

export default PostInteraction;

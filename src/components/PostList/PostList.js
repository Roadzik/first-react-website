import "./PostList.css";

const PostList = (props) => {
	const posts = props.posts;
	if (posts === null) return;
	return (
		<div className='posts'>
			{posts.map((post) => (
				<div className='post-container' key={post.id}>
					<div className='top'>
						<div>
							<img
								src={post.profilePicture || "user.svg"}
								alt='User'
								className='profile-picture'
							/>
							<h4>{post.displayName}</h4>
						</div>
						<p>{post.creationTime}</p>
					</div>
					<p>{post.text}</p>
				</div>
			))}
		</div>
	);
};

export default PostList;

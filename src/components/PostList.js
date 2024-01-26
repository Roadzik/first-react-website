const PostList = (props) => {
	const posts = props.posts;
	if (posts === null) return;
	return (
		<div className='posts'>
			{posts.map((post) => (
				<div className='post-container' key={post.id}>
					<img
						src={post.profilePicture}
						alt='User'
						className='profile-picture'
					/>
					<p>{post.text}</p>
				</div>
			))}
		</div>
	);
};

export default PostList;

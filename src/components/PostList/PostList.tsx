import { Link } from "react-router-dom";
import "./PostList.css";
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
	if (posts === null) return;
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
					<p>{post.text}</p>
				</div>
			))}
		</div>
	);
};

export default PostList;

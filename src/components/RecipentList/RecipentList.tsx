import "./RecipentList.css";
const RecipentList = (props) => {
	const recipents = props.recipents;
	let counter = 0;
	const fetchMessages = props.fetchMessages;
	if (recipents.length === 0) return;
	return (
		<div className='recipent-list'>
			{recipents.map((e) => (
				<div
					key={counter++}
					onClick={() =>
						fetchMessages([
							e.profileId,
							window.localStorage.getItem("profileId"),
						])
					}
				>
					<img
						src={"/" + e.profilePicture}
						alt=''
						className='profile-picture'
					/>
					<h4>{e.username}</h4>
				</div>
			))}
		</div>
	);
};

export default RecipentList;

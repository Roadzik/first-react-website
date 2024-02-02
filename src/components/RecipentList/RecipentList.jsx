import "./RecipentList.css";
const RecipentList = (props) => {
	const recipents = props.recipents;
	if (recipents.length === 0) return;
	return (
		<div className='recipent-list'>
			{recipents.map((e) => (
				<div>
					<img src={"/" + e.profilePicture} alt='' />
					<h4>{e.username}</h4>
				</div>
			))}
		</div>
	);
};

export default RecipentList;

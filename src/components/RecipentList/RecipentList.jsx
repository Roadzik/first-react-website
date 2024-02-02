import "./RecipentList.css";
const RecipentList = (props) => {
	const recipents = props.recipents;
	console.log(props.users);
	if (recipents.length === 0) return;
	const fetchMessages = async (e) => {
		const response = await fetch("http://localhost:400/api/getMessages", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${window.localStorage.getItem("accessToken")}`,
			},
			body: JSON.stringify({ recipentId: e.profileId }),
		});
		return response.json();
	};
	return (
		<div className='recipent-list'>
			{recipents.map((e) => (
				<div onClick={() => fetchMessages(e)}>
					<img src={"/" + e.profilePicture} alt='' />
					<h4>{e.username}</h4>
				</div>
			))}
		</div>
	);
};

export default RecipentList;

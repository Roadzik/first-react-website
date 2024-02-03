import { useEffect, useState } from "react";
import getRecipentsData from "../../hooks/getRecipentData";
import "./Conversation.css";
const Conversation = (props) => {
	const [recipent, setRecipent] = useState([{}]);
	let messages = props.messages;
	let data = "";
	messages.forEach((e) => {
		if (e.recipentId != window.localStorage.getItem("profileId"))
			data = e.recipentId;
	});
	console.log(data);
	useEffect(() => {
		getRecipentsData(data).then((data) => {
			setRecipent(data);
		});
	}, [messages]);
	return (
		<div className='conversation-container'>
			{messages.map((e) =>
				e.senderId === window.localStorage.getItem("profileId") ? (
					<div className='right'>
						<h4>{window.localStorage.getItem("username")}</h4>
						<img
							src={window.localStorage.getItem("profilePicture")}
							alt=''
							className='profile-picture'
						/>
						<p>{e.text}</p>
					</div>
				) : (
					<div className='left'>
						<h4>{recipent[0].username}</h4>
						<img
							src={recipent[0].profilePicture}
							alt=''
							className='profile-picture'
						/>
						<p>{e.text}</p>
					</div>
				)
			)}
		</div>
	);
};

export default Conversation;

import { useEffect, useState } from "react";
import getRecipentsData from "../../hooks/getRecipentData";
import "./Conversation.css";
interface messages {
	senderId: string;
	recipentId: string;
	id: string;
	text: string;
}
interface RecipentsData {
	username: string;
	profilePicture: string;
	profileId: string;
}
interface props {
	messages: messages[];
	recipents: RecipentsData[];
}
const Conversation = (props: props) => {
	const [recipent, setRecipent] = useState<Array<RecipentsData>>([
		{
			username: "string",
			profilePicture: "string",
			profileId: "string",
		},
	]);
	let messages = props.messages;
	let data: string[] = [];
	messages.forEach((e) => {
		if (e.recipentId != window.localStorage.getItem("profileId"))
			data = [e.recipentId];
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
				e.text === null ? (
					<></>
				) : e.senderId === window.localStorage.getItem("profileId") ? (
					<div className='right' key={e.id}>
						<h4>{window.localStorage.getItem("username")}</h4>
						<img
							src={window.localStorage.getItem("profilePicture") ?? "user.svg"}
							alt=''
							className='profile-picture'
						/>
						<p>{e.text}</p>
					</div>
				) : (
					<div className='left' key={e.id}>
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

import "./Messages.css";
import { useEffect, useState } from "react";
import RecipentList from "../../components/RecipentList/RecipentList";
import Conversation from "../../components/Conversation/Conversation";
import getRecipentsData from "../../hooks/getRecipentData";
import getRecipent from "../../hooks/getRecipent";

interface recipents {
	recipentId: string;
}
interface RecipentsData {
	username: string;
	profilePicture: string;
	profileId: string;
}
const Messages = () => {
	const [users, setUsers] = useState<Array<string>>([]);
	const [recipents, setRecipents] = useState<Array<RecipentsData>>([
		{
			username: "",
			profilePicture: "",
			profileId: "",
		},
	]);
	const [messages, setMessages] = useState([]);
	const userIds: string[] = [];
	const fetchMessages = async (...props: []) => {
		const response = await fetch("http://localhost:4000/api/getMessages", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${window.localStorage.getItem("accessToken")}`,
			},
			body: JSON.stringify(props),
		});
		response.json().then((data) => {
			setMessages(data);
		});
	};

	useEffect(() => {
		if (users.length === 0) {
			getRecipent().then((data) => {
				data.forEach((e: recipents) => {
					userIds.push(e.recipentId);
				});
				setUsers(userIds);
			});
		}
		if (users.length !== 0) {
			getRecipentsData(users).then((data) => {
				console.log(data);
				setRecipents(data);
			});
		}
	}, [users]);
	return (
		<div className='messages'>
			<div className='message-list'>
				<RecipentList recipents={recipents} fetchMessages={fetchMessages} />
			</div>
			<div className='message-display'>
				{messages.length !== 0 ? (
					<>
						<Conversation messages={messages} recipents={recipents} />
						<div className='send-message'>
							<textarea name='' id='' cols={170} rows={7}></textarea>
							<img src='send.svg' alt='' className='send-icon' />
						</div>
					</>
				) : (
					<></>
				)}
			</div>
		</div>
	);
};

export default Messages;

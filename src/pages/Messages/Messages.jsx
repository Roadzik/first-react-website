import "./Messages.css";
import { useEffect, useState } from "react";
import RecipentList from "../../components/RecipentList/RecipentList";
import Conversation from "../../components/Conversation/Conversation";
import getRecipentsData from "../../hooks/getRecipentData";
import getRecipent from "../../hooks/getRecipent";

const Messages = () => {
	const [users, setUsers] = useState(null);
	const [recipents, setRecipents] = useState([]);
	const [messages, setMessages] = useState([]);
	let userIds = [];

	const fetchMessages = async (...props) => {
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
		if (users == null) {
			getRecipent().then((data) => {
				data.forEach((e) => {
					userIds.push(e.recipentId);
				});
				setUsers(userIds);
			});
		}
		if (users !== null) {
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
							<textarea name='' id='' cols='170' rows='7'></textarea>
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

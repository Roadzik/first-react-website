import "./Messages.css";
import { useEffect, useState } from "react";
import RecipentList from "../../components/RecipentList/RecipentList";
import Conversation from "../../components/Conversation/Conversation";
import getRecipentsData from "../../hooks/getRecipentData";
import getRecipent from "../../hooks/getRecipent";
import { Navigate } from "react-router-dom";

interface recipents {
	recipentId: string;
}
interface RecipentsData {
	username: string;
	profilePicture: string;
	profileId: string;
}
interface messages {
	senderId: string;
	recipentId: string;
	id: string;
	text: string;
}

const Messages = () => {
	const [message, setMessage] = useState("");
	const [users, setUsers] = useState<Array<string>>([]);
	const [RECIPENT, setRECIPENT] = useState("");
	const [messages, setMessages] = useState<Array<messages>>([]);
	const userIds: string[] = [];
	const [recipents, setRecipents] = useState<Array<RecipentsData>>([
		{
			username: "",
			profilePicture: "",
			profileId: "",
		},
	]);

	const findRecipent = (value: string) => {
		return setRECIPENT(value);
	};
	const fetchMessages = async (...props: [[arg1: string, arg2: string]]) => {
		const response = await fetch(
			`${process.env.REACT_APP_BACKEND}/api/getMessages`,
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${window.localStorage.getItem("accessToken")}`,
				},
				body: JSON.stringify(props),
			}
		);
		response.json().then((data) => {
			setMessages(data);
		});
	};

	const sendMessage = async (e: string) => {
		const response = await fetch(
			`${process.env.REACT_APP_BACKEND}/api/sendMessage`,
			{
				method: "POST",
				headers: {
					"Content-type": "application/json",
					Authorization: `Bearer ${window.localStorage.getItem("accessToken")}`,
				},
				body: JSON.stringify({
					text: e,
					senderId: window.localStorage.getItem("profileId"),
					recipentId: RECIPENT,
				}),
			}
		);
		fetchMessages([
			RECIPENT,
			window.localStorage.getItem("profileId") as string,
		]);
	};

	useEffect(() => {
		if (users.length === 0 && window.localStorage.getItem("authenticated")) {
			getRecipent().then((data) => {
				data.forEach((e: recipents) => {
					userIds.push(e.recipentId);
				});
				setUsers(userIds);
			});
		}
		if (users.length !== 0 && window.localStorage.getItem("authenticated")) {
			getRecipentsData(users).then((data) => {
				setRecipents(data);
			});
		}
	}, [users]);
	if (
		window.localStorage.getItem("authenticated") === null ||
		window.localStorage.getItem("authenticated") !== "1"
	)
		return <Navigate replace to='/' />;
	else {
		return (
			<div className='messages'>
				<div className='message-list'>
					<RecipentList
						recipents={recipents}
						fetchMessages={fetchMessages}
						findRecipent={findRecipent}
					/>
				</div>
				<div className='message-display'>
					{messages.length !== 0 ? (
						<>
							<Conversation
								messages={messages}
								recipents={recipents}
								recipent={RECIPENT}
							/>
							<div className='send-message'>
								<textarea
									name=''
									id=''
									cols={170}
									rows={3}
									onInput={(e) =>
										setMessage((e.target as HTMLTextAreaElement).value)
									}
								></textarea>
								<img
									src='send.svg'
									alt=''
									className='send-icon'
									onClick={() => {
										sendMessage(message);
									}}
								/>
							</div>
						</>
					) : (
						<></>
					)}
				</div>
			</div>
		);
	}
};

export default Messages;

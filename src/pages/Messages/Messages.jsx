import "./Messages.css";
import { useEffect, useState } from "react";
import RecipentList from "../../components/RecipentList/RecipentList";
const Messages = () => {
	const [users, setUsers] = useState(null);
	const [recipents, setRecipents] = useState([]);
	let userIds = [];
	const getRecipent = async () => {
		const response = await fetch("http://localhost:4000/api/recipents", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${window.localStorage.getItem("accessToken")}`,
			},
			body: JSON.stringify({
				senderId: window.localStorage.getItem("profileId"),
			}),
		});
		return response.json();
	};

	const getRecipentsData = async () => {
		const response = await fetch("http://localhost:4000/api/getRecipentsData", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${window.localStorage.getItem("accessToken")}`,
			},
			body: JSON.stringify({ users }),
		});
		return response.json();
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
			getRecipentsData().then((data) => {
				setRecipents(data);
			});
		}
	}, [users]);
	return (
		<div className='messages'>
			<div className='message-list'>
				<RecipentList recipents={recipents} />
			</div>
			<div className='message-display'></div>
		</div>
	);
};

export default Messages;

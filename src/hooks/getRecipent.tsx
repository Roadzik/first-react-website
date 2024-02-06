const getRecipent = async () => {
	const response = await fetch(`${process.env.REACT_APP_BACKEND}/api/recipents`, {
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
export default getRecipent;

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
export default getRecipent;

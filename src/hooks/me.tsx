const me = async () => {
	const response = await fetch(`${process.env.REACT_APP_BACKEND}/api/me`, {
		method: "POST",
		headers: {
			"Content-type": "application/json",
			Authorization: `Bearer ${window.localStorage.getItem("accessToken")}`,
		},
	});
	return response.json();
};

export default me;

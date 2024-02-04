const getPostsByUser = async () => {
	const response = await fetch("http://localhost:4000/api/postsByUser", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			authorization: `Bearer ${window.localStorage.getItem("accessToken")}`,
		},
	});
	return response.json();
};

export default getPostsByUser;

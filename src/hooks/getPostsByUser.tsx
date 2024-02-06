const getPostsByUser = async () => {
	const response = await fetch(
		`${process.env.REACT_APP_BACKEND}/api/postsByUser`,
		{
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				authorization: `Bearer ${window.localStorage.getItem("accessToken")}`,
			},
		}
	);
	return response.json();
};

export default getPostsByUser;

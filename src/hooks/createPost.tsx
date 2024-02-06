const createPost = async (text: string) => {
	const response = await fetch(`${process.env.REACT_APP_BACKEND}/api/postCreation`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			authorization: `Bearer ${window.localStorage.getItem("accessToken")}`,
		},
		body: JSON.stringify({ text }),
	});
	return response.json();
};

export default createPost;

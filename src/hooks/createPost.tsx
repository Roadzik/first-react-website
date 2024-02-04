const createPost = async (text: string) => {
	const response = await fetch("http://localhost:4000/api/postCreation", {
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

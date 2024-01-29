const getAllPosts = async () => {
	const response = await fetch("http://localhost:4000/api/posts", {
		method: "POST",
		headers: { "Content-Type": "application-json" },
		body: {},
	});
	return response.json();
};

export default getAllPosts;

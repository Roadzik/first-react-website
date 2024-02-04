const getAllPosts = async (id: string) => {
	const response = await fetch("http://localhost:4000/api/posts", {
		method: "POST",
		mode: "cors",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({ id }),
	});
	return response.json();
};

export default getAllPosts;

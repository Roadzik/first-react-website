const getPost = async (id: string) => {
	const response = await fetch(`${process.env.REACT_APP_BACKEND}/api/getPost`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({ id: id }),
	});
	return response.json();
};

export default getPost;

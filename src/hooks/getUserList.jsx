const getUserList = async (id) => {
	const response = await fetch("http://localhost:4000/api/userList", {
		method: "POST",
		mode: "cors",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({ id }),
	});
	return response.json();
};

export default getUserList;

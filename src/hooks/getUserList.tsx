const getUserList = async (id: string) => {
	const response = await fetch(`${process.env.REACT_APP_BACKEND}/api/userList`, {
		method: "POST",
		mode: "cors",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({ id }),
	});
	return response.json();
};

export default getUserList;

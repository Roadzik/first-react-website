const getRecipentsData = async (data: string[]) => {
	const response = await fetch(
		`${process.env.REACT_APP_BACKEND}/api/getRecipentsData`,
		{
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${window.localStorage.getItem("accessToken")}`,
			},
			body: JSON.stringify({ data }),
		}
	);
	return response.json();
};

export default getRecipentsData;

const handleUserInput = (username, password) => {
	if (
		username === "" ||
		username == null ||
		password === "" ||
		password == null
	)
		return 0;

	return 1;
};

export default handleUserInput;

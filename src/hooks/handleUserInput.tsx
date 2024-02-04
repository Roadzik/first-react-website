const handleUserInput = (username: string, password: string) => {
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

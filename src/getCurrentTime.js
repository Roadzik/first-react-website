const getCurrentTime = () => {
	const currentDate = new Date();
	// Extract hours, minutes, and seconds
	const hours = currentDate.getHours();
	const minutes = currentDate.getMinutes();
	const seconds = currentDate.getSeconds();

	// Format the time
	const formattedTime = `${hours}:${minutes}:${seconds}`;
	return formattedTime;
};

export default getCurrentTime;

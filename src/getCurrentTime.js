const getCurrentTime = () => {
	const currentDate = new Date();
	// Extract hours, minutes, and seconds
	const year = currentDate.getFullYear();
	const month = currentDate.getMonth() + 1;
	const day = currentDate.getDate();
	const hours = currentDate.getHours();
	const minutes = currentDate.getMinutes();
	const seconds = currentDate.getSeconds();

	// Format the time
	const formattedTime = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
	return formattedTime;
};

export default getCurrentTime;

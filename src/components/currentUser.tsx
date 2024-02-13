import { useEffect, useState } from "react";
import me from "../hooks/me";
interface user {
	id: number;
	username: string;
	displayName: string;
	isAdmin: number;
	profilePicture: string;
	profileId: string;
	description: string;
}
const currentUser = () => {
	const [user, setUser] = useState<user>({
		id: 0,
		username: "",
		displayName: "",
		isAdmin: 0,
		profilePicture: "",
		description: "",
		profileId: "",
	});
};

export default me;

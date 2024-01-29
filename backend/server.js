const express = require("express");
const cors = require("cors");
const app = express();
const mysql = require("mysql");
require("dotenv").config();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const crypto = require("crypto");

app.use(express.json());
app.use(cors());

const DB_CONNECTION = mysql.createConnection({
	host: "127.0.0.1",
	user: process.env.DB_USERNAME,
	password: process.env.DB_PASSWORD,
	database: process.env.DB_NAME,
});

DB_CONNECTION.connect((err) => {
	if (err) throw err;
	console.log("Connected!");
});

const validateData = (username, password) => {
	if (typeof username !== "string" || typeof password !== "string") {
		return 1;
	}
	return 0;
};

function authenticateToken(req, res, next) {
	const authHeader = req.headers["authorization"];
	const token = authHeader && authHeader.split(" ")[1];
	if (token == null) return res.status(401).json({ message: "auth error" });

	jwt.verify(token, process.env.ACCESS_TOKEN, (err, userData) => {
		if (err) return res.sendStatus(403);
		req.userData = userData;
		next();
	});
}

app.post("/api/postCreation", authenticateToken, (req, res) => {
	const TEXT = req.body.text;
	if (typeof TEXT !== "string") {
		return res.status(401).json({ message: "Invalid parameters!" }).end();
	}
	DB_CONNECTION.query(
		"INSERT INTO posts(text, userID) VALUES (?,?)",
		[TEXT, req.userData.id],
		(err, result) => {
			if (err) throw err;
			return res.status(201).json("Post created").end();
		}
	);
});

app.post("/api/getProfilePicture", authenticateToken, (req, res) => {
	res.json(req.userData.profilePicture);
});

app.post("/api/login", async (req, res) => {
	const username = req.body.username;
	const password = req.body.password;
	if (validateData(username, password))
		return res.status(401).json({ message: "Invalid parameters!" }).end();
	DB_CONNECTION.query(
		"SELECT * FROM users WHERE username = ?",
		username,
		async (err, result) => {
			if (err) throw err;
			if (result.length !== 1) {
				return res
					.status(401)
					.json({ message: "Please input correct credentials" })
					.end();
			}
			if (await bcrypt.compare(password, result[0].password)) {
				delete result[0].password;
				let userData = JSON.stringify(result[0]);
				const accessToken = jwt.sign(userData, process.env.ACCESS_TOKEN);
				return res
					.status(200)
					.json({
						accessToken: accessToken,
						authenticated: 1,
						username: result[0].username,
					})
					.end();
			} else {
				return res
					.status(401)
					.json({ message: "Please input correct credentials" })
					.end();
			}
		}
	);
});

app.post("/api/register", async (req, res) => {
	const username = req.body.username;
	const password = req.body.password;
	if (validateData(username, password))
		return res.status(401).json({ message: "Invalid parameters!" }).end();

	const hashedPassword = await bcrypt.hash(password, 10);
	DB_CONNECTION.query(
		"SELECT * FROM users WHERE username = ?",
		username,
		(err, result) => {
			if (result.length > 0) {
				return res
					.status(409)
					.json({ message: "User with this username already exists" })
					.end();
			} else {
				DB_CONNECTION.query(
					"INSERT INTO users(username,displayName,password,profileId) VALUES(?,?,?,?)",
					[
						username,
						username,
						hashedPassword,
						crypto.randomBytes(16).toString("hex"),
					],
					(err) => {
						if (err) throw err;
						return res
							.status(200)
							.json({ message: "User Created", created: true })
							.end();
					}
				);
			}
		}
	);
});

app.post("/api/posts", (req, res) => {
	DB_CONNECTION.query(
		"SELECT p.id, p.text, p.creationTime, u.profilePicture, u.displayName FROM posts p INNER JOIN users  u ON p.userID = u.id ORDER BY id DESC",
		(err, result) => {
			if (err) throw err;
			res.status(200).json(result).end();
		}
	);
});

app.post("/api/postsByUser", authenticateToken, (req, res) => {
	DB_CONNECTION.query(
		"SELECT p.creationTime FROM posts p INNER JOIN users u ON p.userID = u.id WHERE u.id = ? ORDER BY p.id DESC LIMIT 1",
		req.userData.id,
		(err, result) => {
			if (result.length === 0) return res.status(200).json(0).end();
			if (err) throw err;
			res.status(200).json(result[0].creationTime).end();
		}
	);
});

app.listen(process.env.PORT);

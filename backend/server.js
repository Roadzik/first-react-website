const express = require("express");
const cors = require("cors");
const app = express();
const mysql = require("mysql");
require("dotenv").config();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

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

app.post("/api/postCreation", (req, res) => {
	console.log("Connected to React");
	res.redirect("/");
});

app.post("/api/login", async (req, res) => {
	DB_CONNECTION.query(
		`SELECT * FROM users WHERE username = '${req.body.username}'`,
		async (err, result) => {
			if (err) throw err;
			if (result.length !== 1) res.status(401).end();
			if (await bcrypt_compare(req.body.password, result[0]["password"]))
				return res.json(result[0]).status(200).end();
		}
	);
});

app.post("/api/register", async (req, res) => {
	let username = req.body.username;
	let password = req.body.password;

	if (typeof username != "string" || typeof password != "string") {
		return res.json({ message: "Invalid parameters!" }).status(401).end();
	}

	const salt = await bcrypt.genSalt(10);
	const hashedPassword = await bcrypt.hash(req.body.password, salt);

	DB_CONNECTION.query(
		"SELECT * FROM users WHERE username = ?",
		username,
		(err, result) => {
			if (result.length > 0)
				return res
					.status(409)
					.json({ message: "User with this username already exists" })
					.end();
		}
	);

	DB_CONNECTION.query(
		"INSERT INTO users(username,displayName,password) VALUES(?,?,?)",
		[username, username, hashedPassword],
		(err) => {
			if (err) throw err;
			return res.status(200);
		}
	);
});

app.listen(process.env.PORT);

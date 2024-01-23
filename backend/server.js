const express = require('express')
const app = express()
const mysql = require('mysql');
require('dotenv').config()
const cors = require('cors')

app.use(express.json());
app.use(cors());

const DB_CONNECTION = mysql.createConnection({
  host: "127.0.0.1",
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

app.post("/api/postCreation", (req, res) => {
  console.log("Connected to React");
  res.redirect("/");
});

app.post('/api/login', (req, res) =>{
  DB_CONNECTION.query(`SELECT id, username, displayName FROM users WHERE username = '${req.body.username}'`, (err, result) =>{
    if (err) throw err;
    res.json(result)
  })
})

DB_CONNECTION.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});

app.listen(process.env.PORT)

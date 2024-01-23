const express = require('express')
const app = express()
const mysql = require('mysql');
require('dotenv').config()

const DB_CONNECTION = mysql.createConnection({
  host: "127.0.0.1",
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

DB_CONNECTION.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
  DB_CONNECTION.query('SELECT * FROM users', (err, result) =>{
    if (err) throw err;
    console.log(result[0])
  })
});

app.listen(process.env.PORT)

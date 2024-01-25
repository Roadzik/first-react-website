const express = require('express')
const cors = require('cors')
const app = express()
const mysql = require('mysql')
require('dotenv').config()
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

app.use(express.json())
app.use(cors())

const DB_CONNECTION = mysql.createConnection({
  host: '127.0.0.1',
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
})

DB_CONNECTION.connect((err) => {
  if (err) throw err
  console.log('Connected!')
})

app.post('/api/postCreation', (req, res) => {
  console.log('Connected to React')
  res.redirect('/')
})

app.post('/api/login', async (req, res) => {
  const username = req.body.username
  const password = req.body.password

  if (typeof username !== 'string' || typeof password !== 'string') {
    return res.status(401).json({ message: 'Invalid parameters!' }).end()
  }
  DB_CONNECTION.query(
    'SELECT * FROM users WHERE username = ?',
    username,
    async (err, result) => {
		  if (err) throw err
      if (result.length !== 1) { return res.status(401).json('Please input correct credentials').end() }
      if (await bcrypt.compare(password, result[0].password)) {
		    delete result[0].password
        return res.status(200).json(result[0]).end()
      } else {
		    return res.status(401).json('Please input correct credentials').end()
      }
    }
  )
})

app.post('/api/register', async (req, res) => {
  const username = req.body.username
  const password = req.body.password
  if (typeof username !== 'string' || typeof password !== 'string') {
    return res.json({ message: 'Invalid parameters!' }).status(401).end()
  }

  const hashedPassword = await bcrypt.hash(password, 10)

  DB_CONNECTION.query(
    'SELECT * FROM users WHERE username = ?',
    username,
    (err, result) => {
      if (result.length > 0) {
        return res
          .status(409)
          .json({ message: 'User with this username already exists' })
          .end()
      } else {
        DB_CONNECTION.query(
          'INSERT INTO users(username,displayName,password) VALUES(?,?,?)',
          [username, username, hashedPassword],
          (err) => {
            if (err) throw err
            return res
              .status(200)
              .json({ message: 'User Created', created: 1 })
              .end()
          }
        )
      }
    }
  )
})

app.listen(process.env.PORT)

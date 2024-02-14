const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const mongodb = require('mongodb');

const app = express();
const MongoClient = mongodb.MongoClient;
const mongoURL = 'mongodb://localhost:27017';
const dbName = 'auth_demo';
let db;

MongoClient.connect(mongoURL, { useNewUrlParser: true }, (err, client) => {
  if (err) return console.error(err);
  console.log('Connected to database successfully');
  db = client.db(dbName);
});

app.use(bodyParser.json());

app.post('/signup', async (req, res) => {
  const { username, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  db.collection('users').insertOne({ username, password: hashedPassword }, (err, result) => {
    if (err) return res.status(500).send('Error');
    res.status(200).send('User created successfully');
  });
});

app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const user = await db.collection('users').findOne({ username });
  if (!user) return res.status(404).send('User not found');

  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword) return res.status(401).send('Invalid password');

  res.status(200).send('Login successful');
});

const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

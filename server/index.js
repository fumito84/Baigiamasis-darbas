/* eslint-disable object-curly-newline */
const express = require('express');
const { MongoClient } = require('mongodb');
const cors = require('cors');

require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors());

const port = process.env.PORT || 8080;
const URI = process.env.DB_CONNECTION_STRING;
const dbName = process.env.DB_NAME;

const client = new MongoClient(URI);

app.get('/clients', async (req, res) => {
  try {
    const con = await client.connect();
    const data = await con.db(dbName).collection('Clients').find().toArray();
    await con.close();
    res.send(data);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.post('/clients', async (req, res) => {
  try {
    const { name, surname, date, password } = req.body;
    const con = await client.connect();
    const data = await con
      .db(dbName)
      .collection('Clients')
      .insertOne({ name, surname, date, password });
    await con.close();
    res.send(data);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.put('/clients/:id', async (req, res) => {
  try {
    const { name, surname, date, email, password } = req.body;
    const { id } = req.params;
    const con = await client.connect();
    const filter = { _id: new ObjectId(id) };
    const update = { $set: { name, surname, date, email, password } };
    const data = await con
      .db(dbName)
      .collection('Clients')
      .updateOne(filter, update);
    await con.close();
    res.send(data);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const con = await client.connect();
    const user = await con
      .db(dbName)
      .collection('Clients')
      .findOne({ email, password });
    await con.close();

    if (user) {
      res.send(user);
    } else {
      res.status(401).send('User email or password is incorrect.');
    }
  } catch (error) {
    res.status(500).send(error);
  }
});

app.listen(port, () => {
  console.log(`Server is running on the ${port} port`);
});

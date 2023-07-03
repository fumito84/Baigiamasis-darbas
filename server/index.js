const express = require('express');
const { MongoClient } = require('mongodb');
const cors = require('cors');

require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors());

// const port = process.env.PORT || 8080;
// const URI = process.env.DB_CONNECTION_STRING;
// const dbName = process.env.DB_NAME;
// console.log(port);

const client = new MongoClient(URI);

// app.get('/', async (req, res) => {
//   try {
//     const con = await client.connect();
//     const data = await con.db(dbName).collection('Movies').find().toArray();
//     await con.close();
//     res.send(data);
//   } catch (error) {
//     res.status(500).send(error);
//   }
// });

// app.post('/', async (req, res) => {
//   try {
//     const { title, rating, genre } = req.body;
//     const con = await client.connect();
//     const data = await con
//       .db(dbName)
//       // .collection('Movies')
//       .insertOne({ title, rating, genre });
//     await con.close();
//     res.send(data);
//   } catch (error) {
//     res.status(500).send(error);
//   }
// });

app.listen(port, () => {
  console.log(`Server is running on the ${port} port`);
});

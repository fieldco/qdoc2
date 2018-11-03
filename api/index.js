require ('dotenv').config();
const MongoClient = require('mongodb').MongoClient;
const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const start = async () => {

  const client = await MongoClient.connect(
    `mongodb://${process.env.MONGO_HOST}:${process.env.MONGO_PORT}/${process.env.MONGO_DB}`,
  );
  const db = client.db(process.env.MONGO_DB);

  const Items = db.collection('items');

  app.use(bodyParser.urlencoded({ extended: true }));

  app.get('/', async (req, res) => {
    const items = await Items.find({}).toArray();
    res.json({name: 'hi there', items});
  });

  app.post('/delete', async (req, res) => {
    await Items.remove({});
    res.json({});
  });  
  
  app.post('/add', async (req, res) => {
    await Items.insertOne(req.body);
    res.json({});
  });

  app.listen(process.env.PORT, () => {
    console.log(`listening on port ${process.env.PORT} (Mongo: host ${process.env.MONGO_HOST} port ${process.env.MONGO_PORT})`);
  });
};

start();
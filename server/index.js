const keys = require('./keys');

// Express App Setup
const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');

mongoose.connect('mongodb://mongodb:27018');

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(session({ secret: 'CHANGE THIS 12332', cookie: { maxAge: 60000 }, resave: false, saveUninitialized: false }));
// Postgres Client Setup
const { Pool } = require('pg');
const pgClient = new Pool({
  user: keys.pgUser,
  host: keys.pgHost,
  database: keys.pgDatabase,
  password: keys.pgPassword,
  port: keys.pgPort
});
pgClient.on('error', () => console.log('Lost PG connection'));

pgClient
  .query(`CREATE TABLE IF NOT EXISTS users (
    user_id serial PRIMARY KEY,
    username VARCHAR (50) UNIQUE NOT NULL,
    password VARCHAR (50) NOT NULL,
    email VARCHAR (355) UNIQUE NOT NULL,
    created_on TIMESTAMP NOT NULL,
    last_login TIMESTAMP
  )`)
  .catch(err => console.log(err));
/*pgClient
  .query(`INSERT INTO users (username, password, email, created_on)
          VALUES ('pyromaticx', 'abc123', 'krgimports@gmail.com', '20190410')`).finally(result => {console.log("DB", result)})
  .catch(err => {console.log(err)});*/


// Redis Client Setup
const redis = require('redis');
const redisClient = redis.createClient({
  host: keys.redisHost,
  port: keys.redisPort,
  retry_strategy: () => 1000
});
const redisPublisher = redisClient.duplicate();

// Express route handlers

app.post('/login', (req, res) => {
  console.log(req.body);
});



app.listen(5000, err => {
  console.log('Listening');
});

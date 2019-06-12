const keys = require('./keys');

// Express App Setup
const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const User = require('./schema/user');
const passport = require('passport');
require('./passport');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const geoip = require('geoip-lite');
var cookieParser = require('cookie-parser');

mongoose.connect(`mongodb://${process.env.MONGOUSER}:${process.env.MONGOPASS}@${process.env.MONGODBADDR}:27017`);

const app = express();
app.use(cors());
app.use(cookieParser("we HavE special kookiez!!!123"));
app.use(bodyParser.json());
/*app.use((req, res, next) => {
  console.log("COOKIES::", req.cookies);
  next();
});*/
//app.use(session({ secret: 'CHANGE THIS 12332', cookie: { maxAge: 60000 }, resave: false, saveUninitialized: false }));

//ROUTES
const auth = require('./routes/auth');
const profile = require('./routes/profile');

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
app.use('/auth', auth);
app.use('/profile', passport.authenticate('jwt', {session: false}), profile);

app.post('/register', (req, res) => {
  let clientSideIp = req.body.regIp;
  User.findOne({username: req.body.username}, (err, user) => {
    if(user) {
      res.send(JSON.stringify({errors: ["username"]}));
      return;
    } else {
      if(req.body.password !== req.body.password2) {
        res.send(JSON.stringify({errors: ["password", "password2"]}));
        return;
      }
      if(!req.body.email) {
        res.send(JSON.stringify({errors: ["email"]}));
        return;
      }
      let usr = new User();
      usr.username = req.body.username;
      usr.password = req.body.password;
      usr.email = req.body.email;
      usr.registered = Date.now();
      usr.emailVerficationDate = null;
      usr.registered = Date.now();
      usr.lastLogin = null;
      //usr.dob: {type: Date},
      //usr.gender: {type: String},
      usr.lookingFor = {
          men: false,
          women: false,
          transWomen: false,
          transMen: false,
          couple: false
      };
      usr.profile = {
          tagline: "",
          intro: "",
          followers: [],
          following: [],
          profileQuestions: [],
          langsSpoken: []
      };
      usr.location = {
          city: "",
          state: "",
          country: "",
          zipCode: "",
          lat: "",
          lon: "",
      };
      usr.wallet = {
          membershipLevel: 100,
          credits: 0,
          elite: false,
          gifts: [],
          referrals: [],
          transactions: []
      };
      usr.billing = {
          orders: [],
          savedPayments: [],
          paymentMethods: ["creditcard"],
          declines: 0,
          affilliateId: 'internal',
          coupons: []
      };

      usr.save((err, result) => {
        if(err) {
          console.log(err);
        }
        res.send(JSON.stringify({status: 200, message: "user created"}));
      });
    }
  })
});
app.get('/iplocation/:ip', (req, res) => {
  let ip = req.params.ip;
  ipRegex = /([0-9]{1,3}(\.[0-9]{1,3}){3}|[a-f0-9]{1,4}(:[a-f0-9]{1,4}){7})/g;
  if(ip.match(ipRegex) !== null) {
    res.status(200).json(geoip.lookup(ip));
  } else {
    res.status(400).json({
      error: 'invalid ip'
    });
  }
});
app.listen(5000, err => {
  console.log('Listening');
});

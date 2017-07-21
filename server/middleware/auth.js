const session = require('express-session');
const RedisStore = require('connect-redis')(session);
const redis = require('redis');
const url = require('url');

let client;
let rtg;

process.env.REDISTOGO_URL ? (rtg = url.parse(process.env.REDISTOGO_URL),
  client = redis.createClient(rtg.port, rtg.hostname),
  client.auth(rtg.auth.split(':')[1]))
  : client = redis.createClient(6379, 'localhost');

module.exports.verify = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/login');
};

module.exports.session = session({
  store: new RedisStore({
    client
  }),
  secret: 'more laughter, more love, more life',
  resave: false,
  saveUninitialized: false
});

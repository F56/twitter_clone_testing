const session = require("express-session");
const MongoStore = require('connect-mongo');

module.exports = (app) => {
  app.use(
    session({
      secret: process.env.SESSION_SECRET,
      resave: false,
      saveUninitialized: false,
      store: MongoStore.create({ mongoUrl: 'mongodb://localhost:27017/clone_twitter' })
    })
  );
};

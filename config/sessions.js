const session = require("express-session");
const MongoStore = require('connect-mongo');

module.exports = (app) => {
  app.use(
    session({
      secret: process.env.SESSION_SECRET,
      resave: false,
      saveUninitialized: false,
      store: MongoStore.create({ mongoUrl: `mongodb://${process.env.DB_HOST}/${process.env.DB_NAME}` })
    })
  );
};

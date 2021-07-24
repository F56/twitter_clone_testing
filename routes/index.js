const publicRoutes = require("./privateRoutes");
const privateRoutes = require("./publicRoutes");
const autenticationVerified = require("../middlewares/authenticate");
const moment = require("moment");
const { User } = require("../models");


module.exports = (app) => {
  app.use(async function userList(req, res, next) {
    if(req.user) {
      res.locals.userList = await User.find({ _id: { $nin: req.user.following }}).limit(3);
    }
    next();
  });


  app.use(function momentGlobal(req, res, next) {
    res.locals.moment = moment;
    next();
  });

  app.use(function makeUserAvailableInViews(req, res, next) {
    res.locals.user = req.user;

    next();
  });
  app.use(privateRoutes);
  app.use(publicRoutes);

  // app.use(autenticationVerified);
};

const publicRoutes = require("./privateRoutes");
const privateRoutes = require("./publicRoutes");
const autenticationVerified = require("../middlewares/authenticate");
const moment = require("moment");


module.exports = (app) => {
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

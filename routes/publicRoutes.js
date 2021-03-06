const express = require("express");
const publicRoutes = express.Router();
const passport = require("passport");
const pageControllers = require("../controllers/pageController");
const tweetsControllers = require("../controllers/tweetsController");
const userControllers = require("../controllers/userController");
const { User } = require("../models");

publicRoutes.get("/:id/following", async (req, res) => {
  const following = await User.findOne({ username: req.params.id}).populate('following');
  res.json(following);
});
publicRoutes.get("/signup", pageControllers.showSignUp);
publicRoutes.post("/signup", userControllers.store);
publicRoutes.get("/logout", userControllers.logout);
publicRoutes.get("/", pageControllers.showIndex);
publicRoutes.get("/login", pageControllers.showLogin);
publicRoutes.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/home",
    failureRedirect: "/login",
  })
);
publicRoutes.get("/:username", pageControllers.showHome);
publicRoutes.get("/eliminar/:_id", tweetsControllers.destroy);

module.exports = publicRoutes;

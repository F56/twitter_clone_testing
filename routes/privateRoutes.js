const express = require("express");
const privateRoutes = express.Router();
const pageControllers = require("../controllers/pageController");
const tweetsControllers = require("../controllers/tweetsController");
const userControllers = require("../controllers/userController");
const autenticationVerified = require("../middlewares/authenticate");

privateRoutes.use(autenticationVerified);

privateRoutes.get("/follow/:id", userControllers.follow);
privateRoutes.get("/home", pageControllers.showHome);
privateRoutes.post("/tweet", tweetsControllers.store);
privateRoutes.post("/update", userControllers.update);
privateRoutes.get("/like/:id", tweetsControllers.like);

module.exports = privateRoutes;

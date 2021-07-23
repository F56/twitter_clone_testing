const { User } = require("../models");
const { Tweet } = require("../models");
const moment = require("moment");
moment.locale("es");

async function showIndex(req, res) {
  if (req.user) {
    res.redirect("/home");
  } else {
    res.render("index");
  }
}

async function showLogin(req, res) {
  if (req.user) {
    res.redirect("/home");
  } else {
    res.render("login");
  }
}

async function showHome(req, res) {
  if (req.params.username === "home") {
    if (req.user) {
      const user = await User.findById(req.user.id);

      if (user) {
        const userFollowing = user.following.concat(req.user.id);
        const tweets = await Tweet.find()
          .where("user")
          .in(userFollowing)
          .sort({ createdAt: -1 })
          .populate("user");

        res.render("home", { tweetsData: tweets });
      } else {
        res.sendStatus(404);
      }
    } else {
      res.redirect("/login");
    }
  } else {
    const userData = await User.findOne({
      username: req.params.username,
    }).populate({ path: "tweets", options: { sort: { createdAt: -1 } } });
    if (userData) {
      res.render("userPage", { userData });
    } else {
      res.sendStatus(404);
    }
  }
}

async function showSignUp(req, res) {
  if (req.user) {
    res.redirect("/home");
  } else {
    res.render("signup");
  }
}

async function showUserPage(req, res) {
  const userPage = await User.findOne({ username: req.params.username });
  const tweets = await res.render("userPage", { userPage, tweets });
}

module.exports = {
  showHome,
  showLogin,
  showUserPage,
  showSignUp,
  showIndex,
};

const { Tweet, User } = require("../models");
const moment = require("moment");

async function index(req, res) {
  const tweets = await Tweet.find({});
  if (tweets) {
    res.json(tweets);
  } else {
    res.sendStatus(404);
  }
}

async function show(req, res) {
  const tweet = await Tweet.findById(req.params.id);
  if (tweet) {
    res.json(tweet);
  } else {
    res.sendStatus(404);
  }
}

async function store(req, res) {
  const tweet = new Tweet({
    content: req.body.content,
    user: req.user,
  });
  await tweet.save();
  req.user.tweets.push(tweet);
  await req.user.save();
  res.redirect("back");
}

async function destroy(req, res) {
  await Tweet.deleteOne({ _id: req.params._id });
  res.redirect("back");
}

async function like(req, res) {
  const tweet = await Tweet.findById(req.params.id);
  let likeExist = null;
  tweet.likes.forEach((like) => {
    if (like.toString() == req.user._id) {
      likeExist = true;
    } else {
      likeExist = false;
    }
  });
  if (likeExist) {
    tweet.likes.pull(req.user._id);
    await tweet.save();
    res.redirect("back");
  } else {
    tweet.likes.push(req.user._id);
    await tweet.save();
    res.redirect("back");
  }
}

module.exports = { store, destroy, like };

const { User, Tweet } = require("../models");
const passport = require("passport");
const formidable = require("formidable");
const path = require("path");

async function store(req, res) {
  const user = new User(req.body);
  await user.save((err, user) => {
    if (err) {
      console.log(err);
      res.redirect("back");
    } else {
      req.login(user, () => res.redirect("/home"));
    }
  });
}
async function update(req, res) {
  const form = formidable({
    multiples: false,
    uploadDir: "./public/img/avatar_img",
    keepExtensions: true,
  });
  form.parse(req, async (err, fields, files) => {
    const fileName = path.basename(files.avatar.path);
    await User.findByIdAndUpdate(req.user.id, {
      firstname: fields.firstname,
      lastname: fields.lastname,
      username: fields.username,
      email: fields.email,
      bio: fields.bio,
      avatar: fileName,
    });
    res.redirect(`/${fields.username}`);
  });
  
}

function login(req, res) {
  passport.authenticate("local", {
    successRedirect: "/home",
    failureRedirect: "/login",
    failureFlash: true,
  });
}

async function logout(req, res) {
  req.logout();
  res.redirect("/");
}

async function follow(req, res) {
  if (req.user.id === req.params.id) {
    return res.redirect("back");
  }
  const userWhoFollow = await User.findById(req.user.id).populate("following");
  const userWhoHasFollower = await User.findById(req.params.id);

  const followExist = userWhoFollow.following.some(follow => follow.id === req.params.id);

  if (followExist) {
    userWhoFollow.following.pull(userWhoHasFollower.id);
    userWhoHasFollower.followers.pull(req.user.id);
  } else {
    userWhoFollow.following.push(userWhoHasFollower.id);
    userWhoHasFollower.followers.push(req.user.id);
  }
  await userWhoFollow.save();
  await userWhoHasFollower.save();
  res.redirect("back");
}

module.exports = {
  store,
  login,
  logout,
  update,
  follow,
};

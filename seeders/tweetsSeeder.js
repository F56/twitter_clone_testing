const faker = require("faker/locale/en");
const { Tweet, User } = require("../models");

module.exports = async () => {
  const userList = await User.find();
  const tweets = [];

  for (let i = 0; i < 15; i++) {
    const user = userList[Math.floor(Math.random() * userList.length)];
    const tweet = new Tweet({
      user: user,
      content: faker.lorem.words(15),
      likes: userList[Math.floor(Math.random() * userList.length)],
      createdAt: Date.now(),
    });
    await User.findByIdAndUpdate(user.id, { $push: { tweets: tweet.id } });
    tweets.push(tweet);
  }

  await Tweet.collection.insertMany(tweets);
  console.log("[Database] Se corrió el seeder de User.");
};

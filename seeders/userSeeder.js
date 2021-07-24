const faker = require("faker/locale/en");
const { User } = require("../models");
const bcrypt = require("bcryptjs");

module.exports = async () => {
  const userList = [];

  const password = await bcrypt.hash("hola", 10);

  for (let i = 0; i < 20; i++) {
    const user = new User({
      firstname: faker.name.firstName(),
      lastname: faker.name.lastName(),
      email: faker.internet.email(),
      username: faker.internet.userName(),
      password: password,
      bio: faker.lorem.lines(2),
      avatar: faker.internet.avatar(),
      createdAt: Date.now(),
    });
    userList.push(user);
  }

  for (let i = 0; i < userList.length; i++) {
    let user1 = userList[Math.floor(Math.random() * userList.length)];
    let user2 = userList[Math.floor(Math.random() * userList.length)];
    user1.followers.push(user2);
    user2.following.push(user1);
  }

  require("mongoose").connection.dropCollection("users");
  require("mongoose").connection.dropCollection("tweets");
  await User.collection.insertMany(userList);
  console.log("[Database] Se corrió el seeder de User.");

  await require("./tweetsSeeder")();
};

const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/clone_twitter", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false
});

mongoose.connection
  .once("open", () =>
    console.log("¡Conexión con la base de datos establecida!")
  )
  .on("error", (error) => console.log(error));

module.exports = mongoose;

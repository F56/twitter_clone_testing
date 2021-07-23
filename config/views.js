const express = require("express");

module.exports = (app) => {
  app.use(express.static("public"));
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());
  app.set("view engine", "ejs");
};

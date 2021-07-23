require("dotenv").config();

const dbInitialSetup = require("./dbInitialSetup");
const express = require("express");
const app = express();
const port = process.env.APP_PORT;
const routes = require("./routes");
const mongoose = require("./config/connection");
const views = require("./config/views");
const sessions = require("./config/sessions");
const passport = require("./config/passport");

sessions(app);
passport(app);
views(app);
routes(app);

//dbInitialSetup();

app.listen(port);

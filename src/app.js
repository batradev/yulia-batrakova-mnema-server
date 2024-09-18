require("dotenv").config();
require('./config/passport');
const express = require("express");
const cors = require("cors");
const path = require('path');
const session = require('express-session');
const passport = require('passport');
const apiRoutes = require('./routes/api');
const authRoutes = require('./routes/auth');

const app = express();

app.use('/server_assets', express.static(path.join(__dirname, '../server_assets')));

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(express.json());

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: true, // Note: This should be 'true' only if you're serving over HTTPS
      httpOnly: true,
      sameSite: 'none'
    }
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.use("/api", apiRoutes);
app.use("/", authRoutes);

app.use((req, res, next) => {
  next();
});

app.get("/test-session", (req, res) => {
  req.session.test = "Session is working";
  res.send("Session test route");
});

module.exports = app;

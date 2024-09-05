const express = require("express");
const cors = require("cors");
require("dotenv").config();
const path = require('path');

const app = express();

app.use('/server_assets', express.static(path.join(__dirname, 'server_assets')));

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(express.json());

module.exports = app;

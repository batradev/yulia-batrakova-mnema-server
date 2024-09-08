const fs = require("fs");
const https = require("https");
require("dotenv").config();
const app = require("./app");
const session = require("express-session");
const passport = require("passport");

require("./config/passport");

const PORT = process.env.PORT || 8080;
const httpsOptions = {
  key: fs.readFileSync("key.pem"),
  cert: fs.readFileSync("cert.pem"),
};

console.log("Initializing session middleware");

console.log("process.env.NODE_ENV: ", process.env.NODE_ENV);
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: true,
      httpOnly: true,
      sameSite: "none",
    },
  })
);
console.log("The session middleware initialized");
console.log("Initializing passport");

app.use(passport.initialize());
app.use(passport.session());
console.log("All middleware initialized");

const apiRoutes = require("./routes/api");
const authRoutes = require("./routes/auth");

app.use("/api", apiRoutes);
app.use("/", authRoutes);

app.use((req, res, next) => {
  console.log("Session:", req.session);
  console.log("User:", req.user);
  next();
});

app.get("/test-session", (req, res) => {
  req.session.test = "Session is working";
  res.send("Session test route");
});

// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });

https.createServer(httpsOptions, app).listen(PORT, () => {
  console.log(`Server is running on https://localhost:${PORT}`);
});

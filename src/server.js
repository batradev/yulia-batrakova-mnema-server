const app = require("./app");
const session = require("express-session");
const passport = require("passport");

require("./config/passport");

const PORT = process.env.PORT || 8080;

console.log("Initializing session middleware");
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    // cookie: { secure: process.env.NODE_ENV === 'production' }
    cookie: {
      secure: true,
      httpOnly: true,
      sameSite: 'none',
    }
  })
);

console.log("Initializing passport");
app.use(passport.initialize());
app.use(passport.session());
console.log("All middleware initialized");

const apiRoutes = require('./routes/api');
const authRoutes = require('./routes/auth');
app.use('/api', apiRoutes);
app.use('/', authRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

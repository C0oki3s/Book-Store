const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const pool = require("./db/db");
const session = require("express-session");
const pgSession = require("connect-pg-simple")(session);
const methodOverride = require("method-override");
require("dotenv").config();
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use("/images", express.static("images"));

app.use((req, res, next) => {
  res.setHeader("X-Frame-Options", "SAMEORIGIN");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, DELETE, OPTIONS");
  next();
});

const signup = require("./routes/signup");
app.use("/auth", signup);

var expiryDate = new Date(Date.now() + 60 * 60 * 1000);
app.use(
  session({
    store: new pgSession({
      pool: pool, // Connection pool
      tableName: "session",
    }),
    name: "session-id",
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: expiryDate,
      sameSite: "lax",
      secure: false,
      httpOnly: true,
    },
  })
);

const home = require("./routes/home");
app.use("/", home);

// app.use(
//   methodOverride((req, res) => {
//     if (req.body && typeof req.body == "object" && "_method" in req.body) {
//       var method = req.body._method;
//       delete req.body._method;
//       return method;
//     }
//   })
// );

const auth = require("./middleware/Auth");

const admin = require("./routes/admin");
app.use("/admin", auth.auth, admin);

const users = require("./routes/users");
app.use("/users", auth.auth, users);

const login = require("./routes/login");
app.use("/auth", login);

const orders = require("./routes/orders");
app.use("/orders", auth.auth, orders);

app.use(function (req, res, next) {
  res.status(404).render("404");
});

app.listen(5000);

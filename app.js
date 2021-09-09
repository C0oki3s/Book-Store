const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const pool = require("./db/db");
const session = require("express-session");
const pgSession = require("connect-pg-simple")(session);
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
    // cookie: { maxAge: 30 * 24 * 60 * 1000, sameSite: true, secure: true },
  })
);

const home = require("./routes/home");
app.use("/", home);

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

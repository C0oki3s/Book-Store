const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const pool = require("./db/db");
const session = require("express-session");
const pgSession = require("connect-pg-simple")(session);
const methodOverride = require("method-override");
const cors = require("cors");
require("dotenv").config();
const app = express();

app.options(
  "*",
  cors({
    optionsSuccessStatus: "204",
    credentials: true,
    origin: "http://localhost:3000",
    allowedHeaders: [
      "Content-Type",
      "Access-Control-Allow-Origin",
      "Access-Control-Allow-Credentials",
    ],
  })
);

app.use(
  "*",
  cors({
    origin: "http://localhost:3000",
    allowedHeaders: ["Content-Type", "X-Requested-With"],
    credentials: true,
  })
);

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use("/images", express.static("images"));

const signup = require("./routes/signup");
app.use("/auth", signup);

var expiryDate = 38000000;
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
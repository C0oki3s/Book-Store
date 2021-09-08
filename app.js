const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const pool = require("./db/db");
const session = require("express-session");
const pgSession = require("connect-pg-simple")(session);
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use("/images", express.static("images"));

const signup = require("./routes/signup");
app.use("/auth", signup);

app.use(
  session({
    store: new pgSession({
      pool: pool, // Connection pool
      tableName: "session",
    }),
    name: "session-id",
    secret: "rohith",
    resave: false,
    saveUninitialized: false,
    // cookie: { maxAge: 30 * 24 * 60 * 1000, sameSite: true, secure: true },
  })
);

const auth = require("./middleware/Auth");

const admin = require("./routes/admin");
app.use("/admin", auth, admin);

const users = require("./routes/users");
app.use("/users", auth, users);

const login = require("./routes/login");
app.use("/auth", login);

const home = require("./routes/home");
app.use("/", auth, home);

const orders = require("./routes/orders");
app.use("/orders", orders);

app.listen(5000);

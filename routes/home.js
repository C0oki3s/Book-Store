const express = require("express");
const pool = require("../db/db");
const route = express.Router();

route.get("/", (req, res) => {
  pool.query(`SELECT * FROM books`, (err, results) => {
    if (err) throw err;
    res.render("home", { books: results.rows });
  });
});

route.post("/addcart", (req, res) => {
  let { name, price, id, author, description } = req.body;
  const user_id = req.session.userID;
  let errors = [];
  const re = /^[1-9]\d{0,7}(?:\.\ d{1,4})?$/;
  if (!re.test(price)) {
    errors.push({ message: "Error please try again" });
  } else {
    console.log("pass");
  }
  res.redirect("/");
});

module.exports = route;

const express = require("express");
const bcrypt = require("bcrypt");
const route = express.Router();
const pool = require("../db/db");

route.get("/signup", (req, res) => {
  res.render("signup");
});

route.post("/signup", async (req, res) => {
  let { username, email, password, password1 } = req.body;
  let errors = [];
  const re =
    /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
  if (!username || !email || !password || !password1) {
    errors.push({ message: "Enter All Fields" });
  }
  if (!re.test(email)) {
    errors.push({ message: "Email format is Invalid!" });
  }
  if (password != password1) {
    errors.push({ message: "Password1 must be same as Password2" });
  }
  if (errors.length > 0) {
    res.render("signup", { errors: errors });
  } else {
    let hashpassword = await bcrypt.hash(password, 20);
    await pool.query(
      `SELECT * FROM user_auth WHERE email = $1`,
      [email],
      (err, results) => {
        if (err) {
          throw err;
        } else {
          if (results.rows.length > 0) {
            errors.push({ message: "Email already Exists!" });
            res.render("signup", { errors: errors });
          } else {
            pool.query(
              `INSERT INTO user_auth(username,email,password) VALUES( $1, $2, $3) RETURNING id,email,password`,
              [username, email, hashpassword],
              (err, results) => {
                if (err) throw err;
                res.redirect("/auth/signup");
              }
            );
          }
        }
      }
    );
  }
});

module.exports = route;

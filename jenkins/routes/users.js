const express = require("express");
const pool = require("../db/db");
const route = express.Router();

route.get("/setting", async (req, res) => {
  let id = req.session.userID;
  await pool.query(
    `SELECT * FROM user_auth WHERE id=$1`,
    [id],
    (err, results) => {
      if (err) throw err;
      if (results.rows.length > 0) {
        let username = results.rows[0].username;
        let email = results.rows[0].email;
        res.render("users_settings", { username: username, email: email });
      } else {
        req.session.destroy();
        res.redirect("/auth/login");
      }
    }
  );
});

route.post("/update/profile", async (req, res) => {
  let id = req.session.userID;
  const { username, email } = req.body;
  await pool.query(
    `UPDATE user_auth SET username = $1, email = $2 WHERE id=$3`,
    [username, email, id],
    (err, results) => {
      if (err) throw err;
      res.render("users_settings", { results: results.command + "D" });
    }
  );
});

module.exports = route;

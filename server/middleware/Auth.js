const pool = require("../db/db");
const mongoose = require("mongoose");
const Database = require("../db/email");
let middlewareObject = {};

middlewareObject.auth = async (req, res, next) => {
  await pool.query(
    `SELECT * FROM session WHERE sid = $1`,
    [req.sessionID],
    (err, results) => {
      if (err) throw err;
      if (results.rows.length > 0) {
        return next();
      } else {
        return res.redirect("/auth/login");
      }
    }
  );
};

middlewareObject.isverified = async (req, res, next) => {
  const email = await Database.find({ email: req.body.email });
  if (email.isverified) {
    next();
  } else {
    return res.send("Email not verified");
  }
};

module.exports = middlewareObject;

const pool = require("../db/db");
const auth = (req, res, next) => {
  pool.query(
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

module.exports = auth;

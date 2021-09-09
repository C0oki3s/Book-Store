const express = require("express");
const pool = require("../db/db");
const route = express.Router();

route.post("/addcart", async (req, res) => {
  const { id } = req.body;
  const user_id = req.session.userID;
  const quantity = 1;
  let errors = [];
  if (!id) {
    errors.push({ message: "Error Please Try Again" });
  }
  if (errors.length > 0) {
    res.render("home", { errors: errors });
  } else {
    await pool.query(`SELECT * FROM books WHERE id=$1`, [id], (err, result) => {
      if (err) {
        throw err;
      } else {
        pool.query(
          `SELECT book_id, quantity FROM orders WHERE user_id = $1`,
          [user_id],
          (err, results) => {
            if (err) throw err;
            if (results.rows.length > 0) {
              if (results.rows[0].book_id == id) {
                let new_quantity = results.rows[0].quantity + quantity;
                let new_price = result.rows[0].price * new_quantity;
                pool.query(
                  `UPDATE orders SET quantity =$1, price = $2 WHERE user_id=$3 RETURNING id`,
                  [new_quantity, new_price, user_id],
                  (err, results) => {
                    if (err) throw err;
                    res.redirect("/orders");
                  }
                );
              } else {
                pool.query(
                  `INSERT INTO orders(user_id,book_id,quantity,price,book_image,book_name) VALUES($1,$2,$3,$4,$5,$6) RETURNING id`,
                  [
                    user_id,
                    id,
                    quantity,
                    result.rows[0].price,
                    result.rows[0].book_image,
                    result.rows[0].name,
                  ],
                  (err, results) => {
                    if (err) throw err;
                    res.redirect("/orders");
                  }
                );
              }
            } else {
              res.status(400).redirect("/");
            }
          }
        );
      }
    });
  }
});

route.get("/", (req, res) => {
  const id = req.session.userID;
  pool.query(
    `SELECT * FROM orders WHERE user_id = $1`,
    [id],
    (err, results) => {
      if (err) throw err;
      if (results.rows.length > 0) {
        res.render("orders", { books: results.rows });
      }
    }
  );
});

route.post("/update/:orderid", async (req, res) => {
  const orderid = req.params.orderid;
  const { quantity } = req.body;
  let errors = [];
  let re = /^\d+$/;
  const max_limit = 10;
  await pool.query(
    `SELECT book_id FROM orders WHERE id=$1`,
    [orderid],
    (err, results) => {
      if (err) throw err;
      pool.query(
        `SELECT price FROM books WHERE id=$1`,
        [results.rows[0].book_id],
        (err, result) => {
          if (quantity > max_limit) {
            errors.push({
              message:
                "You can only order quantity of 10 books at a time or contact admin!!",
            });
          }
          if (!re.test(quantity)) {
            errors.push({ message: "Qunatity Must be Integer" });
          }
          if (errors.length > 0) {
            res.render("orders", { errors: errors });
          } else {
            var update_price = quantity * result.rows[0].price;
            pool.query(
              `UPDATE orders SET quantity=$1,price=$2 WHERE id=$3`,
              [quantity, update_price, orderid],
              (err, results) => {
                if (err) throw err;
                res.redirect("/orders");
              }
            );
          }
        }
      );
    }
  );
});

route.post("/delete/:orderid", (req, res) => {
  const orderid = req.params.orderid;
  pool.query(`DELETE FROM orders WHERE id = $1`, [orderid], (err, results) => {
    if (err) throw err;
    res.redirect("/");
  });
});

module.exports = route;

const express = require("express");
const pool = require("../db/db");
const auth = require("../middleware/Auth");
const multer = require("multer");
const crypto = require("crypto");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./images");
  },
  filename: function (req, file, cb) {
    cb(null, crypto.randomBytes(10).toString("hex") + file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  // reject a file
  if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5,
  },
  fileFilter: fileFilter,
});

const route = express.Router();

route.get("/getusers", auth, (req, res) => {
  let errors = [];
  pool.query(`SELECT * FROM user_auth`, (err, results) => {
    if (err) throw err;
    if (results.rows.length > 0) {
      res.render("getusers", { user: results.rows });
    } else {
      errors.push({ message: "UR not auth" });
      res.render("admin", { errors: errors });
    }
  });
});

route.get("/upload/book", (req, res) => {
  res.render("books");
});

route.post("/upload/book", upload.single("book_image"), (req, res) => {
  const { name, author, price, description } = req.body;
  const image = req.file.filename;
  const book_image = `http://${req.headers.host}/images/${image}`;
  pool.query(
    `INSERT INTO books(author,price,name,description,book_image) VALUES($1,$2,$3,$4,$5) RETURNING  author,price,name,description,book_image`,
    [author, price, name, description, book_image],
    (err, results) => {
      if (err) throw err;
      res.render("admin", { book: results.rows });
    }
  );
});

route.get("/getbooks", (req, res) => {
  pool.query(`SELECT * FROM books`, (err, results) => {
    if (err) throw err;
    if (results.rows.length > 0) {
      res.render("admin", {
        book: results.rows,
      });
    }
  });
});

route.post("/updatebook", async (req, res) => {
  const { author, price, name, description, id } = req.body;
  await pool.query(
    `UPDATE books SET author = $1, price = $2, name = $3, description = $4 WHERE id=$5 RETURNING  author,price,name,description,book_image`,
    [author, price, name, description, id],
    (err, results) => {
      if (err) throw err;
      res.redirect("/admin/getbooks");
    }
  );
});

route.post("/deletebook", async (req, res) => {
  const { id } = req.body;

  await pool.query(`DELETE FROM books WHERE id = $1`, [id], (err, results) => {
    if (err) throw err;
    res.redirect("/admin/getbooks");
  });
});

route.get("/", (req, res) => {
  res.render("index");
});

module.exports = route;

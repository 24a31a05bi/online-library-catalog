const express = require("express");
const router = express.Router();
const db = require("./db");

/* GET ALL BOOKS */
router.get("/books", (req, res) => {
    const query = "SELECT * FROM books";

    db.query(query, (err, results) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.json(results);
        }
    });
});

/* GET BOOKS BY CATEGORY */
router.get("/books/category/:category", (req, res) => {
    const category = req.params.category;

    const query = "SELECT * FROM books WHERE category = ?";

    db.query(query, [category], (err, results) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.json(results);
        }
    });
});

module.exports = router;
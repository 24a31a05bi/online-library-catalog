const express = require("express");
const router = express.Router();
const db = require("./db");

// GET all books
router.get("/books", (req,res)=>{
    db.query("SELECT * FROM books", (err, results)=>{
        if(err) return res.status(500).send(err);
        res.json(results);
    });
});

// GET book by ID
router.get("/books/:id", (req,res)=>{
    db.query("SELECT * FROM books WHERE id=?", [req.params.id], (err,result)=>{
        if(err) return res.status(500).send(err);
        res.json(result[0]);
    });
});

// POST new book
router.post("/books", (req,res)=>{
    const {title, author, category, image, file} = req.body;
    db.query("INSERT INTO books (title, author, category, image, file) VALUES (?,?,?,?,?)",
        [title, author, category, image, file], (err,result)=>{
            if(err) return res.status(500).send(err);
            res.json({id: result.insertId, title, author, category, image, file});
        });
});

// PUT update book
router.put("/books/:id", (req,res)=>{
    const {title, author, category, image, file} = req.body;
    db.query("UPDATE books SET title=?, author=?, category=?, image=?, file=? WHERE id=?",
        [title, author, category, image, file, req.params.id], (err,result)=>{
            if(err) return res.status(500).send(err);
            res.json({message:"Book updated"});
        });
});

// DELETE book
router.delete("/books/:id", (req,res)=>{
    db.query("DELETE FROM books WHERE id=?", [req.params.id], (err,result)=>{
        if(err) return res.status(500).send(err);
        res.json({message:"Book deleted"});
    });
});

module.exports = router;
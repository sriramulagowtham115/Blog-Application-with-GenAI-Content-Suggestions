const express = require("express");
const router = express.Router();
const db = require("../db");

// CREATE BLOG
router.post("/", (req, res) => {
  try {
    const { title, content, author } = req.body;

    if (!title || !content || !author) {
      return res.status(400).json({ error: "All fields required" });
    }

    const stmt = db.prepare(
      "INSERT INTO blogs (title, content, author) VALUES (?, ?, ?)"
    );

    const result = stmt.run(title, content, author);

    res.json({
      message: "Blog created successfully",
      postId: result.lastInsertRowid,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET ALL
router.get("/", (req, res) => {
  try {
    const blogs = db
      .prepare("SELECT * FROM blogs ORDER BY created_at DESC")
      .all();

    res.json(blogs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET ONE
router.get("/:id", (req, res) => {
  try {
    const blog = db
      .prepare("SELECT * FROM blogs WHERE id = ?")
      .get(req.params.id);

    if (!blog) {
      return res.status(404).json({ error: "Blog not found" });
    }

    res.json(blog);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// UPDATE
router.put("/:id", (req, res) => {
  try {
    const { title, content, author } = req.body;

    db.prepare(`
      UPDATE blogs
      SET title = ?, content = ?, author = ?, updated_at = CURRENT_TIMESTAMP
      WHERE id = ?
    `).run(title, content, author, req.params.id);

    res.json({ message: "Blog updated successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE
router.delete("/:id", (req, res) => {
  try {
    db.prepare("DELETE FROM blogs WHERE id = ?")
      .run(req.params.id);

    res.json({ message: "Blog deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
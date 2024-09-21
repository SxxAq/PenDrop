const express = require("express");
const Post = require("../models/Post");
const authMiddleware = require("../middleware/auth");
const multer = require("multer");
const path = require("path");

const router = express.Router();

// Image upload configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

// Create a new post (authenticated route)
router.post("/", authMiddleware, upload.single("image"), async (req, res) => {
  const { title, content } = req.body;
  const imageUrl = req.file ? `/uploads/${req.file.filename}` : "";

  try {
    const post = new Post({
      title,
      content,
      imageUrl,
      user: req.user.id,
    });
    await post.save();
    res.status(201).json(post);
  } catch (err) {
    res.status(500).json({ message: "Server error." });
  }
});

// Get all posts
router.get("/", async (req, res) => {
  try {
    const posts = await Post.find().populate("user", "username");
    res.json(posts);
  } catch (err) {
    res.status(500).json({ message: "Server error." });
  }
});
// get Blog by ID
router.get('/:id', async (req, res) => {
    try {
      const post = await Post.findById(req.params.id).populate('user','username');
      if (!post) {
        return res.status(404).json({ message: 'Post not found' });
      }
      res.json(post);
    } catch (error) {
      res.status(500).json({ message: 'Server error' });
    }
  });

// Update a post (authenticated route)
router.put("/:id", authMiddleware, async (req, res) => {
  const { title, content } = req.body;

  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ message: "Post not found." });
    }

    if (post.user.toString() !== req.user.id) {
      return res.status(403).json({ message: "User not authorized." });
    }

    post.title = title || post.title;
    post.content = content || post.content;
    await post.save();
    res.json(post);
  } catch (err) {
    res.status(500).json({ message: "Server error." });
  }
});

// Delete a post (authenticated route)
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ message: "Post not found." });
    }

    if (post.user.toString() !== req.user.id) {
      return res.status(403).json({ message: "User not authorized." });
    }

    await post.deleteOne();
    res.json({ message: "Post removed." });
  } catch (err) {
    console.error('Error deleting post:', err); // Log the error for debugging
    res.status(500).json({ message: "Server error." });
  }
});






module.exports = router;

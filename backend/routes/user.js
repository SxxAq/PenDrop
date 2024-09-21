
const express = require('express');
const User = require('../models/User');
const router = express.Router();
const authMiddleware = require('../middleware/auth');
// get user info
router.get('/user', authMiddleware, async (req, res) => {
    try {
      const user = await User.findById(req.user.id).select('-password');
      console.log(user);
      
      res.json(user);
    } catch (err) {
      res.status(500).json({ message: 'Server error.' });
    }
  });


// Get blogs by user

router.get('/user/:id', async (req, res) => {
    try {
      const posts = await Post.find({ user: req.params.id });
      res.json(posts);
    } catch (err) {
      res.status(500).json({ message: 'Server error.' });
    }
});
  


module.exports = router;
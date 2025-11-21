const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const auth = require('../middleware/auth');

// REGISTER
router.post('/signup', async (req, res) => {
  try {
    const { username, email, password } = req.body;
    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ msg: 'User already exists' });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    user = new User({ username, email, password: hashedPassword, favorites: [] });
    await user.save();

    const payload = { user: { id: user.id } };
    jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '7d' }, (err, token) => {
      if (err) throw err;
      res.json({ token, user: { id: user.id, username: user.username, favorites: user.favorites } });
    });
  } catch (err) { res.status(500).send('Server error'); }
});

// LOGIN
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    let user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: 'Invalid Credentials' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: 'Invalid Credentials' });

    const payload = { user: { id: user.id } };
    jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '7d' }, (err, token) => {
      if (err) throw err;
      res.json({ token, user: { id: user.id, username: user.username, favorites: user.favorites } });
    });
  } catch (err) { res.status(500).send('Server error'); }
});

// GET USER
router.get('/user', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
  } catch (err) { res.status(500).send('Server error'); }
});

// TOGGLE FAVORITE
router.put('/favorites/:id', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    const recipeId = req.params.id;
    if (user.favorites.includes(recipeId)) {
      user.favorites = user.favorites.filter(fid => fid !== recipeId);
    } else {
      user.favorites.push(recipeId);
    }
    await user.save();
    res.json(user.favorites);
  } catch (err) { res.status(500).send('Server Error'); }
});

module.exports = router;

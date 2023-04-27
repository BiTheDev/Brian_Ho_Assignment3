const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require('../schemas/userSchema');
const StatusUpdate = require('../schemas/statusUpdateSchema');

// Register
router.post('/register', async (req, res) => {
  const { username, password } = req.body;
  const user = new User({ username, password, joined: new Date() });

  try {
    await user.save();
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Login
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });
    if (user && (await bcrypt.compare(password, user.password))) {
      res.json(user);
    } else {
      res.status(401).json({ error: 'Invalid username or password' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Get user info
router.get('/:userId', async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Create status update
router.post('/:userId/statusUpdates', async (req, res) => {
  const { content } = req.body;
  const statusUpdate = new StatusUpdate({ timestamp: new Date(), content });

  try {
    const user = await User.findById(req.params.userId);
    user.statusUpdates.push(statusUpdate);
    await user.save();
    res.status(201).json(statusUpdate);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Update status update
router.put('/:userId/statusUpdates/:statusUpdateId', async (req, res) => {
  const { content } = req.body;

  try {
    const user = await User.findById(req.params.userId);
    const statusUpdate = user.statusUpdates.id(req.params.statusUpdateId);
    statusUpdate.content = content;
    await user.save();
    res.json({ message: 'Status update updated successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Delete status update
router.delete('/:userId/statusUpdates/:statusUpdateId', async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    user.statusUpdates.id(req.params.statusUpdateId).remove();
    await user.save();
    res.json({ message: 'Status update deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;

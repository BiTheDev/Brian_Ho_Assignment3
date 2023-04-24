const express = require("express");
const router = express.Router();
const User = require("../schemas/userSchema");

router.get("/", async (req, res) => {
  try {
    const users = await User.find().sort({ "statusUpdates.timestamp": -1 });
    const posts = users.flatMap((user) =>
      user.statusUpdates.map((update) => ({
        _id: update._id,
        username: user.username,
        content: update.content,
        timestamp: update.timestamp,
      }))
    );
    res.json(posts);
  } catch (error) {
    console.error("Error fetching posts:", error);
    res.status(500).json({ message: "Error fetching posts" });
  }
});

module.exports = router;

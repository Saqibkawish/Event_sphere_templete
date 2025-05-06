const express = require('express');
const authMiddleware = require('../middlewares/authMiddleware');
const User = require('../models/user-model');

const router = express.Router();

// Get user profile
router.get('/profile', authMiddleware, async (req, res) => {
    try {
        const user = await User.findById(req.user.userId).select("-password");

        if (!user) return res.status(404).json({ message: "User not found" });

        res.json(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

module.exports = router;

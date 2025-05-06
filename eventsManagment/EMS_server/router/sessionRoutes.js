// routes/sessionRoutes.js
const express = require("express");
const router = express.Router();
const Session = require("../models/Session");
const authMiddleware = require("../middlewares/authMiddleware");
const Exhibitor = require("../models/exhibitor-model"); // ✅ Add this missing import
const { getSessionsBySpeakerAndImgUrl } = require("../controllers/sessionController");
// Get all sessions for a specific event
router.get("/event/:eventId", async (req, res) => {
  try {
    const sessions = await Session.find({ eventId: req.params.eventId }); // Use eventId to filter
    res.json({ data: sessions });
  } catch (error) {
    res.status(500).json({ message: "Error fetching sessions" });
  }
});
router.get("/exhibitor", authMiddleware, async (req, res) => {
  try {
    const exhibitor = await Exhibitor.findOne({ email: req.user.email });
    if (!exhibitor) return res.status(404).json({ success: false, message: "Exhibitor not found" });

    const sessions = await Session.find({ exhibitorId: exhibitor._id });
    res.json({ success: true, sessions });
  } catch (error) {
    console.error("Error fetching sessions:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
});
router.post("/", authMiddleware, async (req, res) => {
  try {
    // Get the logged-in exhibitor
    const exhibitor = await Exhibitor.findOne({ email: req.user.email });
    if (!exhibitor) {
      return res.status(404).json({ message: "Exhibitor not found." });
    }

    const { title, timeSlot, speaker, location,imgUrl } = req.body;

    // Create new session with correct IDs
    const newSession = new Session({
      title,
      timeSlot,
      speaker,
      location,
      imgUrl,
      exhibitorId: exhibitor._id,
      eventId: exhibitor._id, // Assuming exhibitor has eventId
    });

    await newSession.save();
    res.status(201).json({ message: "Session created successfully", data: newSession });
  } catch (error) {
    console.error("Error creating session:", error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
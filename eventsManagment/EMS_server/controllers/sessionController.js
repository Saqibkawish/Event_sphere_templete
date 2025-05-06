// controllers/sessionController.js
const Session = require("../models/Session");

// Get sessions for an exhibitor
const getSessionsByExhibitorId = async (req, res) => {
  try {
    const sessions = await Session.find({ exhibitorId: req.params.exhibitorId });
    res.json({ data: sessions });
  } catch (error) {
    res.status(500).json({ message: "Error fetching sessions" });
  }
};

// Create a new session
const createSession = async (req, res) => {
  const { title, timeSlot, speaker, location,imgUrl, exhibitorId,eventId } = req.body; // Expecting exhibitorId in the request body
  const newSession = new Session({ title, timeSlot, speaker, location,imgUrl, exhibitorId,eventId });

  try {
    await newSession.save();
    res.status(201).json({ message: "Session created successfully", data: newSession });
  } catch (error) {
    res.status(500).json({ message: "Error creating session" });
  }
};

// Export the controller functions
module.exports = {
  getSessionsByExhibitorId,
  createSession,
};
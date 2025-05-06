const express = require("express");
const { addEvent, updateEvent, deleteEvent,registerForEvent } = require("../controllers/eventController");

const router = express.Router();

// POST request to add a new event
router.post("/add-event", addEvent);

// PUT request to update an existing event
router.put("/update-event/:id", updateEvent);

router.post("/register", registerForEvent);

// DELETE request to delete an existing event
router.delete("/delete-event/:id", deleteEvent);
// Get all events
router.get("/", async (req, res) => {
    try {
      const events = await Event.find();
      res.json({ data: events });
    } catch (error) {
      res.status(500).json({ message: "Error fetching events" });
    }
  });
  
module.exports = router;

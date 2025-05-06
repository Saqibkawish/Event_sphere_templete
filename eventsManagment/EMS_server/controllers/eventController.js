const Event = require("../models/eventModel");
const { sendConfirmationEmail } = require("../utils/emailService");

// Add Event
const addEvent = async (req, res) => {
  try {
    console.log("Received Request Body:", req.body);

    const { eventName, description, date, location, organizer, imageUrl } = req.body;

    if (!eventName || !description || !date || !location || !organizer || !imageUrl) {
      return res.status(400).json({ error: "All fields, including imageUrl, are required." });
    }

    const newEvent = new Event({
      eventName,
      description,
      date,
      location,
      organizer,
      imageUrl,
    });

    await newEvent.save();
    res.status(201).json({ message: "Event added successfully!", newEvent });

  } catch (error) {
    console.error("Error adding event:", error);
    res.status(500).json({ error: "Failed to add event." });
  }
};

// Fetch Event by eventId
const getEventById = async (req, res) => {
  try {
    const { eventId } = req.params;
    const event = await Event.findOne({ eventId });

    if (!event) {
      return res.status(404).json({ error: "Event not found" });
    }

    res.status(200).json(event);
  } catch (error) {
    console.error("Error fetching event:", error);
    res.status(500).json({ error: "Failed to fetch event." });
  }
};

// Update Event
const updateEvent = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedEvent = await Event.findByIdAndUpdate(id, req.body, { new: true });
    if (!updatedEvent) {
      return res.status(404).json({ success: false, message: "Event not found" });
    }
    res.status(200).json({ success: true, data: updatedEvent });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Delete Event
const deleteEvent = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedEvent = await Event.findByIdAndDelete(id);
    if (!deletedEvent) {
      return res.status(404).json({ success: false, message: "Event not found" });
    }
    res.status(200).json({ success: true, message: "Event deleted successfully" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
const registerForEvent = async (req, res) => {
  const { eventId, name, email, phone } = req.body;

  if (!eventId || !name || !email || !phone) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    event.registrations.push({ name, email, phone });
    await event.save();
    await sendConfirmationEmail(email, event.eventName, event.date, event.location);

    return res.status(200).json({ message: "Registration successful" });
  } catch (error) {
    console.error("Error registering for event:", error);
    res.status(500).json({ message: "Server error" });
  }
};



module.exports = { addEvent, updateEvent, deleteEvent,getEventById,registerForEvent };

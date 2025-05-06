const Exhibitor = require("../models/exhibitor-model");
const Event = require("../models/event-model"); // Import Event model
const Session = require("../models/Session"); // ✅ Add this line

// Get all exhibitors
const getExhibitors = async (req, res) => {
  try {
    const exhibitors = await Exhibitor.find();
    res.status(200).json({ success: true, data: exhibitors });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Register a new exhibitor

// Update exhibitor details
// Update exhibitor details


const registerExhibitor = async (req, res) => {
  try {
    const { companyName, contactPerson, email, phone, productsServices, documents, _id, eventName } = req.body;

    let event = await Event.findById(_id);
    if (!event) {
      return res.status(404).json({ success: false, message: "Event not found." });
    }

    const newExhibitor = new Exhibitor({
      companyName,
      contactPerson,
      email,
      phone,
      productsServices,
      documents,
      eventId: _id,  // ✅ Store event ID explicitly
      eventName: eventName || event.eventName, // ✅ Ensure eventName is stored
    });

    await newExhibitor.save();
    res.status(201).json({ success: true, data: newExhibitor });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Approve or reject exhibitor application
const updateExhibitorStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!["approved", "rejected", "pending"].includes(status)) {
      return res.status(400).json({ success: false, message: "Invalid status." });
    }

    const updatedExhibitor = await Exhibitor.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!updatedExhibitor) {
      return res.status(404).json({ success: false, message: "Exhibitor not found." });
    }

    res.status(200).json({ success: true, data: updatedExhibitor });
  } catch (error) {
    console.error("Error updating exhibitor status:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};
// Assign booth to exhibitor
const assignBooth = async (req, res) => {
  try {
    const { id } = req.params;
    const { boothNumber } = req.body; // Changed from boothPreference to boothNumber for consistency

    const updatedExhibitor = await Exhibitor.findByIdAndUpdate(
      id,
      { boothNumber },
      { new: true }
    );

    if (!updatedExhibitor) {
      return res.status(404).json({ success: false, message: "Exhibitor not found" });
    }

    res.status(200).json({ success: true, data: updatedExhibitor });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get available booths
const getAvailableBooths = async (req, res) => {
  try {
    const exhibitors = await Exhibitor.find({ boothNumber: { $exists: true } });
    const assignedBooths = exhibitors.map((exhibitor) => exhibitor.boothNumber);

    const allBooths = ["A1", "A2", "B1", "B2", "C1", "C2"]; // Example booth numbers
    const availableBooths = allBooths.filter((booth) => !assignedBooths.includes(booth));

    res.status(200).json({ success: true, data: availableBooths });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
const getMyExhibitor = async (req, res) => {
  try {
    const exhibitor = await Exhibitor.findOne({ email: req.user.email });
    if (!exhibitor) {
      return res.status(404).json({ success: false, message: "Exhibitor not found." });
    }
    res.status(200).json({ success: true, data: exhibitor });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getExhibitorDetails = async (req, res) => {
  try {
    const exhibitor = await Exhibitor.findOne({ email: req.user.email });
    if (!exhibitor) return res.status(404).json({ success: false, message: "Exhibitor not found" });

    res.json({ success: true, data: exhibitor });
  } catch (error) {
    console.error("Error fetching exhibitor:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// ✅ Publish the Exhibitor Event
const publishEvent = async (req, res) => {
  try {
    const exhibitor = await Exhibitor.findOne({ email: req.user.email });
    if (!exhibitor) return res.status(404).json({ success: false, message: "Exhibitor not found" });

    if (exhibitor.status !== "approved") {
      return res.status(400).json({ success: false, message: "Only approved exhibitors can publish events" });
    }

    // ✅ Check if exhibitor has at least one session before publishing
    const sessions = await Session.find({ exhibitorId: exhibitor._id });
    if (sessions.length === 0) {
      return res.status(400).json({ success: false, message: "At least one session is required before publishing." });
    }

    exhibitor.isPublished = true;
    await exhibitor.save();

    res.json({ success: true, message: "Event published successfully!" });
  } catch (error) {
    console.error("Error publishing event:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
module.exports = {
  getExhibitors,
  registerExhibitor,
  updateExhibitorStatus,
  assignBooth,
  getAvailableBooths,
  getMyExhibitor,
  publishEvent,
 

};
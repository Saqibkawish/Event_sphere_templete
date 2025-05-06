const Event = require("../models/event-model.js");
const Exhibitor = require("../models/exhibitor-model");
const Session = require("../models/Session.js");
const getEvents = async (req, res) => {
  try {
    const response = await Event.find();
    if (!response || response.length === 0) {
      return res.status(404).json({ message: "No Events Found" });
    }
    return res.status(200).json({
      message: "Events Retrieved Successfully",
      data: response,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const getPublishedEvents = async (req, res) => {
  try {
    const events = await Event.find().lean();

    // Fetch exhibitors related to each event
    for (let event of events) {
      const exhibitors = await Exhibitor.find({ eventId: event._id, status: "approved" })
        .select("companyName contactPerson phone productsServices boothNumber documents")
        .lean();

      // Fetch sessions for each exhibitor
      for (let exhibitor of exhibitors) {
        exhibitor.sessions = await Session.find({ exhibitorId: exhibitor._id })
          .select("title timeSlot speaker location imgUrl")
          .lean();
      }

      event.exhibitors = exhibitors;
    }

    res.json({ success: true, data: events });
  } catch (error) {
    console.error("Error fetching published events:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
module.exports = { getEvents,getPublishedEvents };

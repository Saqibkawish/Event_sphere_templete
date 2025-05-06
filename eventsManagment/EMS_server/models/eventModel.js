const { Schema, model } = require("mongoose");

const eventSchema = new Schema({
  eventId: { type: String, unique: true }, // Store MongoDB _id as eventId
  eventName: { type: String, required: true },
  description: { type: String, required: true },
  date: { type: String, required: true },
  location: { type: String, required: true },
  organizer: { type: String, required: true },
  imageUrl: { type: String, required: true },
  registrations: [
    {
      name: { type: String, default: "" },
      email: { type: String, default: "" },
      phone: { type: String, default: "" },
      createdAt: { type: Date, default: Date.now },
    },
  ]
});

// Middleware to assign eventId as _id before saving
eventSchema.pre("save", function (next) {
  this.eventId = this._id; // Assign MongoDB _id to eventId
  next();
});

const Event = model("Event", eventSchema);

module.exports = Event;

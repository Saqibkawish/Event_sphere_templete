// models/Session.js
const { Schema, model } = require("mongoose");

const sessionSchema = new Schema({
  title: { type: String, required: true },
  timeSlot: { type: String, required: true },
  speaker: { type: String, required: true },
  location: { type: String, required: true },
  imgUrl: { type: String, required: true },
  exhibitorId: { type: Schema.Types.ObjectId, ref: "Exhibitor", required: true },
  eventId: { type: Schema.Types.ObjectId, ref: "Event", required: true }, // Add this field
}, { timestamps: true });


const Session = model("Session", sessionSchema);
module.exports = Session;
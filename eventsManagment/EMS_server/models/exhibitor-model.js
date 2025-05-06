const { Schema, model } = require("mongoose");

const exhibitorSchema = new Schema({
  companyName: { type: String, required: true },
  contactPerson: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  productsServices: { type: String, required: true },
  eventId: { type: Schema.Types.ObjectId, ref: "Event", required: true }, // ✅ Explicitly store eventId
  eventName: { type: String, required: true }, // Automatically store event name
  documents: [{ type: String }],
  status: { type: String, enum: ["pending", "approved", "rejected"], default: "pending" },
  createdAt: { type: Date, default: Date.now },
  boothNumber: { type: String },
  isPublished: { type: Boolean, default: false },
});

const Exhibitor = model("Exhibitor", exhibitorSchema);
module.exports = Exhibitor;

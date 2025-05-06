const { Schema, model } = require("mongoose");

const messageSchema = new Schema({
  senderType: { 
    type: String, 
    required: true,
    enum: ["admin", "exhibitor"]
  },
  senderId: { 
    type: Schema.Types.ObjectId, 
    required: true,
    refPath: 'senderType'  // Dynamic reference based on senderType
  },
  receiverId: { 
    type: Schema.Types.ObjectId, 
    required: true,
    ref: 'User' 
  },
  message: { type: String, required: true },
  timestamp: { type: Date, default: Date.now }
});

const Message = model("Message", messageSchema);
module.exports = Message;

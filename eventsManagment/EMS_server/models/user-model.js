const mongoose = require('mongoose');
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

// Define the user schema
const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phone: { type: String, required: true },
  role: { type: String, enum: ['user', 'admin','exhibitor'], default: 'user' } // Add role field
});
userSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
      this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

// Compare password
userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

userSchema.methods.generateToken = async function() {
  try {
    return jwt.sign({
      userId: this._id.toString(),
      email: this.email
    },
    process.env.JWT_SECRET_KEY, {
      expiresIn: 86400
    })
  } catch(error) {
    console.log(error);
  }
};

userSchema.methods.comparePassword = async function(password) {
  try {
    const isMatch = await bcrypt.compare(password, this.password);
    return isMatch;
  } catch(error) {
    console.log(error);
  }
};

// Create the model from the schema
const User = mongoose.model('User', userSchema);

// Export the model so it can be used elsewhere
module.exports = User;
const User = require('../models/user-model')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const nodemailer = require("nodemailer");
const home = async (req, res) => {
  try {
    res.status(200).send('Welcome to the Auth Controller from Home Page')
  } catch (error) {
    console.error(error)
    res.status(400).send({
      msg: 'Page Not Found!!'
    })
  }
}

const register = async (req, res) => {
  try {
    const { username, email, password, phone, role } = req.body;

    // Check if all required fields are provided
    if (!username || !email || !password || !phone) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Check if the user already exists
    const userExist = await User.findOne({ email });

    if (userExist) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Create the new user
    const userCreated = await User.create({ username, email, password, phone, role });

    res.status(200).json({
      message: 'Registration Successful',
      token: await userCreated.generateToken(),
      userId: userCreated._id.toString(),
      role: userCreated.role, // Include role in the response
    });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const userExist = await User.findOne({ email });

    if (!userExist) {
      return res.status(400).json({ message: 'User Not Exist!!' });
    }

    const isMatch = await userExist.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid Password' });
    }

    // Generate Token
    const token = await userExist.generateToken();

    // ✅ Send Role in the Response
    res.status(200).json({
      message: 'Login Successful',
      token: token,
      userId: userExist._id.toString(),
      role: userExist.role,  // 🔹 Add role here
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

const forgotPassword = async (req, res) => {
  const { email } = req.body;

  try {
      const user = await User.findOne({ email });
      if (!user) {
          return res.status(404).json({ message: "User not found" });
      }

      // Generate a reset token valid for 1 hour
      const resetToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY, { expiresIn: "1h" });

      // Reset URL
      const resetUrl = `http://localhost:5173/reset-password/${resetToken}`;

      // Configure Nodemailer transporter
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.EMAIL_USER,  // Your Gmail
            pass: process.env.EMAIL_PASS   // Your App Password
        }
      });

      // Email options
      const mailOptions = {
          from: process.env.EMAIL_USER,
          to: email,
          subject: "Password Reset Request",
          html: `<p>You requested a password reset. Click the link below:</p>
                 <a href="${resetUrl}" target="_blank">${resetUrl}</a>
                 <p>This link is valid for 1 hour.</p>`,
      };

      // Send email
      await transporter.sendMail(mailOptions);

      res.json({ message: "Password reset link sent" });
  } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Server error" });
  }
};

const resetPassword = async (req, res) => {
  const { token, password } = req.body;

  try {
      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
      const user = await User.findById(decoded.id);

      if (!user) {
          return res.status(404).json({ message: "User not found" });
      }

      // Hash new password
      // const salt = await bcrypt.genSalt(10);
      // user.password = await bcrypt.hash(password, salt);
      // await user.save();
      user.password = password;
await user.save();


      res.json({ message: "Password reset successful! You can now log in." });
  } catch (error) {
      res.status(400).json({ message: "Invalid or expired token" });
  }
};

const getAllUsers = async (req, res) => {
  try {
      const users = await User.find().select('-password'); // Exclude passwords from the response
      res.status(200).json(users);
  } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Server error' });
  }
};
// Update User
const updateUser  = async (req, res) => {
  try {
      const userId = req.params.id; // Get user ID from the URL
      const { username, email, phone, role } = req.body;

      // Find user and update
      const user = await User.findByIdAndUpdate(userId, { username, email, phone, role }, { new: true, runValidators: true });

      if (!user) {
          return res.status(404).json({ message: 'User  not found' });
      }

      res.status(200).json({
          message: 'User  updated successfully',
          user,
      });
  } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
  }
};

// Delete User
const deleteUser  = async (req, res) => {
  try {
      const userId = req.params.id; // Get user ID from the URL
      const user = await User.findByIdAndDelete(userId);

      if (!user) {
          return res.status(404).json({ message: 'User  not found' });
      }

      res.status(200).json({ message: 'User  deleted successfully' });
  } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
  }
};
module.exports = { home, register, login,forgotPassword,resetPassword,getAllUsers,updateUser ,deleteUser}
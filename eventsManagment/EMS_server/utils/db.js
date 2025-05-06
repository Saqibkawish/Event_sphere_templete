const mongoose = require("mongoose");

const URI = process.env.MONGODB_URI;

const connectdb = async () => {
    try {
        await mongoose.connect(URI);
        console.log("MongoDB connected successfully");
    } catch (error) {
        console.error("Error connecting to MongoDB", error.message);
        process.exit(1);
    }
}

module.exports = connectdb;

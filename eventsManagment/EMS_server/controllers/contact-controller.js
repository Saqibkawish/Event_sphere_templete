const Contact = require("../models/contact-model.js");

const contactForm = async (req, res) => {
    try {
        const response = req.body;
        await Contact.create(response);
        return res.status(200).json({ message: "Message sent Successfully" });
    } catch (error) {
        return resizeBy.status(500).json({ message: "Error Creating Contact" });
    }
};

module.exports = contactForm;
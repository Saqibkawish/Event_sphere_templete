const nodemailer = require("nodemailer");
const PDFDocument = require("pdfkit");
const fs = require("fs");

const sendConfirmationEmail = async (userEmail, eventName, eventDate, eventLocation) => {
  try {
    // Create PDF file dynamically
    const pdfPath = `./event-details-${Date.now()}.pdf`;
    const doc = new PDFDocument();
    doc.pipe(fs.createWriteStream(pdfPath));
    
    doc.fontSize(20).text("Event Registration Confirmation", { align: "center" });
    doc.moveDown();
    
    doc.fontSize(14).text(`Event: ${eventName}`);
    doc.text(`Date: ${eventDate}`);
    doc.text(`Location: ${eventLocation}`);
    doc.text("We look forward to seeing you at the event!");
    
    doc.end();

    // Configure the email transporter
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER, // Your Gmail
        pass: process.env.EMAIL_PASS, // Your Gmail App Password
      },
    });

    // Email options with PDF attachment
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: userEmail,
      subject: "Event Registration Confirmation",
      html: `<h2>Thank you for registering!</h2>
             <p>You have successfully registered for <strong>${eventName}</strong>.</p>
             <p>Date: ${eventDate}</p>
             <p>Location: ${eventLocation}</p>
             <p>We look forward to seeing you there!</p>`,
      attachments: [
        {
          filename: "Event_Details.pdf",
          path: pdfPath,
          contentType: "application/pdf",
        },
      ],
    };

    // Send the email
    await transporter.sendMail(mailOptions);
    console.log("✅ Confirmation email sent with event PDF!");

    // Clean up PDF after sending email
    fs.unlinkSync(pdfPath);
  } catch (error) {
    console.error("❌ Error sending email:", error);
  }
};

module.exports = { sendConfirmationEmail };

const News = require("../models/newsLetter");
const sendEmail = require("../services/emailService");

exports.newsLetter = async (req, res) => {
  try {
    const { email} = req.body;
    
    const newForm = new News({ email });
    await newForm.save();

    // Send email notification
    sendEmail(email);

    res.status(201).json({ success: true, message: "Form submitted successfully!", data: newForm });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};
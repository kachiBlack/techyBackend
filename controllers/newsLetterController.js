const News = require("../models/newsLetter");
const sendNewsEmail = require("../services/newsLetterService");

exports.newsLetter = async (req, res) => {
  try {
    const { email} = req.body;
    
    const newForm = new News({ email });
    // await newForm.save();

    // Send email notification
    sendNewsEmail(email);

    res.status(201).json({ success: true, message: "Form submitted successfully!", data: newForm });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};
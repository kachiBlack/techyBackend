const Form = require("../models/appointmentForm");
const sendEmail = require("../services/emailService");

exports.submitForm = async (req, res) => {
  try {
    const { name, email, phone, message } = req.body;
    
    const newForm = new Form({ name, email, phone, message });
    await newForm.save();

    // Send email notification
    sendEmail(email, name, phone, message);

    res.status(201).json({ success: true, message: "Form submitted successfully!", data: newForm });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};
const mongoose = require("mongoose");

const newsLetterSchema = new mongoose.Schema({
  email: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model( "News", newsLetterSchema );


const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");
const formRoute = require("./routes/appointmentFormRoute");
const newsLetterRoute = require("./routes/newsLetterRoute");

dotenv.config();
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect to database
// connectDB();

// Routes
app.use("/api/forms", formRoute);
app.use("/api/forms", newsLetterRoute);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
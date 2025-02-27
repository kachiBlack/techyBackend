const nodemailer = require("nodemailer");
const { google } = require("googleapis");
require("dotenv").config();

const OAuth2Client = new google.auth.OAuth2(
  process.env.OAUTH_CLIENT_ID,
  process.env.OAUTH_CLIENT_SECRET,
  "https://developers.google.com/oauthplayground"
);

// Set refresh token
OAuth2Client.setCredentials({ refresh_token: process.env.OAUTH_REFRESH_TOKEN });

const sendEmail = async (name, email, phone, message) => {
  try {
    // Get new access token
    const { token } = await OAuth2Client.getAccessToken();

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: process.env.EMAIL_USER,
        clientId: process.env.OAUTH_CLIENT_ID,
        clientSecret: process.env.OAUTH_CLIENT_SECRET,
        refreshToken: process.env.OAUTH_REFRESH_TOKEN,
        accessToken: token,
      },
    });

    const mailOptions = {
      to: "ubani.udochukwu@gmail.com",
      // to: process.env.EMAIL_RECEIVER,
      from: email,
      name,
      phone,
      subject: "New Appointment Submitted",
      text: `Name: ${name}\nPhone: ${phone}\nEmail: ${email}\nMessage: "${message}"`
    };

    await transporter.sendMail(mailOptions);
    console.log("Email sent to:", process.env.EMAIL_RECEIVER);
  } catch (error) {
    console.error("Error sending email:", error);
  }
};

module.exports = sendEmail;
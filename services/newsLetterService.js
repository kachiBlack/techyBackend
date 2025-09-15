const nodemailer = require("nodemailer");
const { google } = require("googleapis");
require("dotenv").config();

const OAuth2Client = new google.auth.OAuth2(
  process.env.OAUTH_CLIENT_ID,
  process.env.OAUTH_CLIENT_SECRET,
  "https://developers.google.com/oauthplayground"
);

OAuth2Client.setCredentials({ refresh_token: process.env.OAUTH_REFRESH_TOKEN });

const sendNewsEmail = async (email) => {
  try {
    // Refresh access token
    const accessToken = await OAuth2Client.getAccessToken();

    if (!accessToken || accessToken.token === null) {
      throw new Error("Failed to obtain a valid access token.");
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: process.env.EMAIL_USER,
        clientId: process.env.OAUTH_CLIENT_ID,
        clientSecret: process.env.OAUTH_CLIENT_SECRET,
        refreshToken: process.env.OAUTH_REFRESH_TOKEN,
        accessToken: accessToken.token,
      },
    });

    const mailOptions = {
      to: process.env.EMAIL_RECEIVER,
      from: email,
      subject: "Newsletter",
      text: `You just got a newsletter from: ${email}`,
    };

    await transporter.sendMail(mailOptions);
    console.log("Newsletter sent successfully!");
  } catch (error) {
    console.error("Error sending email:", error.message);

    if (error.message.includes("invalid_grant")) {
      console.error(
        "🚨 Refresh token is invalid, expired, or revoked. Generate a new one using Google OAuth2 Playground."
      );
    }
  }
};

module.exports = sendNewsEmail;
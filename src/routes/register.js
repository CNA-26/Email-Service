const express = require("express")
require("dotenv").config();
const postmark = require("postmark");
const apiKey = require("../middleware/apiKey");
const registerTemplate = require("../templates/registerTemplate");

const router = express.Router();

router.post("/", apiKey, (req, res) => { 
    const { email, name } = req.body;

    if (!email || !name) {
        console.log("Missing email or name in registration request");
        return res.status(400).json({ message: "Missing email or name" });
    }
    if (!email.includes("@arcada.fi")) {
        return res.status(400).json({ message: "Invalid email address, needs to be to @arcada.fi" });
    }
    console.log("Received registration request:", { email, name });

    const htmlTemplate = registerTemplate({ name });

    //Email sending logic:
// SENDING EMAIL WITH POSTMARK (UNCOMMENT TO ENABLE)-----

const client = new postmark.ServerClient(process.env.POSTMARK_API_KEY);
async function sendEmail() {
  await client.sendEmail({
    From: process.env.POSTMARK_FROM,
    To: email,
    Subject: "Registration confirmation from Monstera!",
    HtmlBody: htmlTemplate,
    TextBody: "Welcome to Monstera! Thank you for registering.",
    MessageStream: "broadcast",
  });

  console.log("Email sent via Postmark");
}

sendEmail().catch(console.error);

    return res.status(200).json({ message: htmlTemplate, email, name });
})

module.exports = router;
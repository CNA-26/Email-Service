const express = require("express")
require("dotenv").config();
const postmark = require("postmark");
const apiKey = require("../middleware/apiKey");

const router = express.Router();

router.post("/", apiKey, (req, res) => { 
    const { email, name, link } = req.body;

    if (!email || !name || !link) {
        console.log("Missing email, name, or link in password change request");
        return res.status(400).json({ message: "Missing email, name, or link" });
    }
    if (!email.includes("@")) {
        return res.status(400).json({ message: "Invalid email" });
    }

    console.log("Received password change request:", { email, name, link });

    

    //Email sending logic :
    const htmlTemplate = 1
/*
const client = new postmark.ServerClient(process.env.POSTMARK_API_KEY);
async function sendEmail() {
  await client.sendEmail({
    From: process.env.POSTMARK_FROM,
    To: email,
    Subject: "Test Registration Email!",
    HtmlBody: htmlTemplate,
    TextBody: "TESTING Registration Email!",
    MessageStream: "broadcast",
  });

  console.log("Email sent via Postmark");
}

sendEmail().catch(console.error); */

    return res.status(200).json({ message: "Password reset email sent!", email, name, link });
})

router.post("/confirm", apiKey, (req, res) => {
    const { email, name } = req.body;

    if (!email || !name ) {
        console.log("Missing email, or name in password change request");
        return res.status(400).json({ message: "Missing email or name" });
    }
    if (!email.includes("@")) {
        return res.status(400).json({ message: "Invalid email" });
    }

    console.log("Received password change request:", { email, name});

    //Email sending logic:
    const htmlTemplate = 1
/*
const client = new postmark.ServerClient(process.env.POSTMARK_API_KEY);
async function sendEmail() {
  await client.sendEmail({
    From: process.env.POSTMARK_FROM,
    To: email,
    Subject: "Test Registration Email!",
    HtmlBody: htmlTemplate,
    TextBody: "TESTING Registration Email!",
    MessageStream: "broadcast",
  });

  console.log("Email sent via Postmark");
}

sendEmail().catch(console.error); */

    return res.status(200).json({ message: "Password reset confirmed email sent!", email, name });
})

module.exports = router;
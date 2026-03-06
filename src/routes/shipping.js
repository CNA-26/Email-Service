const express = require("express")
require("dotenv").config();
const postmark = require("postmark");
const apiKey = require("../middleware/apiKey");
const shippingTemplate = require("../templates/shippingTemplate");

const router = express.Router();
const client = new postmark.ServerClient(process.env.POSTMARK_API_KEY);

// shipping notification email
router.post("/", apiKey, (req, res) => { 
    const { email, name, orderId, trackingNumber } = req.body;

    if (!email || !name || !orderId || !trackingNumber) {
        console.log("Missing email, name, orderId, or trackingNumber in shipping notification request");
        return res.status(400).json({ message: "Missing email, name, orderId, or trackingNumber" });
    }
    if (!email.includes("@")) {
        return res.status(400).json({ message: "Invalid email" });
    }

    console.log("Received shipping notification request:", { email, orderId, trackingNumber });

    htmlTemplate = shippingTemplate({ name, trackingNumber, orderId});

    //Email sending logic:
    
/*
-----SENDING EMAIL WITH POSTMARK (UNCOMMENT TO ENABLE)-----
const client = new postmark.ServerClient(process.env.POSTMARK_API_KEY);
async function sendEmail() {
  await client.sendEmail({
    From: process.env.POSTMARK_FROM,
    To: email,
    Subject: "Shipping Notification from Monstera",
    HtmlBody: htmlTemplate,
    TextBody: "Your order has been shipped!",
    MessageStream: "broadcast",
  });

  console.log("Email sent via Postmark");
}

sendEmail().catch(console.error); */

    return res.status(200).json({ message: "Shipping notification email sent!", email, name, orderId, trackingNumber, htmlTemplate });
});

module.exports = router;
const express = require("express")
require("dotenv").config();
const postmark = require("postmark");
const apiKey = require("../middleware/apiKey");
const orderTemplate = require("../templates/orderTemplate");

const router = express.Router();
const client = new postmark.ServerClient(process.env.POSTMARK_API_KEY);

// order notification email
router.post("/", apiKey, (req, res) => { 
    const { email, name, orderId, items } = req.body;

    if (!email || !name || !orderId || !items) {
        console.log("Missing email, name, orderId, or items : in order request");
        return res.status(400).json({ message: "Missing email, name, orderId, or item/s" });
    }
    if (!email.includes("@arcada.fi")) {
        return res.status(400).json({ message: "Invalid email address, needs to be to @arcada.fi" });
    }

    console.log("Received order notification request:", { email, name, orderId, items });

    // Listing items for the html template
    const orderDetails = items.map(item => `<li>${item.name} (x${item.quantity}) $${(item.price * item.quantity).toFixed(2)} €</li>`).join("");

    const htmlTemplate = orderTemplate({ name, orderId, orderDetails });

    //Email sending logic:
//-----SENDING EMAIL WITH POSTMARK (UNCOMMENT TO ENABLE)-----

const client = new postmark.ServerClient(process.env.POSTMARK_API_KEY);
async function sendEmail() {
  await client.sendEmail({
    From: process.env.POSTMARK_FROM,
    To: email,
    Subject: "Order Notification from Monstera",
    HtmlBody: htmlTemplate,
    TextBody: "You have a new order!",
    MessageStream: "broadcast",
  });

  console.log("Email sent via Postmark");
}

sendEmail().catch(console.error); 

    return res.status(200).json({ message: "Order notification email sent!", email, name, orderId, items, htmlTemplate });
});

module.exports = router;
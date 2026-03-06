const express = require("express")
require("dotenv").config();
const postmark = require("postmark");
const apiKey = require("../middleware/apiKey");
const invoiceTemplate = require("../templates/invoiceTemplate");

const router = express.Router();
const client = new postmark.ServerClient(process.env.POSTMARK_API_KEY);

// invoicing email
router.post("/", apiKey, (req, res) => { 
    const { email, name, invoiceId, amount, link } = req.body;

    if (!email || !name || !invoiceId || !amount || !link) {
        console.log("Missing email, name, invoiceId, amount, or link in invoicing request");
        return res.status(400).json({ message: "Missing email, name, invoiceId, amount, or link" });
    }
    if (!email.includes("@")) {
        return res.status(400).json({ message: "Invalid email" });
    }

    console.log("Received invoicing request:", { email, name, invoiceId, amount, link });

    const htmlTemplate = invoiceTemplate({ name, invoiceId, amount, link });

    // Email sending logic:

    /*
-----SENDING EMAIL WITH POSTMARK (UNCOMMENT TO ENABLE)-----
const client = new postmark.ServerClient(process.env.POSTMARK_API_KEY);
async function sendEmail() {
  await client.sendEmail({
    From: process.env.POSTMARK_FROM,
    To: email,
    Subject: "Invoice from Monstera",
    HtmlBody: htmlTemplate,
    TextBody: "new invoice from Monstera",
    MessageStream: "broadcast",
  });

  console.log("Email sent via Postmark");
}

sendEmail().catch(console.error); */

    return res.status(200).json({ message: "Invoicing email sent!", email, invoiceId, amount, link, htmlTemplate });
});

module.exports = router;
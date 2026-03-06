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

    console.log("Received invoicing request:", { email, invoiceId, amount, link });

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
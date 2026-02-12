const express = require("express")
require("dotenv").config();
const postmark = require("postmark");
const apiKey = require("../middleware/apiKey");

const router = express.Router();
const client = new postmark.ServerClient(process.env.POSTMARK_API_KEY);

// invoicing email
router.post("/", apiKey, (req, res) => { 
    const { email, invoiceId, amount } = req.body;



    console.log("Received invoicing request:", { email, invoiceId, amount });

    // Email sending logic:

    return res.status(200).json({ message: "Invoicing email sent!", email, invoiceId, amount });
});

module.exports = router;
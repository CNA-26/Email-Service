const express = require("express")
require("dotenv").config();
const postmark = require("postmark");
const apiKey = require("../middleware/apiKey");

const router = express.Router();
const client = new postmark.ServerClient(process.env.POSTMARK_API_KEY);

// shipping notification email
router.post("/", apiKey, (req, res) => { 
    const { email, orderId, trackingNumber } = req.body;
    console.log("Received shipping notification request:", { email, orderId, trackingNumber });
    return res.status(200).json({ message: "Shipping notification email sent!", email, orderId, trackingNumber });
});

module.exports = router;
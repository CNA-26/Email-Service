const express = require("express")
require("dotenv").config();
const postmark = require("postmark");
const verifyJWT = require("../middleware/auth");

const router = express.Router();
const client = new postmark.ServerClient(process.env.POSTMARK_API_KEY);

// order notification email
router.post("/", verifyJWT, async (req, res) => { 
    const { email, orderId, items } = req.body;

    if (!email || !orderId || !items) {
        console.log("Missing email, orderId, or items : in order request");
        return res.status(400).json({ message: "Missing email, orderId, or item/s" });
    }
    if (!email.includes("@")) {
        return res.status(400).json({ message: "Invalid email" });
    }

    console.log("Received order notification request:", { email, orderId, items });

    // Email sending logic:


    return res.status(200).json({ message: "Order notification email sent!", email, orderId, items });
});

module.exports = router;
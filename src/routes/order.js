const express = require("express")
require("dotenv").config();
const postmark = require("postmark");
const verifyJWT = require("../middleware/auth");

const router = express.Router();
const client = new postmark.ServerClient(process.env.POSTMARK_API_KEY);

// order notification email
router.post("/order", async (req, res) => { 
    const { email, orderId, items } = req.body;
    console.log("Received order notification request:", { email, orderId, items });
    return res.status(200).json({ message: "Order notification email sent!", email, orderId, items });
});

module.exports = router;
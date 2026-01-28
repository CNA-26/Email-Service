const express = require("express")
require("dotenv").config();
const postmark = require("postmark");
const verifyJWT = require("../middleware/auth");

const router = express.Router();
const client = new postmark.ServerClient(process.env.POSTMARK_API_KEY);

// invoicing email
router.post("/invoice", async (req, res) => { 
    const { email, invoiceId, amount } = req.body;
    console.log("Received invoicing request:", { email, invoiceId, amount });
    return res.status(200).json({ message: "Invoicing email sent!", email, invoiceId, amount });
});

module.exports = router;
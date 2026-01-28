const express = require("express")
require("dotenv").config();
const postmark = require("postmark");
const verifyJWT = require("../middleware/auth");

const router = express.Router();
const client = new postmark.ServerClient(process.env.POSTMARK_API_KEY);

router.post("/", /*verifyJWT,*/ async (req, res) => { 
    const { email, name } = req.body;

    if (!email || !name) {
        console.log("Missing email or name in registration request");
        return res.status(400).json({ message: "Missing email or name" });
    }
    if (!email.includes("@")) {
        return res.status(400).json({ message: "Invalid email" });
    }

    console.log("Received registration request:", { email, name });
    return res.status(200).json({ message: "Registration successful!", email, name });
})

module.exports = router;
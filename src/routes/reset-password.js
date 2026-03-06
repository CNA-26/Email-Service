const express = require("express")
require("dotenv").config();
const postmark = require("postmark");
const apiKey = require("../middleware/apiKey");
const resetPasswordTemplate = require("../templates/resetPasswordTemplate");
const resetPasswordConfirmationTemplate = require("../templates/resetPasswordConfirmationTemplate");

const router = express.Router();

router.post("/", apiKey, (req, res) => { 
    const { email, name, link } = req.body;

    if (!email || !name || !link) {
        console.log("Missing email, name, or link in password change request");
        return res.status(400).json({ message: "Missing email, name, or link" });
    }
    if (!email.includes("@")) {
        return res.status(400).json({ message: "Invalid email" });
    }

    console.log("Received password change request:", { email, name, link });

    const htmlTemplate = resetPasswordTemplate({ name, link });

    //Email sending logic :
 /*
const client = new postmark.ServerClient(process.env.POSTMARK_API_KEY);
async function sendEmail() {
  await client.sendEmail({
    From: process.env.POSTMARK_FROM,
    To: email,
    Subject: "Reset password link for Monstera",
    HtmlBody: htmlTemplate,
    TextBody: "Reset password link for Monstera",
    MessageStream: "broadcast",
  });

  console.log("Email sent via Postmark");
}

sendEmail().catch(console.error);  */

    return res.status(200).json({ message: "Password reset email sent!", email, name, link, htmlTemplate });
})

router.post("/confirm", apiKey, (req, res) => {
    const { email, name, newPassword} = req.body;

    if (!email || !name || !newPassword) {
        console.log("Missing email, name, or new password in password change request");
        return res.status(400).json({ message: "Missing email, name, or new password" });
    }
    if (!email.includes("@")) {
        return res.status(400).json({ message: "Invalid email" });
    }

    console.log("Received password change request:", { email, name, newPassword });

    const htmlTemplate = resetPasswordConfirmationTemplate({ name, newPassword });

    //Email sending logic:
 /*
const client = new postmark.ServerClient(process.env.POSTMARK_API_KEY);
async function sendEmail() {
  await client.sendEmail({
    From: process.env.POSTMARK_FROM,
    To: email,
    Subject: "Reset Password Confirmation for Monstera",
    HtmlBody: htmlTemplate,
    TextBody: "Reset Password Confirmation for Monstera",
    MessageStream: "broadcast",
  });

  console.log("Email sent via Postmark");
} 

sendEmail().catch(console.error); */

    return res.status(200).json({ message: "Password reset confirmed email sent!", email, name, newPassword, htmlTemplate });
})

module.exports = router;
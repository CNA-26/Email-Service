const express = require('express');

require("dotenv").config();
const postmark = require("postmark");

const app = express();

const PORT = process.env.PORT

app.use(express.json())

app.get("/", (req, res) => {
  res.send("Email Service is running!");
  console.log("test / endpoint");
});

const registerRouter = require('./routes/register');
app.use('/register', registerRouter);
const resetPasswordRouter = require('./routes/reset-password');
app.use('/reset-password', resetPasswordRouter);

const orderRouter = require('./routes/order');
app.use('/order', orderRouter);

const invoiceRouter = require('./routes/invoice');
app.use('/invoice', invoiceRouter);

const shippingRouter = require('./routes/shipping');
app.use('/shipping', shippingRouter);

app.listen(PORT, () => {
    try {
        console.log(`Running on http://localhost:${PORT}`)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
    
})

/* 
const client = new postmark.ServerClient(process.env.POSTMARK_API_KEY);
async function sendEmail() {
  await client.sendEmail({
    From: process.env.POSTMARK_FROM,
    To: "gerkmanj@arcada.fi",
    Subject: "Test Email from Postmark!!",
    HtmlBody: "<strong>Hello</strong> dear Postmark user.",
    TextBody: "TESTING TESTING!",
    MessageStream: "broadcast",
  });

  console.log("Email sent via Postmark");
}

sendEmail().catch(console.error);
*/
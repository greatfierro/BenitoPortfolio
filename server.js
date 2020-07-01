const express = require("express");
const nodemailer = require("nodemailer");
const bodyParser = require("body-parser");
const fetch = require("node-fetch");
const app = express();

// Config
require("dotenv").config();

// Load Enviorment variables
const PORT = process.env.PORT || 5000;
const SECRET_KEY = process.env.SECRET_KEY;
const MAIL_HOST = process.env.MAIL_HOST;
const MAIL_PORT = process.env.MAIL_PORT;
const MAIL_USER = process.env.MAIL_USER;
const MAIL_PASSWORD = process.env.MAIL_PASSWORD;

// Middleware
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Home Page
app.get("/", (req, res) => {
  res.render("index.html");
});

// handle form submit
app.post("/submit", async (req, res) => {
  if (!req.body.captcha) {
    return res.json({ success: false, msg: "Please select captcha" });
  }

  // verufy url string
  const verifyUrl = `https://www.google.com/recaptcha/api/siteverify?secret=${SECRET_KEY}&response=${req.body.captcha}&remoteip=${req.connection.remoteAddress}`;

  // //Make request to VerifyUrl
  const body = await fetch(verifyUrl).then((res) => res.json());

  // If not successful
  if (body.success !== undefined && !body.success)
    return res.json({ success: false, msg: "Failed captcha verification" });
  else {
    // If successful
    sendEmail(
      req.body.name,
      req.body.email,
      req.body.subject,
      req.body.message
    );
    return res.json({ success: true, msg: "Captcha passed" });
  }
});

// use Nodemail to send email
function sendEmail(name, email, subject, message) {
  // Create Transporterß
  const transporter = nodemailer.createTransport({
    host: MAIL_HOST,
    port: MAIL_PORT,
    secure: false,
    auth: {
      user: MAIL_USER, // test email will be deleted, so dont even try!!
      pass: MAIL_PASSWORD,
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

  // Send Data
  let info = transporter.sendMail({
    from: email, // sender address
    to: MAIL_USER, // list of receivers
    subject: subject, // Subject line
    text: message, // plain text body
    html: `<h2>Name: ${name}</h2><br/><p>${message}</p>`, // html body
  });
}

// Return an objct with the following properties
// Success : true/false
function validateCaptcha(captcha, remoteip) {}

app.listen(PORT, () => console.log(`Running on Port: ${PORT}`));

const express = require("express");
const nodemailer = require("nodemailer");
const bodyParser = require("body-parser");
const fetch = require("node-fetch");
const app = express();

const PORT = 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Middleware
app.use(express.static("public"));

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
  const secretKey = process.env.SECRET_KEY;
  const verifyUrl = `https://www.google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${req.body.captcha}&remoteip=${req.connection.remoteAddress}`;

  // //Make request to VerifyUrl
  const body = await fetch(verifyUrl).then((res) => res.json());

  // If not successful
  if (body.success !== undefined && !body.success)
    return res.json({ success: false, msg: "Failed captcha verification" });

  // If successful
  sendEmail(req.body.name, req.body.email, req.body.subject, req.body.message);
  return res.json({ success: true, msg: "Captcha passed" });
});

// use Nodemail to send email
function sendEmail(name, email, subject, message) {
  // Create Transporterß
  const transporter = nodemailer.createTransport({
    host: process.env.MAILHOST,
    port: process.env.MAILPORT,
    secure: false,
    auth: {
      user: process.env.MAILUSER, // test email will be deleted, so dont even try!!
      pass: process.env.MAILPASS,
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

  // Send Data
  let info = transporter.sendMail({
    from: email, // sender address
    to: process.env.MAILUSER, // list of receivers
    subject: subject, // Subject line
    text: message, // plain text body
    html: `<p>${message}</p>`, // html body
  });
}

// Return an objct with the following properties
// Success : true/false
function validateCaptcha(captcha, remoteip) {}

// test route
app.get("/env", (req, res) => {
  console.log(typeof process.env.MAILHOST);
});

app.listen(PORT, () => console.log(`Running on Port: ${PORT}`));

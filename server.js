const express = require("express");
const nodemailer = require("nodemailer");
const bodyParser = require("body-parser");
const Mail = require("nodemailer/lib/mailer");
const app = express();

const PORT = 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.post("/send", (req, res) => {
  // Create Transporter
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
    from: req.body.email, // sender address
    to: process.env.MAILUSER, // list of receivers
    subject: req.body.subject, // Subject line
    text: req.body.message, // plain text body
    html: `<p>${req.body.message}</p>`, // html body
  });
  console.log(req.body.name);
  console.log(req.body.email);
  console.log(req.body.subject);
  console.log(req.body.message);
  res.redirect("http://localhost:5501/");
});

app.get("/env", (req, res) => {
  console.log(typeof process.env.MAILHOST);
});

app.listen(PORT, () => console.log(`Running on Port: ${PORT}`));

const express = require("express");
const nodemailer = require("nodemailer");
const bodyParser = require("body-parser");
const app = express();

const PORT = 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.post("/send", (req, res) => {
  // Create Transporter
  const transporter = nodemailer.createTransport({
    host: "mail.benitopatino.com",
    port: 587,
    secure: false,
    auth: {
      user: "tester@benitopatino.com",
      pass: "iamlegend",
    },
  });

  // Send Data
  let info = transporter.sendMail({
    from: req.body.email, // sender address
    to: "jesus.rempel59@ethereal.email", // list of receivers
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

app.listen(PORT, () => console.log(`Running on Port: ${PORT}`));

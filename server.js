const express = require("express");
const nodemailer = require("nodemailer");
const app = express();

// bring in mail service

const PORT = 5000;

app.post("/send", (res, req) => {
  main();
});

// Helper
async function main() {
  let testAcct = await nodemailer.createTestAccount();

  // send mail with defined transport object
  const transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    auth: {
      user: "constance.schmeler@ethereal.email",
      pass: "Dar3xh5K2VaJc7H9qU",
    },
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: '"Fred Foo 👻" <foo@example.com>', // sender address
    to: "bar@example.com, baz@example.com", // list of receivers
    subject: "Hello ✔", // Subject line
    text: "Hello world?", // plain text body
    html: "<b>Hello world?</b>", // html body
  });

  console.log("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // Preview only available when sending through an Ethereal account
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
}

app.listen(PORT, () => console.log(`Running on Port: ${PORT}`));

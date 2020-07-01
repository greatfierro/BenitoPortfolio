// Getting elements
const form = document.getElementById("contact-form");

// Adding event listener
form.addEventListener("submit", submitForm);

// Submit Form
function submitForm(e) {
  // get all form input values
  const name = document.querySelector("#name").vsalue;
  const email = document.querySelector("#email").value;
  const subject = document.querySelector("#subject").value;
  const message = document.querySelector("#message").value;
  const captcha = document.querySelector("#g-recaptcha-response").value;
  const msg = document.querySelector(".msg");
  fetch("/submit", {
    method: "POST",
    headers: {
      Accept: "application/json, text/plain, */*",
      "Content-type": "application/json",
    },
    body: JSON.stringify({
      name,
      email,
      subject,
      message,
      captcha,
    }),
  })
    .then((res) => res.json())
    .then((data) => {
      if (!data.success) {
        msg.textContent = data.msg;
        msg.style.color = "red";

        setTimeout(() => {
          msg.style.display = "none";
        }, 5000);
      } else {
        msg.textContent = "Message Sent!";
        msg.style.color = "green";

        setTimeout(() => {
          location.reload();
          msg.style.display = "none";
        }, 1000);
      }
    });
  e.preventDefault();
}

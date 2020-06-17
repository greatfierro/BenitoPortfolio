const contactForm = document.querySelector("form");

//
addEventListener();

function addEventListener() {
  contactForm.addEventListener("submit", reloadPage);
}

function reloadPage(e) {
  location.reload();
}

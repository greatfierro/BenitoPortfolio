const title = document.querySelector(".job-title");
const text = "Front End Developer";
let i = 0;

function typing() {
  if (i < text.length) {
    title.innerHTML += text.charAt(i);
    i++;
    setTimeout(typing, 60);
  }
}

typing();

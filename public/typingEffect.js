const title = document.querySelector(".job-title");
const text = "Full Stack Developer";
let i = 0;

function typing() {
  if (i < text.length) {
    title.innerHTML += text.charAt(i);
    i++;
    setTimeout(typing, 60);
  }
}

typing();

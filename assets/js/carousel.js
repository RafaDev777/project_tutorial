let slideIndex = 0;
const slides = document.querySelectorAll(".carousel_item");

function showSlide(n) {
  slides.forEach((slide) => (slide.style.display = "none"));
  slideIndex = (n + slides.length) % slides.length;
  slides[slideIndex].style.display = "flex";
}

function prevSlide() {
  showSlide(slideIndex - 1);
  console.log("prev");
}

function nextSlide() {
  showSlide(slideIndex + 1);
  console.log("next");
}

showSlide(slideIndex);
console.log("carousel.js loaded");

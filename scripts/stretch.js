const stretch = document.querySelector(".stretch");

stretch.addEventListener("mouseover", animateStretch);
stretch.addEventListener("mouseout", stopStretch);

function animateStretch() {
    stretch.classList.add("animate__rubberBand");
}

function stopStretch() {
    stretch.classList.remove("animate__rubberBand");
}
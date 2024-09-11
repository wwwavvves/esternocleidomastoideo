const links = document.querySelectorAll(".link");
const animations = [
  "animate__bounce",
  "animate__swing",
  "animate__tada",
  "animate__jello",
  "animate__wobble",
];

let randomNumber;
let randomNumbersList = [];

window.addEventListener("load", (event) => {
  links.forEach((link) => {
    randomNumber = Math.floor(Math.random() * animations.length);
    randomNumbersList.push(randomNumber);
  });

  links.forEach((link, i) => {
    link.addEventListener("mouseover", (event) => {
      link.classList.add(animations[randomNumbersList[i]]);
    });
    link.addEventListener("mouseout", (event) => {
      link.classList.remove(animations[randomNumbersList[i]]);
    });
  })

//   for (i = 0; i < randomNumbersList.length; i++) {
//     console.log(randomNumbersList[i]);
//     // link.addEventListener("mouseover", (event) => {
//     //   link.classList.add(animations[randomNumber]);
//     // });
//     // link.addEventListener("mouseout", (event) => {
//     //   link.classList.remove(animations[randomNumber]);
//     // });
//   }
});

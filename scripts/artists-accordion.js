// Fetch the JSON data
fetch("../data/artists.json")
  .then((response) => {
    if (!response.ok) {
      throw new Error("Network response was not ok " + response.statusText);
    }
    return response.json(); // Parse the JSON from the response
  })
  .then((data) => {
    // Handle the data here
    displayArtists(data.artists);
  })
  .catch((error) => {
    console.error("There has been a problem with your fetch operation:", error);
  });

function displayArtists(artists) {
  const accordion = document.querySelector(".accordion");
  artists
    .slice()
    .reverse()
    .forEach((element) => {
      let elementIdPadded = element.id.toString().padStart(3, "0");
      let html = `
        <div class="acc-item">
              <button class="accordion-btn">
                <div class="artist-name"><span class="artist-id">${elementIdPadded}</span>${
        element.name
      }</div>
                <i class="icon fa-solid fa-chevron-down"></i>
              </button>
              <div class="panel">
                <div class="gallery draggable">
                  ${element.pictures
                    .map(
                      (picture) =>
                        `<img src="${picture}" class="img-drag" width="500">`
                    )
                    .join("")}
                </div>
                <p class="artist-bio">
                ${element.bio}
                </p>
              </div>
        </div>
      `;
      accordion.insertAdjacentHTML("afterbegin", html);
    });

  // Attach the event listeners for the accordion buttons
  const acc = document.getElementsByClassName("accordion-btn");
  for (let i = 0; i < acc.length; i++) {
    acc[i].addEventListener("click", function () {
      this.classList.toggle("active");
      const panel = this.nextElementSibling;

      if (panel.style.maxHeight) {
        panel.style.overflow = "hidden";
        panel.style.maxHeight = null;
      } else {
        panel.style.maxHeight = panel.scrollHeight + "px";
        panel.style.overflow = "visible";
      }
    });
  }

      function getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
      }

      $.fn.randomOrder = function (animate) {
        this.each(function () {
          var image = $(this);

          // Viewport Dimensions
          var vpHeight = $(window).height();
          var vpWidth = $(window).width();

          // Image Position
          var xPos = getRandomInt(0, vpWidth - image.width());
          var yPos = getRandomInt(0, vpHeight - image.height());
          var zIndex = getRandomInt(0, 13);

          // Animation Duration
          if (animate) var dur = 100;
          else var dur = 0;

          image.animate({ left: xPos, top: yPos, "z-index": zIndex }, dur);
        });
      };

      //Setup
      $(".img-drag").randomOrder(false);
      $(".img-drag").draggable({ stack: ".img-drag" });
    // $('.img-drag').draggable({ containment: ".accordion-body", scroll: false });
}
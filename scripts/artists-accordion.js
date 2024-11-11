// Fetch the JSON data
fetch("../data/artists.json")
  .then((response) => {
    if (!response.ok) {
      throw new Error("Network response was not ok " + response.statusText);
    }
    return response.json(); // Parse the JSON from the response
  })
  .then((data) => {
    displayArtists(data.artists); // Call the displayArtists function
  })
  .catch((error) => {
    console.error("There has been a problem with your fetch operation:", error);
  });

// Define displayArtists function globally
function displayArtists(artists) {
  const isMobile = /Mobi|Android/i.test(navigator.userAgent); // Check if the device is mobile
  const accordion = document.querySelector(".accordion");

  artists
    .slice()
    .reverse()
    .forEach((element) => {
      let elementIdPadded = element.id.toString().padStart(3, "0");

      // Mobile: Bootstrap Carousel
      let mobileCarousel = `
        <div id="carouselExample-${element.id}" class="carousel slide mt-5">
          <div class="carousel-inner">
            ${element.pictures
              .map(
                (picture, index) => `
              <div class="carousel-item ${index === 0 ? "active" : ""}">
                <img src="${picture}" class="d-block w-100" alt="...">
              </div>`
              )
              .join("")}
          </div>
          <button class="carousel-control-prev" type="button" data-bs-target="#carouselExample-${
            element.id
          }" data-bs-slide="prev">
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Previous</span>
          </button>
          <button class="carousel-control-next" type="button" data-bs-target="#carouselExample-${
            element.id
          }" data-bs-slide="next">
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Next</span>
          </button>
        </div>
      `;

      // Non-mobile: Draggable Gallery
      let draggableGallery = `
        <div class="gallery draggable">
          ${element.pictures
            .map(
              (picture) => `<img src="${picture}" class="img-drag" width="500">`
            )
            .join("")}
        </div>
      `;

      // Create the accordion item HTML based on the device type
      let html = `
        <div class="acc-item">
          <button class="accordion-btn">
            <div class="artist-name"><span class="artist-id">${elementIdPadded}</span>${
        element.name
      }</div>
            <i class="icon fa-solid fa-chevron-down"></i>
          </button>
          <div class="panel">
            ${isMobile ? mobileCarousel : draggableGallery}
            <p class="artist-bio">${element.bio}</p>
            <button class="artist-store-btn">${element.name}'s store</button>
          </div>
        </div>
      `;

      accordion.insertAdjacentHTML("afterbegin", html);
    });

  // Attach event listeners for the accordion buttons
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

  // Apply draggable functionality for non-mobile devices
  if (!isMobile) {
    enableDraggableImages();
  }
}

// Helper function for draggable setup
function enableDraggableImages() {
  function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  $.fn.randomOrder = function (animate) {
    this.each(function () {
      const image = $(this);
      const vpHeight = $(window).height();
      const vpWidth = $(window).width();

      const xPos = getRandomInt(0, vpWidth - image.width());
      const yPos = getRandomInt(0, vpHeight - image.height());
      const zIndex = getRandomInt(0, 13);

      const dur = animate ? 100 : 0;
      image.animate({ left: xPos, top: yPos, "z-index": zIndex }, dur);
    });
  };

  // Enable draggable images
  $(".img-drag").randomOrder(false);
  $(".img-drag").draggable({ stack: ".img-drag" });
}

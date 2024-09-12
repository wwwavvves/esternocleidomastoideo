// Fetch the JSON data
fetch("../data/data.json")
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
                <div class="gallery">
                  ${element.pictures
                    .map(
                      (picture) =>
                        `<img src="${picture}" class="img-drag" width="500">`
                    )
                    .join("")}
                </div>
                <p>
                  Lorem, ipsum dolor sit amet consectetur adipisicing elit. Corporis
                  velit esse pariatur, accusamus eos consequuntur ex voluptatibus
                  voluptatem adipisci officiis labore accusantium ut exercitationem,
                  at laboriosam minus, sint perferendis repudiandae architecto alias
                  impedit doloribus.
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
      const icon = this.querySelector(".icon");

      if (panel.style.maxHeight) {
        panel.style.maxHeight = null;
      } else {
        panel.style.maxHeight = panel.scrollHeight + "px";
      }
    });
  }
}
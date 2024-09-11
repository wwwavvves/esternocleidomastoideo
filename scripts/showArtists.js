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
  console.log(artists);
  artists
    .slice()
    .reverse()
    .forEach((element) => {
      let html = `
    <div class="acc-item">
          <button class="accordion-btn">
            <div class="artist-name"><span class="artist-id">${element.id}</span>${element.name}</div>
            <i class="icon fa-solid fa-chevron-down"></i>
          </button>
          <div class="panel">
            <p>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Corporis
              velit esse pariatur, accusamus eos consequuntur ex voluptatibus
              voluptatem adipisci officiis labore accusantium ut exercitationem,
              at laboriosam minus, sint perferendis repudiandae architecto alias
              impedit doloribus. Quasi impedit explicabo molestiae cupiditate
              ratione? Ex voluptatibus repellat voluptates velit inventore
              beatae non eaque officia nulla asperiores, perferendis saepe
              obcaecati omnis!
            </p>
          </div>
    </div>
`;
      accordion.insertAdjacentHTML("afterbegin", html);
    //   console.log(element.id.toString().length); LENGTH OF NUMBERS
    });
}
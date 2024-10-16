// Fetch the JSON data
fetch("../data/events.json")
  .then((response) => {
    if (!response.ok) {
      throw new Error("Network response was not ok " + response.statusText);
    }
    return response.json(); // Parse the JSON from the response
  })
  .then((data) => {
    // Handle the data here
    displayEvents(data.events);
  })
  .catch((error) => {
    console.error("There has been a problem with your fetch operation:", error);
  });

function displayEvents(events) {
  const eventsContainer = document.querySelector(".events");
  events
    .slice()
    .reverse()
    .forEach((element) => {
      let html = `
        ${element.name}
      `;
      eventsContainer.insertAdjacentHTML("afterbegin", html);
    });
}

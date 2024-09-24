// Function to get a random integer between min and max
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Function to randomly position items inside the container
function randomOrder(item) {
  // Get container and item dimensions
  let container = document.querySelector("#news-container");
  let containerRect = container.getBoundingClientRect();
  let containerWidth = containerRect.width;
  let containerHeight = containerRect.height;

  let itemRect = item.getBoundingClientRect();
  let itemWidth = itemRect.width;
  let itemHeight = itemRect.height;

  // Generate random positions within the container bounds
  let xPos = getRandomInt(0, containerWidth - itemWidth);
  let yPos = getRandomInt(0, containerHeight - itemHeight);
  let zIndex = getRandomInt(0, 13);

  // Apply the random position to the item
  item.style.left = `${xPos}px`;
  item.style.top = `${yPos}px`;
  item.style.zIndex = zIndex;
}

// Drag and Drop Logic
let dragItems = document.querySelectorAll(".item");
let container = document.querySelector("#news-container");

dragItems.forEach((item) => {
  // Initially set random positions for the items
  randomOrder(item);

  let active = false;
  let currentX;
  let currentY;
  let initialX;
  let initialY;
  let xOffset = 0;
  let yOffset = 0;

  container.addEventListener("touchstart", dragStart, false);
  container.addEventListener("touchend", dragEnd, false);
  container.addEventListener("touchmove", drag, false);

  container.addEventListener("mousedown", dragStart, false);
  container.addEventListener("mouseup", dragEnd, false);
  container.addEventListener("mousemove", drag, false);

  function dragStart(e) {
    if (e.type === "touchstart") {
      initialX = e.touches[0].clientX - xOffset;
      initialY = e.touches[0].clientY - yOffset;
    } else {
      initialX = e.clientX - xOffset;
      initialY = e.clientY - yOffset;
    }

    if (e.target === item) {
      active = true;
    }
  }

  function dragEnd(e) {
    initialX = currentX;
    initialY = currentY;
    active = false;
  }

  function drag(e) {
    if (active) {
      e.preventDefault();

      if (e.type === "touchmove") {
        currentX = e.touches[0].clientX - initialX;
        currentY = e.touches[0].clientY - initialY;
      } else {
        currentX = e.clientX - initialX;
        currentY = e.clientY - initialY;
      }

      xOffset = currentX;
      yOffset = currentY;

      setTranslate(currentX, currentY, item);
    }
  }

  function setTranslate(xPos, yPos, el) {
    el.style.transform = `translate3d(${xPos}px, ${yPos}px, 0)`;
  }
});
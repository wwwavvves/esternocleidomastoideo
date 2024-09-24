let svg = document.getElementById("est-svg");
let paths = svg.querySelectorAll("path");
let j = 0;

paths.forEach(function (item, index) {
  j++;

  var pathLength = item.getTotalLength(),
    speed = 100;

  item.setAttribute("stroke-dasharray", pathLength);
  item.setAttribute("stroke-dashoffset", pathLength);

  if (index == 0) {
    item.innerHTML =
      "<animate id='a" +
      j +
      "' attributeName='stroke-dashoffset' begin='0s' dur='" +
      pathLength / speed +
      "'s to='0' fill='freeze' />";
  } else {
    item.innerHTML =
      "<animate id='a" +
      j +
      "' attributeName='stroke-dashoffset' begin='a" +
      (j - 1) +
      ".end' dur='" +
      pathLength / speed +
      "'s to='0' fill='freeze' />";
  }

  // console.log(index, pathLength, item.innerHTML);
});

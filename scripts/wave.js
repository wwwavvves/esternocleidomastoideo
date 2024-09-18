let xs = [];
for (var i = 0; i <= 300; i++) {
  xs.push(i);
}

let t = 0;

function animate() {
  let points = xs.map((x) => {
    let y = 200 + 15 * Math.sin((x + t) / 15);

    return [x, y];
  });

  let wave =
    "M" +
    points
      .map((p) => {
        return p[0] + "," + p[1];
      })
      .join(" L");

  document.querySelector(".wave-path").setAttribute("d", wave);

  t += 0.5;

  requestAnimationFrame(animate);
}

animate();

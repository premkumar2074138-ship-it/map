const card = document.getElementById("mapCard");
const layer = document.getElementById("mapLayer");

let tx = 0;
let ty = 0;
let currentX = 0;
let currentY = 0;
let idle = 0;

function animate(time){
  idle = time * 0.001;

  const floatX = Math.sin(idle * 0.7) * 1.2;
  const floatY = Math.cos(idle * 0.8) * 1.0;

  currentX += (tx + floatX - currentX) * 0.08;
  currentY += (ty + floatY - currentY) * 0.08;

  layer.style.setProperty("--move-x", `${currentX}px`);
  layer.style.setProperty("--move-y", `${currentY}px`);

  requestAnimationFrame(animate);
}

card.addEventListener("mousemove", (event) => {
  const rect = card.getBoundingClientRect();
  const px = (event.clientX - rect.left) / rect.width - 0.5;
  const py = (event.clientY - rect.top) / rect.height - 0.5;

  // A small cinematic 3D camera effect.
  // The map subtly shifts opposite the cursor.
  tx = -px * 16;
  ty = -py * 10;

  layer.style.setProperty("--ry", `${px * 1.8}deg`);
  layer.style.setProperty("--rx", `${-py * 1.4}deg`);
});

card.addEventListener("mouseleave", () => {
  tx = 0;
  ty = 0;
  layer.style.setProperty("--ry", "0deg");
  layer.style.setProperty("--rx", "0deg");
});

window.addEventListener("resize", () => {
  tx = 0;
  ty = 0;
});

requestAnimationFrame(animate);

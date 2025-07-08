const canvas = document.getElementById("drawCanvas");
const ctx = canvas.getContext("2d");

let scale = 1;
let originX = 0;
let originY = 0;
let isDrawing = false;
let drawAllowed = false;
let lastX, lastY;

const wallWidth = 3000;
const wallHeight = 3000;

resizeCanvas();

window.addEventListener("resize", resizeCanvas);

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  drawScene();
}

function drawScene() {
  ctx.setTransform(scale, 0, 0, scale, originX, originY);
  document.getElementById("zoom-info").textContent = `Zoom: ${Math.floor(scale)}x`;
  drawAllowed = scale >= 500;
}

function isInsideWall(x, y) {
  return x >= 0 && y >= 0 && x <= wallWidth && y <= wallHeight;
}

canvas.addEventListener("wheel", (e) => {
  e.preventDefault();
  const delta = e.deltaY > 0 ? -0.5 : 0.5;
  scale += delta;
  scale = Math.max(1, Math.min(500, scale));
  drawScene();
});

canvas.addEventListener("mousedown", (e) => {
  if (!drawAllowed) return;
  isDrawing = true;
  lastX = (e.clientX - originX) / scale;
  lastY = (e.clientY - originY) / scale;
});

canvas.addEventListener("mousemove", (e) => {
  if (!isDrawing || !drawAllowed) return;

  const newX = (e.clientX - originX) / scale;
  const newY = (e.clientY - originY) / scale;

  if (!isInsideWall(newX, newY)) return;

  ctx.lineWidth = document.getElementById("sizePicker").value;
  ctx.strokeStyle = document.getElementById("colorPicker").value;
  ctx.lineCap = "round";

  ctx.beginPath();
  ctx.moveTo(lastX, lastY);
  ctx.lineTo(newX, newY);
  ctx.stroke();

  lastX = newX;
  lastY = newY;
});

canvas.addEventListener("mouseup", () => isDrawing = false);
canvas.addEventListener("mouseout", () => isDrawing = false);

document.getElementById("clearBtn").addEventListener("click", () => {
  ctx.clearRect(-originX / scale, -originY / scale, canvas.width / scale, canvas.height / scale);
});

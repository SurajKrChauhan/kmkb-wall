const canvas = document.getElementById("drawCanvas");
const ctx = canvas.getContext("2d");

let scale = 1;
let originX = 0;
let originY = 0;
let isDrawing = false;
let drawAllowed = false;

let lastX, lastY;

resizeCanvas();

window.addEventListener("resize", resizeCanvas);

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  drawScene();
}

function drawScene() {
  ctx.setTransform(scale, 0, 0, scale, originX, originY);
}

canvas.addEventListener("wheel", (e) => {
  e.preventDefault();
  const delta = e.deltaY > 0 ? -0.05 : 0.05;
  scale += delta;
  scale = Math.max(1, Math.min(1000, scale));

  drawAllowed = scale >= 10;

  drawScene();
});

canvas.addEventListener("mousedown", (e) => {
  if (!drawAllowed) return;
  isDrawing = true;
  lastX = (e.clientX - originX) / scale;
  lastY = (e.clientY - originY) / scale;
});

canvas.addEventListener("mousemove", (e) => {
  if (!isDrawing) return;
  ctx.lineWidth = document.getElementById("sizePicker").value;
  ctx.strokeStyle = document.getElementById("colorPicker").value;
  ctx.lineCap = "round";

  ctx.beginPath();
  ctx.moveTo(lastX, lastY);
  const newX = (e.clientX - originX) / scale;
  const newY = (e.clientY - originY) / scale;
  ctx.lineTo(newX, newY);
  ctx.stroke();

  lastX = newX;
  lastY = newY;
});

canvas.addEventListener("mouseup", () => {
  isDrawing = false;
});
canvas.addEventListener("mouseout", () => {
  isDrawing = false;
});

document.getElementById("clearBtn").addEventListener("click", () => {
  ctx.clearRect(-originX / scale, -originY / scale, canvas.width / scale, canvas.height / scale);
});

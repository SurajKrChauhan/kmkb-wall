const canvas = document.getElementById("drawCanvas");
const ctx = canvas.getContext("2d");
resize();

window.addEventListener('resize', resize);

function resize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

let drawing = false;

canvas.addEventListener("mousedown", start);
canvas.addEventListener("touchstart", start, {passive: false});

canvas.addEventListener("mouseup", stop);
canvas.addEventListener("mouseout", stop);
canvas.addEventListener("touchend", stop);

canvas.addEventListener("mousemove", draw);
canvas.addEventListener("touchmove", drawTouch, {passive: false});

function start(e) {
  drawing = true;
  ctx.beginPath();
  ctx.moveTo(getX(e), getY(e));
  e.preventDefault();
}

function stop(e) {
  drawing = false;
  ctx.beginPath();
  e.preventDefault();
}

function draw(e) {
  if (!drawing) return;
  ctx.lineWidth = 3;
  ctx.lineCap = "round";
  ctx.strokeStyle = "#000";

  ctx.lineTo(getX(e), getY(e));
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(getX(e), getY(e));
  e.preventDefault();
}

function drawTouch(e) {
  if (!drawing) return;
  const touch = e.touches[0];
  draw(touch);
}

function getX(e) {
  return e.clientX || e.touches[0].clientX;
}

function getY(e) {
  return e.clientY || e.touches[0].clientY;
}

document.getElementById("clearBtn").addEventListener("click", () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
});

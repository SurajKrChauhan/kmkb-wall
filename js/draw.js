const bgCanvas = document.getElementById("bgCanvas"); const drawCanvas = document.getElementById("drawCanvas"); const logoCanvas = document.getElementById("logoCanvas"); const bgCtx = bgCanvas.getContext("2d"); const drawCtx = drawCanvas.getContext("2d"); const logoCtx = logoCanvas.getContext("2d");

let zoom = 1; let maxZoom = 500; let isDrawing = false; let lastX, lastY;

const wallWidth = 5000; const wallHeight = 5000; const logoImage = new Image(); logoImage.src = "assets/PKMKB.png";

function resizeAll() { [bgCanvas, drawCanvas, logoCanvas].forEach(canvas => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; }); drawBackground(); drawLogo(); updateZoomText(); }

function drawBackground() { bgCtx.setTransform(zoom, 0, 0, zoom, 0, 0); bgCtx.clearRect(0, 0, bgCanvas.width / zoom, bgCanvas.height / zoom);

bgCtx.fillStyle = "#ffffff"; bgCtx.fillRect(0, 0, wallWidth, wallHeight);

bgCtx.strokeStyle = "#000"; bgCtx.lineWidth = 10; bgCtx.strokeRect(0, 0, wallWidth, wallHeight); }

function drawLogo() { logoCtx.clearRect(0, 0, logoCanvas.width, logoCanvas.height); const centerX = logoCanvas.width / 2 - 100; const centerY = logoCanvas.height / 2 - 100; logoCtx.drawImage(logoImage, centerX, centerY, 200, 200); }

function updateZoomText() { document.getElementById("zoom-info").textContent = Zoom: ${Math.floor(zoom)}x; }

function getMousePos(e) { const rect = drawCanvas.getBoundingClientRect(); return { x: (e.clientX - rect.left) / zoom, y: (e.clientY - rect.top) / zoom }; }

function isInsideWall(x, y) { return x >= 0 && y >= 0 && x <= wallWidth && y <= wallHeight; }

// Zoom with mouse wheel drawCanvas.addEventListener("wheel", (e) => { e.preventDefault(); const delta = e.deltaY < 0 ? 10 : -10; zoom = Math.min(Math.max(zoom + delta, 1), maxZoom); drawBackground(); updateZoomText(); });

// Drawing Events drawCanvas.addEventListener("mousedown", (e) => { if (zoom < maxZoom) return; const pos = getMousePos(e); if (!isInsideWall(pos.x, pos.y)) return; isDrawing = true; lastX = pos.x; lastY = pos.y; });

drawCanvas.addEventListener("mousemove", (e) => { if (!isDrawing || zoom < maxZoom) return; const pos = getMousePos(e); if (!isInsideWall(pos.x, pos.y)) return;

drawCtx.setTransform(zoom, 0, 0, zoom, 0, 0); drawCtx.strokeStyle = "#000000"; drawCtx.lineWidth = 2; drawCtx.lineCap = "round";

drawCtx.beginPath(); drawCtx.moveTo(lastX, lastY); drawCtx.lineTo(pos.x, pos.y); drawCtx.stroke();

lastX = pos.x; lastY = pos.y; });

drawCanvas.addEventListener("mouseup", () => isDrawing = false); drawCanvas.addEventListener("mouseout", () => isDrawing = false);

window.addEventListener("resize", resizeAll); logoImage.onload = () => { resizeAll(); };


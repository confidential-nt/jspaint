const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");
const colors = document.getElementsByClassName("jsColor");
const range = document.getElementById("jsRange");
const mode = document.getElementById("jsMode");
const save = document.getElementById("jsSave");

const DEFAULT_COLOR = "#2c2c2c";
const DEFAULT_SIZE = 700;

canvas.width = DEFAULT_SIZE;
canvas.height = DEFAULT_SIZE;

ctx.fillStyle = "#fff";
ctx.fillRect(0, 0, DEFAULT_SIZE, DEFAULT_SIZE);

ctx.strokeStyle = DEFAULT_COLOR;
ctx.fillStyle = DEFAULT_COLOR;
ctx.lineWidth = 2.5;

let painting = false;

let filling = false;

function handleColorChange(event) {
  const color = event.target.style.backgroundColor;
  ctx.strokeStyle = color;
  ctx.fillStyle = color;
}

function handleRangeChange(event) {
  const size = event.target.value;
  ctx.lineWidth = size;
}

function handleChangeMode() {
  if (filling === false) {
    filling = true;
    mode.innerText = "paint";
  } else {
    filling = false;
    mode.innerText = "fill";
  }
}

function handleFill() {
  if (filling) {
    stopPainting();
    ctx.fillRect(0, 0, DEFAULT_SIZE, DEFAULT_SIZE);
  }
}

function handleCM(event) {
  event.preventDefault();
}

function handleSave() {
  const image = canvas.toDataURL("image/png");
  const link = document.createElement("a");
  link.href = image;
  link.download = "paintJS";
  link.click();
}

function stopPainting() {
  painting = false;
}

function startPainting() {
  painting = true;
}

function onMouseMove(event) {
  const x = event.offsetX;
  const y = event.offsetY;
  if (!painting) {
    ctx.beginPath();
    ctx.moveTo(x, y);
  } else {
    ctx.lineTo(x, y);
    ctx.stroke();
  }
}

if (canvas) {
  canvas.addEventListener("mousemove", onMouseMove);
  canvas.addEventListener("mousedown", startPainting);
  canvas.addEventListener("mouseup", stopPainting);
  canvas.addEventListener("mouseleave", stopPainting);
  canvas.addEventListener("click", handleFill);
  canvas.addEventListener("contextmenu", handleCM);
}

Array.from(colors).forEach((color) =>
  color.addEventListener("click", handleColorChange)
);

if (range) {
  range.addEventListener("input", handleRangeChange);
}

if (mode) {
  mode.addEventListener("click", handleChangeMode);
}

if (save) {
  save.addEventListener("click", handleSave);
}

function handleMQ(query) {
  if (query.matches) {
    canvas.width = 500;
    canvas.height = 500;
  } else {
    canvas.width = 700;
    canvas.height = 700;
  }
}

const query = window.matchMedia("(max-width: 568px)");
handleMQ(query);
query.addListener(handleMQ);

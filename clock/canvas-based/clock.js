function fillCircle(radius, color) {
  ctx.beginPath();
  ctx.arc(canvas.width / 2, canvas.height / 2, radius * factor, 0, 2 * Math.PI);
  ctx.closePath();
  ctx.fillStyle = color;
  ctx.fill();
}

function fillAndRotateRoundRect(width, height, angle, deltaY, color, rounded) {
  width *= factor;
  height *= factor;
  deltaY *= factor;
  const x = canvas.width / 2;
  const y = canvas.height / 2;
  const radius = width / 2;
  const left = x - radius;
  const top = y + radius + (deltaY ? deltaY : 0);

  ctx.save();
  ctx.translate(x, y);
  ctx.rotate((angle * Math.PI) / 180);
  ctx.translate(-x, -y);
  ctx.fillStyle = color || "white";

  if (rounded) {
    ctx.beginPath();
    ctx.arc(left + radius, top, radius, Math.PI, 0, true);
    ctx.lineTo(left + width, top - height);
    ctx.arc(left + radius, top - height, radius, 0, Math.PI, true);
    ctx.lineTo(left, top);
    ctx.closePath();
    ctx.fill();
  } else {
    ctx.fillRect(left, top, width, -height);
  }

  ctx.restore();
}

function positionText(text, fontSize, radius, angleUnit, color, prefix) {
  fontSize *= factor;
  radius *= factor;
  const x = canvas.width / 2;
  const y = canvas.height / 2;
  const radians = (text * angleUnit * Math.PI) / 180;
  const delta = 4;
  ctx.font = `${fontSize}px sans-serif`;
  ctx.fillStyle = color || "white";
  ctx.fillText(
    text < 10 ? prefix + text : text,
    x - fontSize / 2 - delta + radius * Math.sin(radians),
    y + fontSize / 2 - delta - radius * Math.cos(radians)
  );
}

function draw(angleHour, angleMinute, angleSecond) {
  // clear canvas
  canvas.height = canvas.height;

  // scale line
  for (let i = 1; i <= 60; i++) {
    if (i % 5 != 0) {
      fillAndRotateRoundRect(3, 30, i * 6, 300, "rgba(255, 255, 255, 0.3)");
    } else {
      positionText(i, 35, 285, 6, "white", "0");
    }
  }

  // scale text
  for (let i = 1; i <= 12; i++) positionText(i, 70, 220, 30, "white", " ");

  // circle large
  fillCircle(9, "white");

  // hour
  fillAndRotateRoundRect(4, 40, angleHour);
  fillAndRotateRoundRect(16, 130, angleHour, -50, "white", true);

  // minute
  fillAndRotateRoundRect(4, 40, angleMinute);
  fillAndRotateRoundRect(16, 210, angleMinute, -50, "white", true);

  // circle medium
  fillCircle(6, "#fa9f22");

  // second
  fillAndRotateRoundRect(4, 343, angleSecond, 40, "#fa9f22");

  // circle small
  fillCircle(3, "black");
}

function animate() {
  const time = new Date();
  const secondsPassedToday =
    time.getHours() * 3600 +
    time.getMinutes() * 60 +
    time.getSeconds() +
    Math.round(time.getMilliseconds() / 1000);
  draw(
    (secondsPassedToday / 120) % 360,
    (secondsPassedToday / 10) % 360,
    (secondsPassedToday * 6) % 360
  );
}

function resize() {
  function update() {
    const width = Math.min(window.innerHeight, window.innerWidth);
    canvas.height = canvas.width = width;
    window.factor = width / 2 / 320;
    animate();
  }
  update();
  window.addEventListener("resize", update);
}

const canvas = document.querySelector(".clock");
const ctx = canvas.getContext("2d");

resize();
setInterval(animate, 1000);

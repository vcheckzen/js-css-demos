function resize() {
  function update() {
    const width = Math.min(window.innerHeight, window.innerWidth);
    clockElem.style.transform = `scale(${width / 2 / 320})`;
  }
  window.addEventListener("resize", update);
}

function rotate(elem, scale, factor) {
  elem.style.transform = `rotate(${(scale * factor) % 360}deg)`;
}

function position(elem, r, scale, factor) {
  const radian = ((scale * factor) / 180) * Math.PI;
  const dx = r * Math.sin(radian);
  const dy = -r * Math.cos(radian);
  elem.style = `left: ${dx}px; top: ${dy}px`;
}

function drawScale(second) {
  function line() {
    const elem = document.createElement("div");
    elem.className = "scale-line center";
    wrapper.append(elem);
    rotate(wrapper, second, 6);
  }

  function text() {
    const wrap = () => (second < 10 ? "0" : "") + second;
    const elem = document.createElement("div");
    elem.className = "scale-text center";
    elem.innerHTML = wrap(second);
    wrapper.append(elem);
    position(elem, 283.5, second, 6);
  }

  const wrapper = document.createElement("div");
  wrapper.className = "scale";
  second % 5 == 0 ? text() : line();
  scaleElem.append(wrapper);
}

function drawHour(hour) {
  const wrapper = document.createElement("div");
  wrapper.className = "scale";
  const elem = document.createElement("div");
  elem.className = `hour-text hour-${hour} center`;
  elem.innerHTML = hour;
  position(elem, 220, hour, 30);
  wrapper.append(elem);
  scaleElem.append(wrapper);
}

function animate() {
  const time = new Date();
  const secondsPassedToday =
    time.getHours() * 3600 +
    time.getMinutes() * 60 +
    time.getSeconds() +
    Math.round(time.getMilliseconds() / 1000);
  rotate(hourElem, secondsPassedToday / 120, 1);
  rotate(minuteElem, secondsPassedToday / 10, 1);
  rotate(secondElem, secondsPassedToday, 6);
}

const clockElem = document.querySelector(".clock");
const scaleElem = document.querySelector(".scale");
const hourElem = document.querySelector(".hour");
const minuteElem = document.querySelector(".minute");
const secondElem = document.querySelector(".second");
for (let i = 1; i <= 60; i++) drawScale(i);
for (let i = 1; i <= 12; i++) drawHour(i);
resize();

setInterval(animate, 1000);

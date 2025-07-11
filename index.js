const hoursElem = document.getElementById("hours");
const minutesElem = document.getElementById("minutes");
const dayElem = document.getElementById("day");
const dateElem = document.getElementById("date");
const circle = document.querySelector(".progress-ring__circle");
const body = document.body;
const monthElem = document.getElementById("month");
const ampmElem = document.getElementById("ampm");

const RADIUS = circle.r.baseVal.value;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

circle.style.strokeDasharray = `${CIRCUMFERENCE} ${CIRCUMFERENCE}`;
circle.style.strokeDashoffset = `${CIRCUMFERENCE}`;

function animateFlip(elem, newValue) {
    const span = elem.querySelector("span");
    if (span.textContent !== newValue) {
        span.textContent = newValue;
        elem.classList.remove("animate");
        void elem.offsetWidth;
        elem.classList.add("animate");
    }
}

function updateClock() {
    const now = new Date();
    let hours = now.getHours();
    const minutes = now.getMinutes().toString().padStart(2, "0");
    const seconds = now.getSeconds();

    const ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12 || 12;
    hours = hours.toString().padStart(2, "0");
    animateFlip(document.querySelector(".flip:nth-child(1)"), hours);
    animateFlip(document.querySelector(".flip:nth-child(3)"), minutes);
    hoursElem.textContent = hours;
    minutesElem.textContent = minutes;
    ampmElem.textContent = ampm;

    const days = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
    const months = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];

    dayElem.textContent = days[now.getDay()];
    dateElem.textContent = now.getDate().toString().padStart(2, "0");
    monthElem.textContent = months[now.getMonth()];

    const offset = CIRCUMFERENCE - (seconds / 60) * CIRCUMFERENCE;
    circle.style.strokeDashoffset = offset;
}

function toggleTheme() {
    body.classList.toggle("light-mode");
}

setInterval(updateClock, 1000);
updateClock();

const audio = document.getElementById("background-audio");
const musicBtn = document.getElementById("music-btn");
let isPlaying = false;

function toggleMusic() {
    if (isPlaying) {
        audio.pause();
        musicBtn.style.opacity = "0.4"; 
    } else {
        audio.play();
        musicBtn.style.opacity = "1";
    }
    isPlaying = !isPlaying;
}


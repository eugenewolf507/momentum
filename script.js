// === DOM Elements
const time = document.querySelector(".time"),
  date = document.querySelector(".date"),
  greeting = document.querySelector(".greeting"),
  name = document.querySelector(".name"),
  focus = document.querySelector(".focus"),
  nextImgButton = document.querySelector(".nextImgButton"),
  imageBaseUrl = "./assets/images/";

// === Service variable
// currentImageIndex is used to show next image with nextImgButton
let currentImageIndex = undefined;

// === Random Integer for image array
function randomInteger(min, max) {
  let rand = min - 0.5 + Math.random() * (max - min + 1);
  return Math.round(rand);
}

// === Set image array
function setImageArr() {
  let arr = [];
  const dayPeriodArr = ["night", "morning", "day", "evening"];
  for (const dayPeriod of dayPeriodArr) {
    for (let i = 0; i <= 5; i++) {
      arr.push(`${dayPeriod}/${addZero(randomInteger(1, 20))}`);
    }
  }
  return arr;
}

const imageArr = setImageArr();

// === Show Image
function showImage() {
  let today = new Date(),
    hour = today.getHours();
  document.body.style.backgroundImage = `url('${imageBaseUrl}${imageArr[hour]}.jpg')`;
  currentImageIndex = hour;
}

// === Show Next Image
function showNextImage() {
  currentImageIndex += 1;
  if (currentImageIndex > 23) currentImageIndex = 1;
  console.log(
    `currentImageIndex = ${currentImageIndex}; imageArr[currentImageIndex] = ${imageArr[currentImageIndex]}`
  );

  // new version with smooth image change
  const body = document.querySelector("body");
  const src = `${imageBaseUrl}${imageArr[currentImageIndex]}.jpg`;
  const img = document.createElement("img");
  img.src = src;
  img.onload = () => {
    body.style.backgroundImage = `url(${src})`;
  };

  // old version without smooth image change
  // document.body.style.backgroundImage = `url('${imageBaseUrl}${imageArr[currentImageIndex]}.jpg')`;
}

// *** SHOW TIME AND DATE AND GREETING START ***
// === Show Time
function showTime() {
  let today = new Date(),
    hour = today.getHours(),
    min = today.getMinutes(),
    sec = today.getSeconds();
  // Output Time
  time.innerHTML = `${hour}:${addZero(min)}:${addZero(sec)} `;

  // Show next image or change greet
  if (min === 0 && sec === 0) {
    if (hour === 0 || hour === 6 || hour === 12 || hour === 18) {
      setGreet();
    }
    showImage();
  }

  setTimeout(showTime, 1000);
}

// === Show Day
function showDay() {
  let today = new Date();

  const options = {
    weekday: "long",
    month: "long",
    day: "numeric",
  };

  // use USA location just for English day of week
  const localeUs = today.toLocaleString("en-US", options);
  date.innerHTML = localeUs;
}

// === Add Zeros
function addZero(n) {
  return (parseInt(n, 10) < 10 ? "0" : "") + n;
}

// === Set Greeting
function setGreet() {
  let today = new Date(),
    hour = today.getHours();
  if (hour < 6) {
    greeting.textContent = "Good Night, ";
  } else if (hour < 12) {
    greeting.textContent = "Good Morning, ";
  } else if (hour < 18) {
    greeting.textContent = "Good Afternoon, ";
  } else {
    greeting.textContent = "Good Evening, ";
  }
}

// *** SHOW TIME AND DATE AND GREETING END ***

// *** NAME START ***

// === Get Name
function getName() {
  if (localStorage.getItem("name") === null) {
    name.textContent = "[Enter Name]";
  } else {
    name.textContent = localStorage.getItem("name");
  }
}

// ==== Set Name
function setName(e) {
  if (e.type === "keypress") {
    // Make sure enter is pressed
    if (e.which == 13 || e.keyCode == 13) {
      if (e.target.innerText !== "") {
        localStorage.setItem("name", e.target.innerText);
        name.blur();
      } else {
        e.target.innerText = localStorage.getItem("name");
        name.blur();
      }
    }
  } else {
    if (e.target.innerText === "" || e.target.innerText === "[Enter Name]") {
      if (localStorage.getItem("name") === null) {
        e.target.innerText = "[Enter Name]";
      } else {
        e.target.innerText = localStorage.getItem("name");
      }
    } else {
      localStorage.setItem("name", e.target.innerText);
    }
  }
}

// === Clean Name Template
function cleanNameTemplate() {
  name.textContent = "";
}

// *** NAME END ***

// *** FOCUS START ***
// === Get Focus
function getFocus() {
  if (localStorage.getItem("focus") === null) {
    focus.textContent = "[Enter Focus]";
  } else {
    focus.textContent = localStorage.getItem("focus");
  }
}

// === Set Focus
function setFocus(e) {
  if (e.type === "keypress") {
    // Make sure enter is pressed
    if (e.which == 13 || e.keyCode == 13) {
      if (e.target.innerText !== "") {
        localStorage.setItem("focus", e.target.innerText);
        focus.blur();
      } else {
        e.target.innerText = localStorage.getItem("focus");
        focus.blur();
      }
    }
  } else {
    if (e.target.innerText === "" || e.target.innerText === "[Enter Focus]") {
      if (localStorage.getItem("focus") === null) {
        e.target.innerText = "[Enter Focus]";
      } else {
        e.target.innerText = localStorage.getItem("focus");
      }
    } else {
      localStorage.setItem("focus", e.target.innerText);
    }
  }
}

// === Clean Focus Template
function cleanFocusTemplate() {
  focus.textContent = "";
}

// *** FOCUS END ***

// === Event Listeners
name.addEventListener("keypress", setName);
name.addEventListener("blur", setName);
name.addEventListener("focus", cleanNameTemplate);
nextImgButton.addEventListener("click", showNextImage);
focus.addEventListener("keypress", setFocus);
focus.addEventListener("blur", setFocus);
focus.addEventListener("focus", cleanFocusTemplate);

// === Run
setGreet();
showImage();
showTime();
showDay();
getName();
getFocus();

// === QUOTE
const blockquote = document.querySelector("blockquote");
const figcaption = document.querySelector("figcaption");
const quoteBtn = document.querySelector(".quote__btn");

async function getQuote() {
  const url = `https://programming-quotes-api.herokuapp.com/quotes/random`;
  const res = await fetch(url);
  const data = await res.json();
  blockquote.textContent = data.en;
  figcaption.textContent = data.author;
}
document.addEventListener("DOMContentLoaded", getQuote);
quoteBtn.addEventListener("click", getQuote);

// *** WEATHER START ***
const weatherIcon = document.querySelector(".weather-icon"),
  temperature = document.querySelector(".temperature"),
  weatherDescription = document.querySelector(".weather-description"),
  feels_like = document.querySelector(".feels_like"),
  humidity = document.querySelector(".humidity"),
  pressure = document.querySelector(".pressure"),
  wind_speed = document.querySelector(".wind_speed"),
  wind_deg = document.querySelector(".wind_deg"),
  city = document.querySelector(".city"),
  weatherAPIKey = "777af4cdd3fc4fb54dc3e102fea5c980",
  weatherLanguage = "en";

async function getWeather() {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city.textContent}&lang=${weatherLanguage}&appid=${weatherAPIKey}&units=metric`;
  const res = await fetch(url);
  let data = null;
  if (res.ok) {
    data = await res.json();
  } else {
    console.log("Error HTTP: " + res.status);
    city.textContent = "Error: [Enter a valid city name]";
    temperature.textContent = "";
    weatherDescription.textContent = "";
    humidity.textContent = "";
    pressure.textContent = "";
    wind_speed.textContent = "";
  }

  weatherIcon.className = "weather-icon owf";
  weatherIcon.classList.add(`owf-${data.weather[0].id}`);
  temperature.textContent = `${Math.round(
    data.main.temp
  )}°C feels like ${Math.round(data.main.feels_like)}°C`;
  weatherDescription.textContent = data.weather[0].description;
  humidity.textContent = `${Math.round(data.main.humidity)} %`;
  pressure.textContent = `${Math.round(data.main.pressure)} hPa (${Math.round(
    data.main.pressure / 1.333
  )} mmHg)`;
  wind_speed.textContent = `${Math.round(data.wind.speed)} m/s`;
  // wind_deg.textContent = `${Math.round(data.wind.deg)}deg`;
  // maybe later I will draw wind direction

  // get weather once in 10 minutes
  setTimeout(showTime, 600000);
}

// === Get City
function getCity() {
  if (localStorage.getItem("city") === null) {
    city.textContent = "[Enter City]";
  } else {
    city.textContent = localStorage.getItem("city");
    getWeather();
  }
}

// === Set City
function setCity(e) {
  if (e.type === "keypress") {
    // Make sure enter is pressed
    if (e.which == 13 || e.keyCode == 13) {
      if (e.target.innerText !== "") {
        localStorage.setItem("city", e.target.innerText);
        getWeather();
        city.blur();
      } else {
        e.target.innerText = localStorage.getItem("city");
        city.blur();
      }
    }
  } else {
    if (e.target.innerText === "" || e.target.innerText === "[Enter City]") {
      e.target.innerText = localStorage.getItem("city");
    } else {
      localStorage.setItem("city", e.target.innerText);
      getWeather();
    }
  }
}

// === Clean City Template
function cleanCityTemplate() {
  city.textContent = "";
}

// document.addEventListener("DOMContentLoaded", getWeather);
city.addEventListener("keypress", setCity);
city.addEventListener("blur", setCity);
city.addEventListener("focus", cleanCityTemplate);
getCity();

// *** WEATHER END ***

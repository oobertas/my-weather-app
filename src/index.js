
//let axios = require("axios").default;
let n = new Date();
let y = n.getFullYear();
let m = n.getMonth() + 1;
let d = n.getDate();
let wd = n.getDay();
let currentTime = `${n.getHours()}:${n.getMinutes()}`;
let months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
document.getElementById("date").innerHTML = `🗓 ${months[m]} ${d}, ${y} `;
document.querySelector(".day").innerHTML = `${days[wd]} ${currentTime}`;

//background changes according to the time of the day

if (document.body) {
  if (7 <= currentTime && currentTime < 20) {
    document.body.background =
      "media/day.jpg";
  } else {
    document.body.background =
      "https://images.unsplash.com/photo-1515166162498-25562df50839?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=80";
  }
}

function displayWeather(response) {
  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector("#temp").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#description").innerHTML =
    response.data.weather[0].main;
}

function citySearch(city) {
  let apiKey = "554c41227aff1009c4a80ad1aa690508";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeather);
}

function replaceCity(event) {
  event.preventDefault();
  let city = document.querySelector("#search").value;
  citySearch(city);
}
function searchLocation(position) {
  let apiKey = "554c41227aff1009c4a80ad1aa690508";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayWeather);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

let searchForm = document.querySelector("#searchForm");
searchForm.addEventListener("submit", replaceCity);

let currentLocationButton = document.querySelector("#current");
currentLocationButton.addEventListener("click", getCurrentLocation);

citySearch("New York");

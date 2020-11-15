
let n = new Date();
let y = n.getFullYear();
let m = n.getMonth();
let d = n.getDate();
let wd = n.getDay();

function addZero(timeUnit){
  let final = timeUnit;
  if(final<10){
    final=`0${timeUnit}`;
  }
  return final;
}
let currentTime = `${addZero(n.getHours())}:${addZero(n.getMinutes())}`;


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

document.getElementById("date").innerHTML = `🗓 ${months[m]} ${d},${y}`;
document.querySelector(".day").innerHTML = `${days[wd]}`;
document.getElementById("time").innerHTML = ` ${currentTime}`;
//weekdays
document.querySelector(".day1").innerHTML = `${days[wd+1]}`;
document.querySelector(".day2").innerHTML = `${days[wd+2]}`;
document.querySelector(".day3").innerHTML = `${days[wd+3]}`;
document.querySelector(".day4").innerHTML = `${days[wd+4]}`;
document.querySelector(".day5").innerHTML = `${days[wd+5]}`;
document.querySelector(".day6").innerHTML = `${days[wd+6]}`;
//background changes according to the time of the day

if (document.body) {
  if (7 <= n.getHours() && n.getHours() < 20) {
    document.body.background =
      "https://images.unsplash.com/photo-1570378114504-ce4aedae3ddd?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2250&q=80";
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

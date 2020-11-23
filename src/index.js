
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
  document.querySelector("#temp").innerHTML = Math.round(response.data.main.temp);
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(response.data.wind.speed);
  document.querySelector("#icon-main").src=`media/${response.data.weather[0].main}.png`;
  celsiusTemp=response.data.main.temp;
}

function forecastWeather(array,day){
    let nextday = new Date();
    nextday.setDate(nextday.getDate() + day);
    document.querySelector(`.day${day}`).innerHTML = `${days[nextday.getDay()]}`;
    let nextdate = `${nextday.getFullYear()}-${nextday.getMonth() + 1}-${nextday.getDate()}`;
    
  for(let i=0;i<array.length;i++){
   if(array[i].dt_txt === `${nextdate} 03:00:00`){
     document.querySelector(`.temp${day}`).innerHTML = `${Math.round(array[i].main.temp)}°C`;
     document.querySelector(`.img${day}`).src=`media/${array[i].weather[0].main}.png`;
     celsiusTempAll[day]=array[i].main.temp;
   }
  }
}

function displayForecast(response){
  forecastWeather(response.data.list,1);
  forecastWeather(response.data.list,2);
  forecastWeather(response.data.list,3);
  forecastWeather(response.data.list,4);
  forecastWeather(response.data.list,5);
}

function citySearch(city) {
  let apiKey = "554c41227aff1009c4a80ad1aa690508";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeather);

  apiUrl=`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
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

  apiUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

function convertToFahrenheit(event){
  event.preventDefault();
  let tempElement=document.getElementById("temp");
  celsius.classList.remove("active");
  fahrenheit.classList.add("active");
  let farengheitTemp = (celsiusTemp*9)/5+32;
  tempElement.innerHTML=Math.round(farengheitTemp);
  
  for(let i=1;i<=5;i++){
  let tempElementByDay=document.querySelector(`.temp${i}`);
  let newFarengheitTemp = (celsiusTempAll[i]*9)/5+32;
  tempElementByDay.innerHTML=`${Math.round(newFarengheitTemp)}°F`;
  }
}

function convertToCelsius(event){
  event.preventDefault();
  fahrenheit.classList.remove("active");
  celsius.classList.add("active");
  let tempElement=document.getElementById("temp");
  tempElement.innerHTML=Math.round(celsiusTemp);

  for(let i=1;i<=5;i++){
    let tempElementByDay=document.querySelector(`.temp${i}`);
    tempElementByDay.innerHTML=`${Math.round(celsiusTempAll[i])}°C`;
  }
}

let celsiusTemp = null;
let celsiusTempAll = [];

let searchForm = document.querySelector("#searchForm");
searchForm.addEventListener("submit", replaceCity);

let currentLocationButton = document.querySelector("#current");
currentLocationButton.addEventListener("click", getCurrentLocation);

citySearch("New York");

let fahrenheit = document.getElementById("fahrenheit");
fahrenheit.addEventListener("click", convertToFahrenheit);

let celsius = document.getElementById("celsius");
celsius.addEventListener("click", convertToCelsius);

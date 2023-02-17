function showDate() {
  let h6 = document.querySelector("h6");
  let now = new Date();
  let date = now.getDate();
  let year = now.getFullYear();

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[now.getDay()];

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
  let month = months[now.getMonth()];
  let hours = now.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = now.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  h6.innerHTML = `${day}, ${month} ${date}, ${year} - ${hours}:${minutes}`;
}
showDate();

function currentCityTemp(response) {
  document.querySelector("h1").innerHTML = response.data.name;
  celciusTemperature = response.data.main.temp;
  document.querySelector(".temperature").innerHTML =
    Math.round(celciusTemperature);

  document.querySelector("#description").innerHTML =
    response.data.weather[0].description;

  document.querySelector("#low-temp").innerHTML = Math.round(
    response.data.main.temp_min
  );
  document.querySelector("#high-temp").innerHTML = Math.round(
    response.data.main.temp_max
  );

  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  let iconElement = document.querySelector("#current-icon");
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);

  getForecast(response.data.coord);
}
function searchCity(city) {
  let apiKey = "5f472b7acba333cd8a035ea85a0d4d4c";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(currentCityTemp);
  console.log(apiUrl);
}
function search(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#city-input").value;
  document.querySelector("#city").innerHTML = cityInput;
  searchCity(cityInput.value);
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", search);

function getForecast(coordinates) {
  let apiKey = "5f472b7acba333cd8a035ea85a0d4d4c";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(currentCityTemp);
}
function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

let currentLocationButton = document.querySelector("#current-location-button");
currentLocationButton.addEventListener("click", getCurrentLocation);

function displayFahrheitTemp(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  celciusLink.classList.remove("temp-active");
  fahrenheitLink.classList.add("temp-active");
  let fahrenheitTemperature = (celciusTemperature * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
}

function displayCelciusTemp(event) {
  event.preventDefault();
  celciusLink.classList.add("temp-active");
  fahrenheitLink.classList.remove("temp-active");
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(celciusTemperature);
}
let celciusTemperature = null;

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrheitTemp);

let celciusLink = document.querySelector("#celcius-link");
celciusLink.addEventListener("click", displayCelciusTemp);

search("Munich");

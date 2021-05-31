function convertMinutes(inputMinutes) {
  if (inputMinutes < 10) {
    inputMinutes = `0${inputMinutes}`;
  }
  return inputMinutes;
}

function changeToFah() {
  let degree = document.querySelector("#header-degree");
  let headerTemp = document.querySelector("#header-temp");
  if (degree.innerHTML === "°C") {
    degree.innerHTML = "°F";
    let temperature = headerTemp.innerHTML;
    temperature = (temperature * 9) / 5 + 32;
    headerTemp.innerHTML = Math.round(temperature);
  }
}

function changeToCel() {
  let degree = document.querySelector("#header-degree");
  let headerTemp = document.querySelector("#header-temp");
  if (degree.innerHTML === "°F") {
    degree.innerHTML = "°C";
    let temperature = headerTemp.innerHTML;
    temperature = ((temperature - 32) * 5) / 9;
    headerTemp.innerHTML = Math.round(temperature);
  }
}

function getCurrentLocal() {
  navigator.geolocation.getCurrentPosition(function (position) {
    console.log(position);
    let lat = position.coords.latitude;
    let lon = position.coords.longitude;

    let degreeUnit = "metric";
    let currentDegree = document.querySelector("#header-degree").innerHTML;
    if (currentDegree === "°C") {
      degreeUnit = "metric";
    } else {
      degreeUnit = "imperial";
    }

    let apiKey = "cb9c7365e24a5b0ca2daf7074587f771";

    let latLonCall = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=${degreeUnit}&appid=${apiKey}`;
    console.log(latLonCall);

    axios.get(latLonCall).then(function (response) {
      console.log(response);
      let displayedCity = document.querySelector("#header-location");
      displayedCity.innerHTML = response.data.name;

      let headerTemp = document.querySelector("#header-temp");
      headerTemp.innerHTML = Math.round(response.data.main.temp);

      let headerCond = document.querySelector("#header-condition");
      headerCond.innerHTML = response.data.weather[0].main.toLowerCase();

      let humidity = response.data.main.humidity;
      let windSpeed = Math.round(response.data.wind.speed);

      let extraInfo = document.querySelector("#header-extra-info");
      extraInfo.innerHTML = `Humidity: ${humidity}%, Wind: ${windSpeed} km/h`;
    });
  });
}

function displayCity(event) {
  event.preventDefault();
  let degreeUnit = "metric";

  let currentDegree = document.querySelector("#header-degree").innerHTML;
  if (currentDegree === "°C") {
    degreeUnit = "metric";
  } else {
    degreeUnit = "imperial";
  }

  let apiKey = "cb9c7365e24a5b0ca2daf7074587f771";
  let cityName = document.querySelector("#inserted-city").value;

  let cityCall = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=${degreeUnit}&appid=${apiKey}`;
  console.log(cityCall);

  axios.get(cityCall).then(function (response) {
    console.log(response);
    let displayedCity = document.querySelector("#header-location");
    displayedCity.innerHTML = response.data.name;

    let headerTemp = document.querySelector("#header-temp");
    headerTemp.innerHTML = Math.round(response.data.main.temp);

    let headerCond = document.querySelector("#header-condition");
    headerCond.innerHTML = response.data.weather[0].main.toLowerCase();

    let humidity = response.data.main.humidity;
    let windSpeed = Math.round(response.data.wind.speed);

    let extraInfo = document.querySelector("#header-extra-info");
    extraInfo.innerHTML = `Humidity: ${humidity}%, Wind: ${windSpeed} km/h`;
  });
}

getCurrentLocal();

let week = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

let today = new Date();
let hourSite = document.querySelector("#current-day-hour");
hourSite.innerHTML = `${today.getHours()}:${convertMinutes(
  today.getMinutes()
)} ${week[today.getDay()]}`;

let citySearch = document.querySelector("#search-city-form");
citySearch.addEventListener("submit", displayCity);

let celButton = document.querySelector("#to-celsius");
let fahButton = document.querySelector("#to-fahrenheit");
fahButton.addEventListener("click", changeToFah);
celButton.addEventListener("click", changeToCel);

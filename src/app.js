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
function populateWeekDays() {
  let today = new Date();
  let week = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let weekDay = today.getDay();

  let i = 1;
  while (i < 6) {
    weekDay = weekDay + 1;
    if (weekDay === 7) {
      weekDay = 0;
    }

    let forecastWeek = document.querySelector(`#week-${i}`);
    forecastWeek.innerHTML = week[weekDay];
    i++;
  }
}

function getCurrentLocal() {
  navigator.geolocation.getCurrentPosition(function (position) {
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
    let dailyForecastUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=${degreeUnit}&exclude=hourly,minutely&appid=${apiKey}`;
    console.log(dailyForecastUrl);
    axios.get(latLonCall).then(function (response) {
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
    axios.get(dailyForecastUrl).then(function (response) {
      console.log(response);

      let dailyForecast = 0;
      let i = 1;
      while (i < 6) {
        dailyForecast = dailyForecast + 1;

        let forecastTemps = document.querySelector(`#temps-${i}`);
        forecastTemps.innerHTML = `max: ${Math.round(
          response.data.daily[i].temp.max
        )} min: ${Math.round(response.data.daily[i].temp.min)}`;

        let forecastCondition = document.querySelector(`#condition-${i}`);
        forecastCondition.innerHTML = response.data.daily[i].weather[0].main;

        i++;
      }
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

  axios.get(cityCall).then(function (response) {
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

let currentLocal = document.querySelector("#current-place");
currentLocal.addEventListener("click", getCurrentLocal);

populateWeekDays();

//let hhhhhhhh = `https://api.openweathermap.org/data/2.5/onecall?lat=33.44&lon=-94.04&exclude=hourly,minutely&units=metric&appid=cb9c7365e24a5b0ca2daf7074587f771`;

//console.log(axios.get(hhhhhhhh));

//       <div class="col-6" id="temps-1">max: 30 min: 20</div>
//     <div class="col-4" id="condition-1">🌞 Ensolarado</div>

//To avoid time displaying as 12:1
function convertMinutes(inputMinutes) {
  if (inputMinutes < 10) {
    inputMinutes = `0${inputMinutes}`;
  }
  return inputMinutes;
}

//Celsius/Fahrenheit convertion related functions

function convertCelsius(temperature) {
  temperature = Math.round(((temperature - 32) * 5) / 9);
  return temperature;
}

function convertFahrenheit(temperature) {
  temperature = Math.round((temperature * 9) / 5 + 32);
  return temperature;
}

function changeToFah() {
  let degree = document.querySelector("#header-degree");
  let headerTemp = document.querySelector("#header-temp");
  if (degree.innerHTML === "°C") {
    degree.innerHTML = "°F";
    let temperature = headerTemp.innerHTML;
    headerTemp.innerHTML = convertFahrenheit(temperature);

    let i = 1;
    while (i < 6) {
      let forecastMax = document.querySelector(`#max-${i}`);
      let tempMax = forecastMax.innerHTML;
      forecastMax.innerHTML = convertFahrenheit(tempMax);

      let forecastMin = document.querySelector(`#min-${i}`);
      let tempMin = forecastMin.innerHTML;
      forecastMin.innerHTML = convertFahrenheit(tempMin);

      i++;
    }
  }
}

function changeToCel() {
  let degree = document.querySelector("#header-degree");
  let headerTemp = document.querySelector("#header-temp");
  if (degree.innerHTML === "°F") {
    degree.innerHTML = "°C";
    let temperature = headerTemp.innerHTML;
    headerTemp.innerHTML = convertCelsius(temperature);

    let i = 1;
    while (i < 6) {
      let forecastMax = document.querySelector(`#max-${i}`);
      let tempMax = forecastMax.innerHTML;
      forecastMax.innerHTML = convertCelsius(tempMax);

      let forecastMin = document.querySelector(`#min-${i}`);
      let tempMin = forecastMin.innerHTML;
      forecastMin.innerHTML = convertCelsius(tempMin);

      i++;
    }
  }
}

//Populates the days of the week according to current date
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

//Gets current local and populates the current temperature and forecast accordingly
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

    //Getting current condition weather info
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

      let headerIcon = document.querySelector("#header-icon");
      headerIcon.innerHTML = `<img src = "http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png" alt = "${response.data.weather[0].main}" width="50" height="50"> ${response.data.weather[0].main}`;
    });

    //Getting forecast info
    axios.get(dailyForecastUrl).then(function (response) {
      let i = 1;
      while (i < 6) {
        let forecastMax = document.querySelector(`#max-${i}`);
        forecastMax.innerHTML = Math.round(response.data.daily[i].temp.max);

        let forecastMin = document.querySelector(`#min-${i}`);
        forecastMin.innerHTML = Math.round(response.data.daily[i].temp.min);

        let forecastCondition = document.querySelector(`#condition-${i}`);
        forecastCondition.innerHTML = `<img src = "http://openweathermap.org/img/wn/${response.data.daily[i].weather[0].icon}@2x.png" alt = "${response.data.daily[i].weather[0].main}" width="35" height="35"> ${response.data.daily[i].weather[0].main}`;

        i++;
      }
    });
  });
}

//Searchs inserted city in the API and shows its data
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

  //Gets current weather info
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

    //Gets forecast info
    let lat = response.data.coord.lat;
    let lon = response.data.coord.lon;
    let dailyForecastUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=${degreeUnit}&exclude=hourly,minutely&appid=${apiKey}`;
    axios.get(dailyForecastUrl).then(function (response) {
      let i = 1;
      while (i < 6) {
        let forecastMax = document.querySelector(`#max-${i}`);
        forecastMax.innerHTML = Math.round(response.data.daily[i].temp.max);

        let forecastMin = document.querySelector(`#min-${i}`);
        forecastMin.innerHTML = Math.round(response.data.daily[i].temp.min);

        let forecastCondition = document.querySelector(`#condition-${i}`);
        forecastCondition.innerHTML = `<img src = "http://openweathermap.org/img/wn/${response.data.daily[i].weather[0].icon}@2x.png" alt = "${response.data.daily[i].weather[0].main}" width="35" height="35"> ${response.data.daily[i].weather[0].main}`;

        i++;
      }
    });
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

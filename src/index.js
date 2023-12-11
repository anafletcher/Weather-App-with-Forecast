function refreshWeatherData(response) {
  let temperatureElement = document.querySelector("#temperature");
  let temperature = response.data.temperature.current;
  let cityHeaderInput = document.querySelector("#city-header");
  let conditionsElement = document.querySelector("#conditions");
  let humidityElement = document.querySelector("#humidity");
  let windSpeedElement = document.querySelector("#wind-speed");
  let timeElement = document.querySelector("#time");
  let iconElement = document.querySelector("#icon");

  let date = new Date(response.data.time * 1000);

  cityHeaderInput.innerHTML = response.data.city;

  timeElement.innerHTML = formatDate(date);
  conditionsElement.innerHTML = response.data.condition.description;
  humidityElement.innerHTML = `${response.data.temperature.humidity}%`;
  windSpeedElement.innerHTML = `${response.data.wind.speed}km/h`;
  temperatureElement.innerHTML = Math.round(temperature);
  iconElement.innerHTML = `<img src ="${response.data.condition.icon_url}" class="weather-app-icon"/>`;
}

function formatDate(date) {
  let minutes = date.getMinutes();
  let hours = date.getHours();

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  /*
  let backgoundBody = document.querySelector("#background");
  if (hours < 12) {
    backgoundBody.style.background = "lightblue";
  } else if (hours < 18) {
    backgoundBody.style.background = "orange";
  } else {
    backgoundBody.style.background = "darkblue";
  }
*/
  let day = days[date.getDay()];
  return `${day} ${hours}:${minutes}`;
}

function submitCity(event) {
  event.preventDefault();
  let searchFormInput = document.querySelector("#search-form-input");
  searchCity(searchFormInput.value);
}

function searchCity(city) {
  let apiKey = "f3c5613898a1043cbte4a77d8c1bcfo0";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(refreshWeatherData);
}

let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", submitCity);

searchCity("London");

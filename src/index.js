function displayWeather(response) {
  console.log("API Response:", response);
  if (response.data && response.data.temperature) {
    let city = response.data.city;
    let temperature = Math.round(response.data.temperature.current);
    let description = response.data.condition.description;
    let humidity = response.data.temperature.humidity;
    let windSpeed = Math.round(response.data.wind.speed);
    let iconUrl = response.data.condition.icon_url;

    let cityElement = document.querySelector("#current-city");
    let temperatureValueElement = document.querySelector(
      "#current-temperature-value",
    );
    let descriptionElement = document.querySelector("#weather-description");
    let humidityElement = document.querySelector("#humidity-value");
    let windElement = document.querySelector("#wind-speed-value");
    let iconElement = document.querySelector("#weather-icon");

    cityElement.innerHTML = city;
    temperatureValueElement.innerHTML = temperature;
    descriptionElement.innerHTML = description;
    humidityElement.innerHTML = humidity;
    windElement.innerHTML = windSpeed;

    iconElement.innerHTML = `<img src="${iconUrl}" class="current-temperature-icon" />`;
  } else {
    alert("City not found or API error! Check console.");
  }
}

function search(event) {
  event.preventDefault();
  let searchInputElement = document.querySelector("#search-input");
  let city = searchInputElement.value.trim();

  let currentDateElement = document.querySelector("#current-date");
  let currentDate = new Date();
  currentDateElement.innerHTML = formatDate(currentDate);

  let apiKey = "537bt8538b7390o44ab0546f79bedf4a";
  let units = "metric";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=${units}`;

  axios.get(apiUrl).then(displayWeather);
  searchInputElement.value = "";
}

function formatDate(date) {
  let minutes = date.getMinutes();
  let hours = date.getHours();
  let day = date.getDay();

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

  let formattedDay = days[day];
  return `${formattedDay} ${hours}:${minutes}`;
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", search);

let currentDateElement = document.querySelector("#current-date");
let currentDate = new Date();
currentDateElement.innerHTML = formatDate(currentDate);

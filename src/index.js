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

    getForecast(city);
  } else {
    alert("City not found or API error! Check console.");
  }
}

function handleSearchSubmit(event) {
  event.preventDefault();
  let searchInputElement = document.querySelector("#search-input");
  let city = searchInputElement.value.trim();

  if (city) {
    searchCity(city);
  }
  searchInputElement.value = "";
}

function formatDate(date) {
  let minutes = date.getMinutes();
  let hours = date.getHours();
  let day = date.getDay();

  if (minutes < 10) minutes = `0${minutes}`;
  if (hours < 10) hours = `0${hours}`;

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  return `${days[day]} ${hours}:${minutes}`;
}

function formatForecastDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[date.getDay()];
}

function searchCity(city) {
  let apiKey = "537bt8538b7390o44ab0546f79bedf4a";
  let units = "metric";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=${units}`;

  let currentDateElement = document.querySelector("#current-date");
  let currentDate = new Date();
  currentDateElement.innerHTML = formatDate(currentDate);

  axios.get(apiUrl).then(displayWeather);
}

function getForecast(city) {
  let apiKey = "537bt8538b7390o44ab0546f79bedf4a";
  let units = "metric";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=${units}`;

  axios.get(apiUrl).then(displayForecast);
}

function displayForecast(response) {
  let forecastElement = document.querySelector("#forecast");
  let forecastHtml = "";

  let forecastDays = response.data.daily;

  forecastDays.forEach(function (day, index) {
    if (index > 0 && index < 6) {
      let maxTemp = Math.round(day.temperature.maximum);
      let minTemp = Math.round(day.temperature.minimum);
      let iconUrl = day.condition.icon_url;
      let dayName = formatForecastDay(day.time);

      let maxColorClass = "";
      if (maxTemp > 25) {
        maxColorClass = "hot";
      } else {
        maxColorClass = "cold";
      }

      forecastHtml += `
        <div class="weather-forecast-day">
          <div class="weather-forecast-date">${dayName}</div>
          <img src="${iconUrl}" class="weather-forecast-icon" />
          <div class="weather-forecast-temperatures">
            <!-- Ось сюди додаємо ${maxColorClass} -->
            <span class="weather-forecast-temperature-max ${maxColorClass}"><strong>${maxTemp}°</strong></span>
            <span class="weather-forecast-temperature-min">${minTemp}°</span>
          </div>
        </div>
      `;
    }
  });

  forecastElement.innerHTML = forecastHtml;
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", handleSearchSubmit);

searchCity("Paris");

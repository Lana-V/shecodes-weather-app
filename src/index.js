function displayWeather(response) {
  console.log("API Response:", response);
  if (response.data && response.data.temperature) {
    let temperature = Math.round(response.data.temperature.current);
    let city = response.data.city;

    let cityElement = document.querySelector("#current-city");
    let temperatureValueElement = document.querySelector(
      ".current-temperature-value"
    );

    cityElement.innerHTML = city;
    temperatureValueElement.innerHTML = temperature;
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

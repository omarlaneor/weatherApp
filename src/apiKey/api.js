const apiKey = "bdb1b19748308daf15192f6310a6eead";

function getWeatherCoord(lat, lon) {
  return fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`
  )
    .then((res) => res - json())
    .then((data) => data);
}

function getWeather(place) {
  return fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${place}&units=metric&appid=${apiKey}`
  )
    .then((res) => res.json())
    .then((data) => data);
}

function getForecastCoord(lat, lon) {
  return fetch(
    `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`
  )
    .then((res) => res.json())
    .then((data) => data);
}

function getForecast(place) {
  return fetch(
    `https://api.openweathermap.org/data/2.5/forecast?q=${place}&units=metric&appid=${apiKey}`
  )
    .then((res) => res.json())
    .then((data) => data);
}

export { getWeatherCoord, getWeather, getForecastCoord, getForecast };

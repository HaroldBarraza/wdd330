const API_KEY = "6738c27b95e4688f259ccaa36ce445bb";
const BASE_URL = "http://api.openweathermap.org/data/2.5/";

async function getWeatherForecast() {
    const city = document.getElementById('city').value;
    const currentWeatherUrl = `${BASE_URL}weather?q=${city}&appid=${API_KEY}&units=metric&lang=es`;
    const forecastUrl = `${BASE_URL}forecast?q=${city}&appid=${API_KEY}&units=metric&lang=es`;

    try {
        const currentWeatherResponse = await fetch(currentWeatherUrl);
        const currentWeatherData = await currentWeatherResponse.json();

        const forecastResponse = await fetch(forecastUrl);
        const forecastData = await forecastResponse.json();

        displayCurrentWeather(currentWeatherData);
        displayHourlyWeather(forecastData);
        displayDailyWeather(forecastData);

    } catch (error) {
        console.error("Error fetching the weather data:", error);
    }
}

function displayCurrentWeather(data) {
    const currentWeatherContainer = document.getElementById('current-weather');
    currentWeatherContainer.innerHTML = `
        <div class="weather-item">
            <h2>Clima Actual</h2>
            <p>Temperatura: ${data.main.temp}°C</p>
            <p>Descripción: ${data.weather[0].description}</p>
            <p>Humedad: ${data.main.humidity}%</p>
            <p>Velocidad del Viento: ${data.wind.speed} m/s</p>
        </div>
    `;
}

function displayHourlyWeather(data) {
    const hourlyWeatherContainer = document.getElementById('hourly-weather');
    hourlyWeatherContainer.innerHTML = '<h2>Pronóstico por Hora</h2>';
    for (let i = 0; i < 6; i++) {
        const weather = data.list[i];
        const date = new Date(weather.dt * 1000);
        hourlyWeatherContainer.innerHTML += `
            <div class="weather-item">
                <h3>${date.getHours()}:00</h3>
                <p>Temperatura: ${weather.main.temp}°C</p>
                <p>Descripción: ${weather.weather[0].description}</p>
                <p>Humedad: ${weather.main.humidity}%</p>
                <p>Viento: ${weather.wind.speed} m/s</p>
            </div>
        `;
    }
}

function displayDailyWeather(data) {
    const dailyWeatherContainer = document.getElementById('daily-weather');
    dailyWeatherContainer.innerHTML = '<h2>Pronóstico Diario</h2>';
    const dailyData = data.list.filter(weather => weather.dt_txt.includes("12:00:00"));
    for (let i = 0; i < dailyData.length; i++) {
        const weather = dailyData[i];
        const date = new Date(weather.dt * 1000);
        dailyWeatherContainer.innerHTML += `
            <div class="weather-item">
                <h3>${date.toLocaleDateString('es-ES', { weekday: 'long', day: 'numeric', month: 'long' })}</h3>
                <p>Temperatura: ${weather.main.temp}°C</p>
                <p>Descripción: ${weather.weather[0].description}</p>
                <p>Humedad: ${weather.main.humidity}%</p>
                <p>Viento: ${weather.wind.speed} m/s</p>
            </div>
        `;
    }
}

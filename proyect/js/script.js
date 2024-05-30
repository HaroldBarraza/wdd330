const ApiKey = '6738c27b95e4688f259ccaa36ce445bb';

document.getElementById('search').addEventListener('click', () => {
    const city = document.getElementById('query').value;
    const unit = document.getElementById('unit').value;
    getWeatherDataByCity(city, unit);
});

document.getElementById('unit').addEventListener('change', () => {
    const city = document.getElementById('city').textContent;
    const unit = document.getElementById('unit').value;
    if (city !== 'City') {
        getWeatherDataByCity(city, unit);
    }
});

function getWeatherDataByCity(city, unit) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${ApiKey}&units=${unit}`)
        .then(response => response.json())
        .then(data => {
            if (data.cod === 200) {
                updateWeatherData(data, unit);
            } else {
                alert('City not found');
            }
        })
        .catch(error => console.error('Error fetching the weather data', error));
}

function updateWeatherData(data, unit) {
    const unitSymbol = unit === 'metric' ? 'C°' : 'F°';
    document.getElementById('city').textContent = data.name;
    document.getElementById('temp').textContent = data.main.temp;
    document.getElementById('city-second').textContent = data.name;
    document.getElementById('temp-second').textContent = data.main.temp;
    document.getElementById('condition').textContent = data.weather[0].description;
    const iconCode = data.weather[0].icon;
    document.getElementById('weather-icon').src = `https://openweathermap.org/img/wn/${iconCode}.png`;
    document.getElementById('temp').textContent = data.main.temp;
    document.getElementById('temp-max').textContent = data.main.temp_max;
    document.getElementById('temp-min').textContent = data.main.temp_min;
    document.getElementById('wind').textContent = data.wind.speed;
    document.getElementById('humidity').textContent = data.main.humidity;
    document.getElementById('dew-point').textContent = data.main.temp;
    document.getElementById('pressure').textContent = data.main.pressure;
    document.getElementById('visibility').textContent = data.visibility;

    const maxTempDay = data.main.temp_max;
    const maxTempNight = data.main.temp_min;

    document.getElementById('temp-day').textContent = maxTempDay;
    document.getElementById('temp-night').textContent = maxTempNight;
    document.getElementById('temp-day').nextSibling.nodeValue = unitSymbol;
    document.getElementById('temp-night').nextSibling.nodeValue = unitSymbol;

    getForecastData(data.coord.lat, data.coord.lon, unit);
    getAdditionalData(data.coord.lat, data.coord.lon, unit);
}


function getForecastData(lat, lon, unit) {
    fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${ApiKey}&units=${unit}`)
        .then(response => response.json())
        .then(data => {
            displayHourlyWeather(data);
            displayDailyWeather(data);
        })
        .catch(error => console.error('Error fetching the forecast data', error));
}

function displayHourlyWeather(data) {
    const hourlyWeatherContainer = document.getElementById('hourly-weather');
    hourlyWeatherContainer.innerHTML = '<h2>Hourly Forecast</h2>';
    for (let i = 0; i < 6; i++) {
        const weather = data.list[i];
        const date = new Date(weather.dt * 1000);
        hourlyWeatherContainer.innerHTML += `
            <div class="weather-item">
                <h3 id="hour">${date.getHours()}:00</h3>
                <p id="temp-hour">${weather.main.temp}°</p>
                <img id="weather-icon-hour" src="https://openweathermap.org/img/wn/${weather.weather[0].icon}.png" alt="Weather Icon">
                <div id="rain">
                <img id="icon-rain" src="./images/rain.png" alt="rain">
                <p>${weather.pop * 100}%</p>
                </div>
            </div>
        `;
    }
}

function displayDailyWeather(data) {
    const dailyWeatherContainer = document.getElementById('daily-weather');
    dailyWeatherContainer.innerHTML = '<h2>Daily Forecast</h2>';
    const dailyData = data.list.filter(weather => weather.dt_txt.includes("12:00:00"));
    for (let i = 0; i < dailyData.length; i++) {
        const weather = dailyData[i];
        const date = new Date(weather.dt * 1000);
        dailyWeatherContainer.innerHTML += `
            <div class="weather-item">
                <h3 id="hour">${date.toLocaleDateString('en-US', { weekday: 'long'})}</h3>
                <p id="temp-hour">${weather.main.temp}°</p>
                <img id="weather-icon-hour"src="https://openweathermap.org/img/wn/${weather.weather[0].icon}.png" alt="Weather Icon">
                <div id="rain">
                <img id="icon-rain" src="./images/rain.png" alt="rain">
                <p>${weather.pop * 100}%</p>
                </div>
            </div>
        `;
    }
}
window.onload = () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;
            const unit = document.getElementById('unit').value;
            getWeatherDataByCoordinates(lat, lon, unit);
        }, error => {
            console.error('Error getting location', error);
            alert('Geolocation is not supported by this browser. Please enter a city manually.');
        });
    } else {
        alert('Geolocation is not supported by this browser. Please enter a city manually.');
    }
}
function getWeatherDataByCoordinates(lat, lon, unit) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${ApiKey}&units=${unit}`)
        .then(response => response.json())
        .then(data => {
            if (data.cod === 200) {
                updateWeatherData(data, unit);
            } else {
                alert('Coordinates not found');
            }
        })
        .catch(error => console.error('Error fetching the weather data', error));
}

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
    }
}

function updateWeatherData(data, unit) {
    const unitSymbol = unit === 'metric' ? 'C°' : 'F°';
    document.getElementById('city').textContent = data.name;
    document.getElementById('temp').textContent = data.main.temp;
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

    getForecastData(data.coord.lat, data.coord.lon, unit);
    getAdditionalData(data.coord.lat, data.coord.lon, unit);
}

function getForecastData(lat, lon, unit) {
    fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${ApiKey}&units=${unit}`)
        .then(response => response.json())
        .then(data => {
            updateForecast(data);
        })
        .catch(error => console.error('Error fetching the forecast data', error));
}

function updateForecast(data, unitSymbol) {
    const forecastList = data.list;
    let maxTempDay = -Infinity;
    let maxTempNight = -Infinity;

    forecastList.forEach(entry => {
        const date = new Date(entry.dt_txt);
        const hour = date.getHours();
    
        if (hour >= 6 && hour < 18) {
            if (entry.main.temp_max > maxTempDay) {
                maxTempDay = entry.main.temp_max;
            }
        } else {
            if (entry.main.temp_max > maxTempNight) {
                maxTempNight = entry.main.temp_max;
            }
        }
    });

    document.getElementById('temp-day').textContent = maxTempDay;
    document.getElementById('temp-night').textContent = maxTempNight;
    document.getElementById('temp-day').nextSibling.nodeValue = unitSymbol;
    document.getElementById('temp-night').nextSibling.nodeValue = unitSymbol;
}

function getAdditionalData(lat, lon, unit) {
    fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly,alerts&appid=${ApiKey}&units=${unit}`)
        .then(response => response.json())
        .then(data => {
            document.getElementById('uv-index').textContent = data.current.uvi;
            document.getElementById('moon-phase').textContent = data.daily[0].moon_phase;
        })
        .catch(error => console.error('Error fetching the additional data', error));
}

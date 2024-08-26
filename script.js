function getWeather() {
    const city = document.getElementById('city-input').value;
    const apiKey = 'ad1999cb1e80244eea92c39073b29f69';
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data.cod === 200) {
                document.getElementById('city-name').innerText = data.name;
                
                // Round the temperature to the nearest integer
                const roundedTemp = Math.round(data.main.temp);
                document.getElementById('temperature').innerText = `${roundedTemp}°C`;
                
                document.getElementById('description').innerText = data.weather[0].description;
                document.getElementById('humidity').innerText = `${data.main.humidity}% Humidity`;
                document.getElementById('wind').innerText = `${data.wind.speed} Km/h Wind Speed`;

                // Update the weather icon dynamically based on weather condition
                const weatherIcon = document.querySelector('.weather-icon i');
                const mainWeather = data.weather[0].main.toLowerCase();

                if (mainWeather.includes("cloud")) {
                    weatherIcon.className = "fas fa-cloud-sun";
                } else if (mainWeather.includes("rain")) {
                    weatherIcon.className = "fas fa-cloud-showers-heavy";
                } else if (mainWeather.includes("clear")) {
                    weatherIcon.className = "fas fa-sun";
                } else {
                    weatherIcon.className = "fas fa-cloud";
                }
            } else {
                alert('City not found!');
            }
        })
        .catch(error => {
            alert('Error fetching weather data!');
            console.error(error);
        });
}

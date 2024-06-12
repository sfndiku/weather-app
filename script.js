const apiKey = '037d969e037a7e9cb81f936860983732';
const apiUrl = 'https://api.openweathermap.org/data/2.5/forecast'
const locationInput = document.getElementById('locationInput');
const searchButton = document.getElementById('searchButton');
const locationElement = document.getElementById('location');
const populationElement = document.getElementById('population');
const temperatureElement = document.getElementById('temperature');
const descriptionElement = document.getElementById('description');


searchButton.addEventListener('click', () => {
    const location = locationInput.value;
    if (location) {
        fetchWeather(location);
    }
});


function fetchWeather(location) {
    const url = `${apiUrl}?q=${location}&appid=${apiKey}`;

    fetch(url)
        .then(res => res.json())
        .then(data => {
            console.log(data);
            locationElement.textContent = data.city.name;
            temperatureElement.textContent = `${(data.list[0].main.temp-273).toFixed(2)}°C`;//since it is in kelvin, -273 And toFixed used to round to2 decimals
            descriptionElement.textContent = data.list[0].weather[0].description;
        })
        .catch(error => {
            console.error('Error fetching weather data:', error);
        });
}
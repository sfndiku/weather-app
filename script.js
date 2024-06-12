const apiKey = '037d969e037a7e9cb81f936860983732';//you must have a unique api key which is mentioned in the readme file
const apiUrl = 'https://api.openweathermap.org/data/2.5/forecast';//read the api docementation to get the correct url if this doesn't work
const locationInput = document.getElementById('locationInput');
const searchButton = document.getElementById('searchButton');
const locationElement = document.getElementById('location');
const populationElement = document.getElementById('population');
const temperatureElement = document.getElementById('temperature');
const descriptionElement = document.getElementById('description');
//the above 6 const lines for getting and putting data on the webpage

searchButton.addEventListener('click', () => {
    const location = locationInput.value;
    fetchWeather(location);
});//this event listener listens when a user click the button

locationInput.addEventListener("keypress",(event) => {
    if(event.key === "Enter"){
        const location = locationInput.value;
        fetchWeather(location);
    }
});//this event listener automatically recognises when a user presses "enter" and gives required results


function fetchWeather(location) {
    const url = `${apiUrl}?q=${location}&appid=${apiKey}`;
    locationElement.textContent = "";//line to clear data
    temperatureElement.textContent = "";//line to clear data
    descriptionElement.textContent = "";//line to clear data
    temperatureElement.textContent = "Loading...";
    fetch(url)
        .then(res => res.json())
        .then(data => {
            console.log(data);
            locationElement.textContent = data.city.name;
            temperatureElement.textContent = `${(data.list[0].main.temp-273).toFixed(2)}°C`;//temperature is in kelvin,so -273 And toFixed used to round to2 decimals
            descriptionElement.textContent = data.list[0].weather[0].description;
        })
        .catch(error => {
            console.error('Error fetching weather data:', error);
            temperatureElement.textContent = "City not found";
        });
}
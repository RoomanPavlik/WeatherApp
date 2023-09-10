// Define your API key and API endpoint URL
const apiKey = '0297a1b62dd1fb32ff68ae16ab89cc89';
const apiUrl = 'https://api.openweathermap.org/data/2.5/weather';

// Select HTML elements to update with weather data
const locationInput = document.getElementById('location-input');
const searchButton = document.getElementById('search-button');
const weatherIcon = document.getElementById('weather-icon');
const temperature = document.getElementById('temperature');
const description = document.getElementById('description');
console.log("Hello, world!");
// Add an event listener to the search button
searchButton.addEventListener('click', () => {
    const location = locationInput.value;

    // Construct the API URL with the location and API key
    const url = `${apiUrl}?q=${location}&appid=${apiKey}&units=metric`;

    // Make a GET request to the API
    fetch(url)
        .then((response) => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then((data) => {
            // Extract weather data from the API response
            const weather = data.weather[0];
            const temperatureCelsius = data.main.temp;

            // Update the HTML elements with the weather data
            weatherIcon.innerHTML = `<img src="https://openweathermap.org/img/wn/${weather.icon}.png" alt="${weather.description}">`;
            temperature.textContent = `${temperatureCelsius}°C`;
            description.textContent = weather.description;

            // Determine which image to display based on temperature
            let imageUrl;
            if (temperatureCelsius < 15) {
                imageUrl = 'image1.png'; // Image for temperatures below 15°C
            } else if (temperatureCelsius >= 15 && temperatureCelsius <= 25) {
                imageUrl = 'image2.png'; // Image for temperatures between 15°C and 25°C
            } else {
                imageUrl = 'image3.png'; // Image for temperatures above 25°C
            }

            // Clear the image-container before adding the new image
            const imageContainer = document.getElementById('image-container');
            imageContainer.innerHTML = '';

            // Create an image element and add it to the page
            const imageElement = document.createElement('img');
            imageElement.src = imageUrl;
            imageElement.alt = 'Weather Image';
            imageContainer.appendChild(imageElement);
        })
        .catch((error) => {
            console.error('There was a problem with the fetch operation:', error);
        });
});
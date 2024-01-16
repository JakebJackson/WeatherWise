// apiKey that is used for query.
var apiKey = '73f62982a1a8b5e56dcd92695b5033a1';
// jQuery selectors for relevant HTML elements.
var searchBtn = $('#city-search');
var cityName = $('#selected-city');
var forecastDiv = $('#forecast-div');
// Global variables/arrays/objects.
var daySelect = 0;
var forecastData = [];
var currentDayData= {};


function handleAPIQuery() {
    // Prevents refresh on button click.
    event.preventDefault();

    // Gets the value that will be used in the fetch url
    var city = searchBtn.val();
    var queryURL = 'https://api.openweathermap.org/data/2.5/forecast?q=' + city + ',au&appid=' + apiKey + '&units=metric';

    // Fetch request
    fetch(queryURL, {
        method: 'GET'
    })
    .then(function (response) {
        // Logs response and returns response.json().
        console.log(response);
        return response.json();
    })
    .then(function (data) {
        // Logs data.
        console.log(data);

        // Creating an object to store all of the relevant information within.
        currentDayData = {
            name: data.city.name,
            date: dayjs.unix(data.list[0].dt).format('DD/MM/YYYY'),
            humidity: data.list[0].main.humidity + '%',
            temp: data.list[0].main.temp + 'C',
            wind: data.list[0].wind.speed + 'km/h',
            WeatherDesc: data.list[0].weather[0].description,
            conditions: data.list[0].weather[0].main,
        };

        // Creating an array for the forecast data.
        
        // This variable will be used in the for loop to select the next day.
        console.log(data);
        
        // For loop for generating the information that will be used on the forecast cards.
        for(i = 0; i <= 4; i++) {
            // The intervals for days are incremented by 8 in the returned data.list array, so each iteration of the for loop adds 8 so that I can get day1 , 2 etc.
            forecastData[i] = {
                date: dayjs.unix(data.list[daySelect].dt).format('DD/MM/YYYY'),
                humidity: data.list[daySelect].main.humidity + '%',
                temp: data.list[daySelect].main.temp + 'C',
                wind: data.list[daySelect].wind.speed + 'km/h',
                conditions: data.list[daySelect].weather[0].main,
            };
            // If statement to check if day select is above 40
            if (daySelect !== 40) {
                daySelect = daySelect + 8;
            } else {
                daySelect = 39;
            }
        }

        // Logs forecastData
        console.log(forecastData);
        

        // Logs currentDayData object
        console.log(currentDayData);

        // Calls the display results function.
        handleDisplayResults();

        // Returns all used arrays.
        return currentDayData, forecastData, data;
    });
}

function handleDisplayResults() {
    cityName.text(currentDayData.name + ' (' + currentDayData.date + ')');
    $('#cur-temp').text(currentDayData.temp);
    $('#cur-wind').text(currentDayData.wind);
    $('#cur-humidity').text(currentDayData.humidity);

    forecastDiv.removeClass('d-none');

    // For loop to generate the 5 day forecast cards
    for(i = 1; i <= 5; i++) {
        // Jquery selectors to change the text of the forecast cards.
        $('#date-card' + i).text(forecastData[i - 1].date);
        $('#temp-card' + i).text('Temperature: ' + forecastData[i - 1].temp);
        $('#wind-card' + i).text('Wind: ' + forecastData[i - 1].wind);
        $('#humid-card' + i).text('Humidity: ' + forecastData[i - 1].humidity);
        // If statement checks weather condition and applies the apropriate img.
        if (forecastData[i - 1].conditions == 'clear') {
            // currentCard.children('img')
        }
    };
    handleSaveToLocalStorage();
}

function handleSaveToLocalStorage() {
    localStorage.setItem('storedData' + currentDayData.name, JSON.stringify(currentDayData));
    localStorage.setItem('storedForecastData' + currentDayData.name, JSON.stringify(forecastData));
    // Create a button for the new storage, set the value of the button to currentDayData.name
}

function handleGetFromLocalStorage() {
    currentDayData = JSON.parse(localStorage.getItem('storedData' + $(this).value));
    forecastData = JSON.parse(localStorage.getItem('storedForecastData' + $(this).value));
}
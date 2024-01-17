// apiKey that is used for query.
var apiKey = '73f62982a1a8b5e56dcd92695b5033a1';
// jQuery selectors for relevant HTML elements.
var searchBtn = $('#city-search');
var cityName = $('#selected-city');
var forecastDiv = $('#forecast-div');
// Global variables/arrays/objects.
var daySelect = 0;
var forecastData = [];
var currentDayData = {};

// Checks to see if the user has any previous searches on page load
if (localStorage.getItem('searchList') == null) {
    // If not then creates the searchList object
    var searchList = {};
} else {
    // if so then retrieves the prior searches
    var searchList = JSON.parse(localStorage.getItem('searchList'));

    // Generates buttons based on all of the prior searches until the object runs out of prior searches.
    for (i = 0; i < Object.keys(searchList).length; i++) {
        var oldSearchButton = document.createElement('button');
        oldSearchButton.textContent = searchList[Object.keys(searchList)[i]];
        oldSearchButton.setAttribute('id', searchList[Object.keys(searchList)[i]]);
        oldSearchButton.className = 'btn btn-secondary btn-large p-1 m-1 w-100';
        oldSearchButton.setAttribute('onclick', 'handleGetFromLocalStorage(event)');
        oldSearchButton.setAttribute('value', searchList[Object.keys(searchList)[i]]);
        $('#search-history').prepend(oldSearchButton);
    }
}


function handleAPIQuery() {
    // Prevents refresh on button click.
    event.preventDefault();
    daySelect = 0;
    var countryCode;

    if (document.location.href.includes('#us')) {
        countryCode = ',us';
    } else if (document.location.href.includes('#nz')) {
        countryCode = ',nz';
    } else {
        countryCode = ',au';
    }

    // Gets the value that will be used in the fetch url
    var city = searchBtn.val();
    var queryURL = 'https://api.openweathermap.org/data/2.5/forecast?q=' + city + countryCode + '&appid=' + apiKey + '&units=metric';
    
    // Fetch request
    fetch(queryURL, {
        method: 'GET'
    })
    .then(function (response) {
        // Logs response and returns response.json().
        console.log(response);

        // Checks to see if the query response is ok.
        if (response.status == 404) {
            alert("Error: Not a valid city.");
        } else if (response.status !== 200){
            alert("Error: " + response.status);
        }
        return response.json();
    })
    .then(function (data) {
        // Logs data.
        console.log(data);

        // Creating an object to store all of the relevant information within.
        currentDayData = {
            name: data.city.name,
            date: dayjs.unix(data.list[0].dt).format('dddd, DD/MM/YYYY'),
            humidity: data.list[0].main.humidity + '%',
            temp: data.list[0].main.temp + 'C',
            wind: data.list[0].wind.speed + 'km/h',
            WeatherDesc: data.list[0].weather[0].description,
            conditions: data.list[0].weather[0].main,
        };
        
        // This variable will be used in the for loop to select the next day.
        console.log(data);
        
        // For loop for generating the information that will be used on the forecast cards.
        for(i = 0; i <= 4; i++) {
            // The intervals for days are incremented by 8 in the returned data.list array, so each iteration of the for loop adds 8 so that I can get day1 , 2 etc.
            forecastData[i] = {
                date: dayjs.unix(data.list[daySelect].dt).format('dddd, DD/MM/YYYY'),
                humidity: data.list[daySelect].main.humidity + '%',
                temp: data.list[daySelect].main.temp + 'C',
                wind: data.list[daySelect].wind.speed + 'm/s',
                conditions: data.list[daySelect].weather[0].main,
            };
            // If statement to check if day select is above 40
            if (daySelect !== 40) {
                daySelect = daySelect + 8;
            } else {
                daySelect = 39;
            }
        }

        if(searchList[currentDayData.name] == null) {
            searchList[currentDayData.name] = currentDayData.name;
        }

        // Logs forecastData
        console.log(forecastData);

        // Logs currentDayData object
        console.log(currentDayData);

        // Calls the display results function.
        handleDisplayResults();

        // Returns all used arrays.
        return currentDayData, forecastData, data, searchList;
    });
}

function handleDisplayResults() {
    // Sets text on the page to the relevant information.
    cityName.text(currentDayData.name + ' (' + currentDayData.date + ')');
    $('#cur-temp').text(currentDayData.temp);
    $('#cur-wind').text(currentDayData.wind);
    $('#cur-humidity').text(currentDayData.humidity);

    // Unhides the 5 day forecast div.
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
        // Calls handleSaveToLocalStorage function.
        handleSaveToLocalStorage();
    };
    
}

function handleSaveToLocalStorage() {
    // Saves all of the objects to local storage for later use.
    localStorage.setItem('storedData' + currentDayData.name, JSON.stringify(currentDayData));
    localStorage.setItem('storedForecastData' + currentDayData.name, JSON.stringify(forecastData));
    localStorage.setItem('searchList', JSON.stringify(searchList));
    // Variable that checks if this element with this id already exists.
    var elementExists = document.getElementById(currentDayData.name);
    // if not then runs the handle save to local storage function.
    if (elementExists == null) {
        // Create a button for the prior searches.
        var newButton = document.createElement('button');
        newButton.textContent = currentDayData.name;
        newButton.setAttribute('id', currentDayData.name);
        newButton.className = 'btn btn-secondary btn-large p-1 m-1 w-100';
        newButton.setAttribute('onclick', 'handleGetFromLocalStorage(event)');
        newButton.setAttribute('value', currentDayData.name);
        $('#search-history').prepend(newButton);
    }
}

// Gets items back from localstorage
function handleGetFromLocalStorage(event) {
    var val = event.target.value;
    currentDayData = JSON.parse(localStorage.getItem('storedData' + val));
    forecastData = JSON.parse(localStorage.getItem('storedForecastData' + val));

    // Calls handleDisplayResults function to display the items retrieved from local on the webpage
    handleDisplayResults();
}

// Function to change dropdown text to the selected country.
function changeDropdown(selectedCountry) {

    $('#country-dropdown').text(selectedCountry);
}
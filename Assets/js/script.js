// openweathermap.org for generating api keys to generate info.
// Tailwind for CSS
// Jquery
var apiKey = '618119deb4a6658d9ee905a42da62d94';
var searchButton = $('input[name="search-btn"');

function handleAPIQuery() {
    var city = $('input[name="city-search"').val();
    var queryURL = 'https://api.openweathermap.org/data/2.5/weather?q=' + city + ',au&appid=' + apiKey;

    fetch(queryURL, {
        method: 'GET'
    })
    .then(function (response) {
        console.log(response);
        return response;
    })
    .then(function (data) {
        console.log(data.main);
    });
}

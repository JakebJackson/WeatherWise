// openweathermap.org for generating api keys to generate info.
// Tailwind for CSS
// Jquery
var apiKey = '73f62982a1a8b5e56dcd92695b5033a1';

function handleAPIQuery(event) {
    event.preventdefault();
    
    console.log("button clicked")
    var city = $('input[name="city-search"').val();
    var queryURL = 'https://api.openweathermap.org/data/2.5/weather?q=' + city + ',au&appid=' + apiKey;
    console.log("button clicked, search value:" + city)

    fetch(queryURL, {
        method: 'GET'
    })
    .then(function (response) {
        console.log(response);
        return response;
    })
    .then(function (data) {
        console.log(data);
        var forecastDays = [];
        var fiveDayFilter = new Date(forecast.dt_txt).getDate();
        if (!forecastDays.includes(forecastTime)) {
            return forecastDays.push(forecastTime)
        }
    });
}

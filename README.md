# WeatherWise
A weather dashboard application.

## About this repository
This repository aims to create a weather dashboard application by utilising an external API to get real-time information about a user-specified area and display the returned information back to the user on the webpage.

## Project Aims
* **When the user searches for a city the user is presented with current and future conditions, the search is also added to the search history.**
* **When the user views weather conditions for the selected city they are presented with the city name, current date, an icon of current weather conditions, the temperature, humidity and wind speed.**
* **When the user views future weather conditions for that city they see all of that information for the next 5 days as well.**
* **When the user clicks on a city in the search history the application recalls all of that cities information from the users local storage.**

## Technologies
Throughout this project I used a few APIs to both simplify and expand upon my design scope, firstly I used [jQuery](https://jquery.com) for most of the JavaScript, I also used [Bootstrap](https://getbootstrap.com) for the CSS side of things and lastly the API I used to get the real-time weather data was [OpenWeather](https://openweathermap.org/api).

## Challenges
I really enjoyed making this application however there were some difficulties, the primary challenge I faced was integrating the API I found the fetch command to be quite tempremental at times. Especially when adding in arguments to influence the returned data. Once I got past that though it was more or less smooth sailing besides the part where I forgot to put a # in my jQuery selector when trying to call an ID, I quite literally rewrote the code for the part where I did this 6 different times and wanted to slap myself when I finally realised what was wrong.

## Mock-Up
Below is an image of the deployed application:
![Deployed WeatherWise application](./assets/images/WeatherWise-screenshot.png)

## Deployment
This application has been deployed [here](https://jakebjackson.github.io/WeatherWise/).


let searchBtn = document.getElementById("search");
let cityToSearch = document.getElementById("city-to-search");
let displayCity = document.getElementById("display-city");
let displayTemp = document.getElementById("display-temp");
let displayHumidity = document.getElementById("display-humidity");
let displayUV = document.getElementById("display-UV");
let displayWind = document.getElementById("display-wind");
let day1date = document.getElementById("day1-date");
let day1icon = document.getElementById("day1-icon");
let day1temp = document.getElementById("day1-temp");
let day1wind = document.getElementById("day1-wind");
let day1humidity = document.getElementById("day1-humidity");



searchBtn.addEventListener("click", function() {
    let geoUrl = 'https://api.openweathermap.org/data/2.5/forecast?q='+cityToSearch.value+'&appid=0c3ce50143c8c2fe7bba1d43adafe5c6';
    
    let latitude;
    let longitude;
    
    $.ajax({
        url: geoUrl,
        method: 'GET',
      }).then(function (response) {
          console.log('Ajax Reponse \n-------------');
          console.log(response);
          displayCity.textContent = response.city.name;
          latitude = response.city.coord.lat;
          longitude = response.city.coord.lon;
          let weatherUrl = 'https://api.openweathermap.org/data/2.5/onecall?lat='+latitude+'&lon='+longitude+'&exclude=hourly,minutely&appid=0c3ce50143c8c2fe7bba1d43adafe5c6&units=imperial';
          $.ajax({
            url: weatherUrl,
            method: 'GET',
          }).then(function (response) {
            setCurrentWeather(response);
            setForecast(response);
            console.log('Ajax Reponse \n-------------');
            console.log(response);
          });
        });
      })
      function setCurrentWeather(response) {
        displayTemp.textContent = response.current.temp + " degrees";
        displayHumidity.textContent = response.current.humidity + " %";
        displayWind.textContent = response.current.wind_speed + " mph";
        displayUV.textContent = response.current.uvi + " UV";
      }

function setForecast(response) {
  document.getElementById("forecast").innerHTML = "";
  for (let i = 0; i < 5; i++) {
    
    let card = `<div class="card text-white bg-primary mb-3" style="max-width: 18rem;">
    <div id="day1-date" class="card-header">${moment().add(i + 1, 'days').format("MM/DD/YYYY")}</div>
    <div class="card-body">
        <img src="https://openweathermap.org/img/wn/${response.daily[i].weather[0].icon}.png"></img>
        <p>${response.daily[i].temp.day} °F</p>
        <p>${response.daily[i].wind_speed} Mph</p>
        <p>${response.daily[i].humidity} %</p>
    </div>
  </div>`
    document.getElementById("forecast").innerHTML += card;
  }
 

} 
let searchBtn = document.getElementById("search");
let cityToSearch = document.getElementById("city-to-search");
document.getElementById("display-city");
let displayTemp = document.getElementById("display-temp");
let displayHumidity = document.getElementById("display-humidity");
document.getElementById("display-UV");

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
          latitude = response.city.coord.lat;
          longitude = response.city.coord.lon;
          let weatherUrl = 'https://api.openweathermap.org/data/2.5/onecall?lat='+latitude+'&lon='+longitude+'&exclude=hourly,minutely&appid=0c3ce50143c8c2fe7bba1d43adafe5c6&units=imperial';
          $.ajax({
            url: weatherUrl,
            method: 'GET',
          }).then(function (response) {
            console.log('Ajax Reponse \n-------------');
            console.log(response);
            displayTemp.textContent = response.current.temp;
            displayHumidity.textContent = response.current.humidity;
          });
      });
})



/* Class to receive weather API information (place : Suwon) */

let description, temp, windspeed, id = ""; 

function displayWeather(){
  fill(0);
  textSize(30);
  text("**********************", 10, 45);
  text("Suwon:", 10, 70); 
  text(description, 10, 110); 
  text(temp + " Celsius", 10, 150); 
  text("wind speed : " + windspeed, 10, 190); 
  text("**********************", 10, 225);
  fill(255);
  textSize(40);
  text("Thank You :) ", WIDTH_CANVAS/2 - 100, 750);
}

async function fetchWeather() {

  let r = await fetch('http://api.openweathermap.org/data/2.5/weather?q=Suwon&appid=4ad1fdfd0170170324230abdf051a61a');
  console.log(r.status);
  console.log(r.statusText);

  if (r.status === 200) {
        const data = await r.text();
        console.log(data);
        var jweather = JSON.parse(data);

        windspeed = jweather.wind.speed;
        description = jweather.weather[0].description;
        temp = int(jweather.main.temp - 273.15);
        id = jweather.weather[0].id;
        
    }
    
}

let description, temp, windspeed = ""; 
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
    }
}
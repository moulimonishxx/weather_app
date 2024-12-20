const container = document.querySelector('.container');
const search = document.querySelector('.search-box button');
const weatherbox = document.querySelector('.weather-box');
const weatherDetails = document.querySelector('.weather-details'); // Fixed selector
const error404 = document.querySelector('.not-found');
const cityHide = document.querySelector('.city-hide');
search.addEventListener("click", () => {
  const APIKey = "your_api_key";
  const city = document.querySelector(".search-box input").value;

  if (city === "") return;

  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`
  )
    .then(response => response.json())
    .then(json => {

        if (json.cod === "404") {  // Compare with string "404"
           cityHide.textContent = city;
          container.style.height = '400px';
            weatherbox.classList.remove('active');
            weatherDetails.classList.remove('active');
            error404.classList.add('active');
            return;
        }
        
       
        

      const image = document.querySelector('.weather-box img');
      const temprature = document.querySelector('.weather-box .temprature');
      const description = document.querySelector('.weather-box .description');
      const humidity = document.querySelector('.weather-details .humidity span');
      const wind = document.querySelector('.weather-details .wind span');


      if(cityHide.textContent == city){
        return

      }
      else{
        cityHide.textContent = city;

        container.style.height = '555px';
        container.classList.add('active');

        weatherbox.classList.add('active');
        weatherDetails.classList.add('active');
        error404.classList.remove('active');

        setTimeout(() => {
          container.classList.remove('active');

        },2500);

        switch (json.weather[0].main) {
          case 'Clear':
            image.src = 'images/clear.png';
            break;
          case 'Rain':
            image.src = 'images/rain.png';
            break;
          case 'Snow':
            image.src = 'images/snow.png';
            break;
          case 'Clouds':
            image.src = 'images/cloud.png';
            break;
          case 'Mist':
          case 'Haze':
            image.src = 'images/mist.png';
            break;
          default:
            image.src = 'images/cloud.png';
        }
  
        // Update weather details
        temprature.innerHTML = `${parseInt(json.main.temp)}<span>°C</span>`;
        description.innerHTML = `${json.weather[0].description}`;
        humidity.innerHTML = `${json.main.humidity}%`;
        wind.innerHTML = `${parseInt(json.wind.speed)} Km/h`;
      }

      // Update weather image based on condition
     

      
    })

});

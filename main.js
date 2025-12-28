const container = document.querySelector('.container');
const search = document.querySelector('.search-box button');
const weatherBox = document.querySelector('.weather-box');
const weatherDetails = document.querySelector('.weather-details');
const error404 = document.querySelector('.not-found');

search.addEventListener('click', () => {
  const APIKey = 'cef55ecb3e20edd8ffa83ca61157e620';
  const city = document.querySelector('.search-box input').value;
  let lat;
  let lon;

  if (city === '') {
    return;
  } else
    fetch(
      `https://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=${APIKey}`
    )
      .then((response) => response.json())
      .then((json) => {
        if (json.cod === '404') {
          container.style.height = '404px';
          weatherBox.style.display = 'none';
          weatherDetails.style.display = 'none';
          error404.style.display = 'block';
          error404.classList.add('fadeIn');
          return;
        } else {
          lat = json[0].lat;
          lon = json[0].lon;
          console.log(lat);
          console.log(lon);
        }

        fetch(
          `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&units=metric&appid=${APIKey}`
        )
          .then((response) => response.json())
          .then((json) => {
            if (json.cod === '404') {
              container.style.height = '404px';
              weatherBox.style.display = 'none';
              weatherDetails.style.display = 'none';
              error404.style.display = 'block';
              error404.classList.add('fadeIn');
              return;
            }

            error404.style.display = 'none';
            error404.classList.remove('fadeIn');
            console.log(json);

            const image = document.querySelector('.weather-box img');
            const temperature = document.querySelector(
              '.weather-box .temperature'
            );
            const description = document.querySelector(
              '.weather-box .description'
            );
            const humidity = document.querySelector(
              '.weather-details .humidity span'
            );
            const wind = document.querySelector('.weather-details .wind span');

            switch (json.current.weather[0].main) {
              case 'Clear':
                image.src = 'image_weather/clear.png';
                break;

              case 'Rain':
                image.src = 'image_weather/rain.png';
                break;

              case 'Snow':
                image.src = 'image_weather/snow.png';
                break;

              case 'Clouds':
                image.src = 'image_weather/cloud.png';
                break;

              case 'Haze':
                image.src = 'image_weather/mist.png';
                break;

              default:
                image.src = '';
            }
            temperature.innerHTML = `${parseInt(
              json.current.temp
            )}<span>℃</span>`;
            description.innerHTML = `${json.current.weather[0].description}`;
            humidity.innerHTML = `${json.current.humidity}%`;
            wind.innerHTML = `${parseInt(json.current.wind_speed)}Km/h`;

            weatherBox.style.display = '';
            weatherDetails.style.display = '';
            weatherBox.classList.add('fadeIn');
            weatherDetails.classList.add('fadeIn');
            container.style.height = '590px';
          });
      });
});

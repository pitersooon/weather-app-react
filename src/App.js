import React, { useState, useEffect } from 'react';
import './style.css';

function App() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(false);
  const [containerStyle, setContainerStyle] = useState({});
  const [weatherBoxStyle, setWeatherBoxStyle] = useState({});
  const [weatherDetailsStyle, setWeatherDetailsStyle] = useState({});
  const [notFoundStyle, setNotFoundStyle] = useState({});
  const [notFoundClassList, setNotFoundClassList] = useState('');

  useEffect(() => {
    const APIKey = 'c3f10398b22177ef02a530f42d667ea1';

    if (city === '') {
      setWeather(null);
      setError(false);
      return;
    }

    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`
    )
      .then((response) => response.json())
      .then((json) => {
        if (json.cod === '404') {
          setWeather(null);
          setError(true);
          setContainerStyle({ height: '400px' });
          setWeatherBoxStyle({ display: 'none' });
          setWeatherDetailsStyle({ display: 'none' });
          setNotFoundStyle({ display: 'block' });
          setNotFoundClassList('fadeIn');
          return;
        }
        setNotFoundStyle({ display: 'none' });
        setContainerStyle({ height: '590px' });
        setWeatherBoxStyle({ display: '' });
        setWeatherDetailsStyle({ display: '' });
        setWeather(json);
        setError(false);
      })
      .catch((error) => {
        console.error(error);
        setWeather(null);
        setError(true);
      });
  }, [city]);

  const handleSearch = () => {
    const cityValue = document.querySelector('.search-box input').value;
    setCity(cityValue);
  };

  return (
    <div className="container" style={containerStyle}>
      <div className="search-box">
        <i className="fa-solid fa-location-crosshairs"></i>
        <input type="text" placeholder="Enter your location" />
        <button className="fa-solid fa-magnifying-glass" onClick={handleSearch}></button>
      </div>
      {error && (
        <div className={`not-found ${notFoundClassList}`} style={notFoundStyle}>
          <img 
            src={process.env.PUBLIC_URL + '/images/404.png'}
            alt="Not found"
          />
          <p>Oops! Invalid location :/</p>
        </div>
      )}
      {weather && (
        <div>
          <div className="weather-box fadeIn" style={weatherBoxStyle}>
            <img
              src={
                weather.weather[0].main === 'Clear'
                  ? process.env.PUBLIC_URL + '/images/clear.png' 
                  : weather.weather[0].main === 'Rain'
                  ? process.env.PUBLIC_URL + '/images/rain.png'
                  : weather.weather[0].main === 'Snow'
                  ? process.env.PUBLIC_URL + '/images/snow.png'
                  : weather.weather[0].main === 'Clouds'
                  ? process.env.PUBLIC_URL + '/images/cloud.png'
                  : weather.weather[0].main === 'Haze'
                  ? process.env.PUBLIC_URL + '/images/mist.png'
                  : ''
              }
               alt="Weather icon"
            />
            <div className="temperature">
              {parseInt(weather.main.temp)}
              <span>°C</span>
            </div>
            <div className="description">
              {weather.weather[0].description}
            </div>
          </div>
          <div className="weather-details fadeIn" style={weatherDetailsStyle}>
            <div className="humidity">
              <i className="fas fa-tint"></i>
              <div>
                <span>{weather.main.humidity}%</span>
                <p>Humidity</p>
              </div>
            </div>
            <div className="wind">
              <i className="fas fa-wind"></i>
              <div>
                <span>{parseInt(weather.wind.speed)}Km/h</span>
                <p>Wind Speed</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;

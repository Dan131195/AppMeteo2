/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";

import locationIcon from "../assets/location-icon.png";

// WHEATHER ICON
import clearDay from "../assets/Icons/clear-day.svg";
import clearNight from "../assets/Icons/clear-night.svg";
import cloudy from "../assets/Icons/cloudy.svg";
import fewCloudNight from "../assets/Icons/few-cloud-night.svg";
import fewCloud from "../assets/Icons/few-clouds.svg";
import mist from "../assets/Icons/mist.svg";
import overcast from "../assets/Icons/overcast.svg";
import rain1 from "../assets/Icons/rain1.svg";
import rain2Night from "../assets/Icons/rain2-night.svg";
import rain2 from "../assets/Icons/rain2.svg";
import snow from "../assets/Icons/snow.svg";
import thunderstorm from "../assets/Icons/thunderstorm.svg";

function Homepage({ city }) {
  const [weatherData, setWeatherData] = useState(null);

  // WHEATHER ICON
  const iconMap = {
    "01d": clearDay,
    "01n": clearNight,
    "02d": fewCloud,
    "02n": fewCloudNight,
    "03d": cloudy,
    "03n": cloudy,
    "04d": overcast,
    "04n": overcast,
    "09d": rain1,
    "09n": rain1,
    "10d": rain2,
    "010n": rain2Night,
    "11d": thunderstorm,
    "11n": cloudy,
    "13d": cloudy,
    "13n": cloudy,
    "50d": cloudy,
    "50n": cloudy,
  };

  //API KEY
  const key = "1b1a7d140962ca9867deae37cfeb542e";

  useEffect(() => {
    if (city) {
      fetchWeatherData(city);
    }
  }, [city]);

  const fetchWeatherData = async (cityName) => {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&lang=it&units=metric&appid=${key}`
      );
      const data = await response.json();
      setWeatherData(data);
    } catch (error) {
      console.error("Errore nel recupero dei dati meteo:", error);
    }
  };

  const getIcon = () => {
    if (weatherData && weatherData.weather && weatherData.weather.length > 0) {
      return `https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`;
    }
    return null;
  };

  return (
    <div className="container">
      {weatherData ? (
        <div>
          <div className="currentWeatherContainer container border border-1 rounded-4 p-3 ">
            <div className="d-flex justify-content-between align-items-center">
              <div>
                <p className="fs-4">
                  <img src={locationIcon} />
                  {weatherData.name}{" "}
                  <span className=" fs-6 opacity-75">
                    ({weatherData.sys.country})
                  </span>
                </p>
                <p className="display-1 ps-2">
                  {Math.floor(weatherData.main.temp)}°
                </p>
              </div>

              <img
                src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}
                alt="Weather Icon"
              />
            </div>
            <p className="fs-5 ps-2">
              {/*  Per mettere la maiuscola della prima lettera ⬇️⬇️ */}
              {weatherData.weather[0].description.charAt(0).toUpperCase() +
                weatherData.weather[0].description.slice(1)}
            </p>

            <div className="ps-2 row row-cols-2 row-cols-lg-3">
              <div className="border border-1 border-light"></div>
              <div></div>
              <div></div>
              <div></div>
            </div>
          </div>
        </div>
      ) : (
        <p>Cerca una città per vedere il meteo</p>
      )}
    </div>
  );
}

export default Homepage;

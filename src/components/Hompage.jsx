/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";

import locationIcon from "../assets/location-icon.png";

// WHEATHER ICON
import clearDay from "../assets/svg/clear-day.svg";
import clearNight from "../assets/svg/clear-night.svg";
import cloudy from "../assets/svg/cloudy.svg";
import fewCloudNight from "../assets/svg/few-cloud-night.svg";
import fewCloud from "../assets/svg/few-clouds.svg";
import mist from "../assets/svg/mist.svg";
import overcast from "../assets/svg/overcast.svg";
import rain1 from "../assets/svg/rain1.svg";
import rain2Night from "../assets/svg/rain2-night.svg";
import rain2 from "../assets/svg/rain2.svg";
import snow from "../assets/svg/snow.svg";
import thunderstorm from "../assets/svg/thunderstorm.svg";

import humidityIcon from "../assets/icons/humidity.svg";
import thermometerIcon from "../assets/icons/thermometer.svg";
import visibilityIcon from "../assets/icons/visibility.png";
import windIcon from "../assets/icons/wind.svg";

function Homepage({ city }) {
  const [weatherData, setWeatherData] = useState(null);

  //API KEY
  const key = "1b1a7d140962ca9867deae37cfeb542e";

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
    "11n": thunderstorm,
    "13d": snow,
    "13n": snow,
    "50d": mist,
    "50n": mist,
  };

  const getCustomIcon = (code) => {
    return iconMap[code];
  };

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

  return (
    <div className="container">
      {weatherData ? (
        <div>
          <div className="currentWeatherContainer container border border-1 rounded-4 p-3 ">
            <div className="d-flex justify-content-between align-items-center ">
              <div>
                <p className="fs-3">
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

              {/* Per selezionare le icone personalizzate con la funzione */}
              <img
                src={getCustomIcon(weatherData.weather[0].icon)}
                alt={weatherData.weather[0].description}
                id="weatherIcon"
              />
            </div>

            <p className="fs-5 ps-2 capitalize-first">
              {weatherData.weather[0].description}
              <span className="ps-2">
                {Math.floor(weatherData.main.temp_min)}° /{" "}
                {Math.floor(weatherData.main.temp_max)}°
              </span>
            </p>

            <div className=" row row-cols-2 row-cols-lg-3">
              <div className=" ps-4 pe-2">
                <div className="border border-1 border-light text-center rounded-4 py-2 detailsContainer">
                  <img src={windIcon} alt="Wind Icon" className="hompageIcon" />
                  <p className="m-0 fs-5 fw-bold">
                    {Math.floor(weatherData.wind.speed)} Km/h
                  </p>
                  <p className="detailsTitles m-0 opacity-75">VENTO</p>
                </div>
              </div>

              <div className=" pe-4 ps-2">
                <div className="border border-1 border-light text-center rounded-4 py-2 detailsContainer">
                  <img
                    src={humidityIcon}
                    alt="Humidity Icon"
                    className="hompageIcon"
                  />
                  <p className="m-0 fs-5 fw-bold m-0">
                    {weatherData.main.humidity}%
                  </p>
                  <p className="detailsTitles m-0 opacity-75">UMIDITÀ</p>
                </div>
              </div>

              <div className="py-3 ps-4 pe-2">
                <div className="border border-1 border-light text-center rounded-4 py-2 detailsContainer">
                  <img
                    src={visibilityIcon}
                    alt="Humidity Icon"
                    className="hompageIcon"
                  />
                  <p className="m-0 fs-5 fw-bold m-0">
                    {weatherData.visibility} m
                  </p>
                  <p className="detailsTitles m-0 opacity-75">VISIBILITÀ</p>
                </div>
              </div>

              <div className="py-3 pe-4 ps-2">
                <div className="border border-1 border-light text-center rounded-4 py-2 detailsContainer">
                  <img
                    src={thermometerIcon}
                    alt="Humidity Icon"
                    className="hompageIcon"
                  />
                  <p className="m-0 fs-5 fw-bold m-0">
                    {weatherData.main.pressure} hpA
                  </p>
                  <p className="detailsTitles m-0 opacity-75">PERCEPITA</p>
                </div>
              </div>
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

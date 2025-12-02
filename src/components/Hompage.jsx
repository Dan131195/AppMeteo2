/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState, useRef } from "react";
import locationIcon from "../assets/location-icon.png";

import skyCloudsDay from "../assets/videos/sky_clouds_day.mp4";

// WHEATHER ICON
import WeatherAppIcon from "../assets/meteo-icona.png";
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

function Homepage() {
  const [searchInput, setSearchInput] = useState("");
  const [city, setCity] = useState("Rome,it");
  const [weatherData, setWeatherData] = useState(null);
  const [weatherFiveDays, setWeatherFiveDays] = useState(null);
  const [weatherWeekDays, setWeatherWeekDays] = useState(null);
  const arr = [];

  //API KEY

  const key = import.meta.env.VITE_API_KEY;
  const key2 = import.meta.env.VITE_API_KEY2;

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
    "10n": rain2Night,
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
      fetchWeekDaysWeatherData(city);
      fetchWeatherData(city);
      fetchFiveDaysWeatherData(city);
    }
  }, [city]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchInput.trim()) {
      setCity(searchInput.trim());
      setSearchInput("");
    }
  };

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

  const fetchFiveDaysWeatherData = async (cityName) => {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&lang=it&units=metric&appid=${key}`
      );
      const data = await response.json();
      data.list.slice(0, 10).forEach((item) => {
        arr.push(item);
      });
      setWeatherFiveDays(arr);
      console.log("Five days : " + arr);
    } catch (error) {
      console.error("Errore nel recupero dei dati meteo:", error);
    }
  };

  const fetchWeekDaysWeatherData = async (cityName) => {
    try {
      const response = await fetch(
        `http://api.weatherapi.com/v1/forecast.json?key=${key2}&q=${cityName}&days=6&lang=it`
      );
      const data = await response.json();

      setWeatherWeekDays(data.forecast.forecastday);
      console.log(weatherWeekDays);
    } catch (error) {
      console.error("Errore nel recupero dei dati meteo:", error);
    }
  };

  // Sfondo dinamico autoplay forzato

  const videoRef = useRef(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 0.5;
      videoRef.current.play().catch((err) => {
        console.error("Autoplay bloccato:", err);
      });
    }
  }, []);

  return (
    <div id="weather-app">
      <video id="bg-video" src={skyCloudsDay} ref={videoRef} muted loop></video>
      <div className="content">
        {console.log(weatherFiveDays)}
        <div className="container">
          <nav className="navbar navbar-expand-sm">
            <div className="container-fluid d-flex justify-content-between">
              <p className="navbar-brand m-0 text-light fw-bold">
                <img
                  src={WeatherAppIcon}
                  id="weatherAppIconNavbar"
                  className="me-2 border border-2 rounded-4"
                  alt="Weather App Icon"
                />
                WeatherApp
              </p>
              <button
                className="navbar-toggler py-3"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <span className="my-2">
                  <i className="bi bi-search fw-bold"></i>
                </span>
              </button>
              <div
                className="collapse navbar-collapse"
                id="navbarSupportedContent"
              >
                <form
                  className="d-flex justify-content-center align-items-center justify-content-sm-end w-100 py-2 ms-sm-3"
                  role="search"
                  onSubmit={handleSubmit}
                >
                  <input
                    className="form-control me-2 bg-transparent text-light"
                    type="search"
                    placeholder="Search..."
                    aria-label="Search"
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
                  />
                  <button className="btn" type="submit">
                    <i className="bi bi-search fs-3"></i>
                  </button>
                </form>
              </div>
            </div>
          </nav>

          {weatherData ? (
            <main>
              <div className="container p-3 ">
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

                {/* Meteo 3h x 3h barra orizzontale */}

                <div className="container bg-opacity rounded-4 mb-4">
                  <div className="d-flex m-auto overflow-auto weatherFiveDays">
                    {weatherFiveDays ? (
                      weatherFiveDays.map((a, i) => {
                        // eslint-disable-next-line no-unused-vars
                        const [dateStr, timeStr] = a.dt_txt.split(" ");
                        const time = timeStr.slice(0, 5);

                        return (
                          <div key={i} className="me-3 text-center">
                            <p className="my-1">{time}</p>
                            <p className="m-0">
                              {" "}
                              <img
                                src={getCustomIcon(a.weather[0].icon)}
                                id=""
                              />
                            </p>
                            <p>{Math.floor(a.main.temp)}°</p>
                          </div>
                        );
                      })
                    ) : (
                      <p>Caricamento..</p>
                    )}
                  </div>
                </div>

                {/*Card meteo settimanale (6 giorni)  */}

                <div className="container bg-opacity rounded-4 mb-4 ">
                  <div className=" weatherWeekDays">
                    {weatherWeekDays ? (
                      weatherWeekDays.map((day, i) => {
                        const d = new Date(day.date);

                        const giorno = d.toLocaleDateString("it-IT", {
                          day: "numeric",
                        });
                        const mese = d.toLocaleDateString("it-IT", {
                          month: "short",
                        });
                        const settimana = d.toLocaleDateString("it-IT", {
                          weekday: "short",
                        });

                        return (
                          <div
                            key={i}
                            className="me-3 d-flex align-items-center justify-content-between"
                          >
                            <p className="m-0">
                              {`${giorno} ${mese} ${
                                settimana.charAt(0).toUpperCase() +
                                settimana.slice(1)
                              }`}
                            </p>
                            <img src={day.day.condition.icon} alt="" />
                            <p className="m-0">
                              {Math.round(day.day.mintemp_c)}° /{" "}
                              {Math.round(day.day.maxtemp_c)}°
                            </p>
                          </div>
                        );
                      })
                    ) : (
                      <p>Caricamento previsioni settimanali...</p>
                    )}
                  </div>
                </div>

                {/* CARDS Informazioni aggiuntive */}

                <div className="cardsContainer row row-cols-2 row-cols-lg-3">
                  <div className=" ps-4 pe-2">
                    <div className=" text-center rounded-4 py-2 bg-opacity ">
                      <p className="m-0 fs-5 fw-bold">
                        {Math.floor(weatherData.wind.speed)} Km/h
                      </p>
                      <p className="detailsTitles m-0 opacity-75">VENTO</p>
                    </div>
                  </div>

                  <div className=" pe-4 ps-2">
                    <div className=" text-center rounded-4 py-2 bg-opacity">
                      <p className="m-0 fs-5 fw-bold m-0">
                        {weatherData.main.humidity}%
                      </p>
                      <p className="detailsTitles m-0 opacity-75">UMIDITÀ</p>
                    </div>
                  </div>

                  <div className="py-3 ps-4 pe-2">
                    <div className=" text-center rounded-4 py-2 bg-opacity">
                      <p className="m-0 fs-5 fw-bold m-0">
                        {weatherData.visibility} m
                      </p>
                      <p className="detailsTitles m-0 opacity-75">VISIBILITÀ</p>
                    </div>
                  </div>

                  <div className="py-3 pe-4 ps-2">
                    <div className=" text-center rounded-4 py-2 bg-opacity">
                      <p className="m-0 fs-5 fw-bold m-0">
                        {weatherData.main.pressure} hpA
                      </p>
                      <p className="detailsTitles m-0 opacity-75">PERCEPITA</p>
                    </div>
                  </div>
                </div>
              </div>
            </main>
          ) : (
            <p>Cerca una città per vedere il meteo</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Homepage;

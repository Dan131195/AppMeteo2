/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";

import locationIcon from "../assets/location--icon.png";
// import skyCloudsDay from "../assets/videos/sky_clouds_day.mp4";

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
  const [backgroundUrl, setBackgroundUrl] = useState("");

  const [error, setError] = useState(null);

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

  // WEATHER BACKGROUNDS
  const backgroundMap = {
    "01d":
      "https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?w=1200&auto=format&fit=crop",
    "01n":
      "https://images.unsplash.com/photo-1506318137071-a8e063b4bec0?q=80&w=1920&auto=format&fit=crop",

    "02d":
      "https://images.unsplash.com/photo-1534088568595-a066f410bcda?w=1200&auto=format&fit=crop",
    "02n":
      "https://images.unsplash.com/photo-1534447677768-be436bb09401?q=80&w=1920&auto=format&fit=crop",

    "03d":
      "https://images.unsplash.com/photo-1594156596782-656c93e4d504?w=1200&auto=format&fit=crop",
    "03n":
      "https://images.unsplash.com/photo-1513002749550-c59d786b8e6c?w=1200&auto=format&fit=crop",

    "04d":
      "https://images.unsplash.com/photo-1501630834273-4b5604d2ee31?q=80&w=1920&auto=format&fit=crop",
    "04n":
      "https://images.unsplash.com/photo-1501630834273-4b5604d2ee31?q=80&w=1920&auto=format&fit=crop",

    "09d":
      "https://images.unsplash.com/photo-1515694346937-94d85e41e6f0?q=80&w=1920&auto=format&fit=crop",
    "09n":
      "https://images.unsplash.com/photo-1515694346937-94d85e41e6f0?q=80&w=1920&auto=format&fit=crop",

    "10d":
      "https://images.unsplash.com/photo-1519692933481-e162a57d6721?q=80&w=1920&auto=format&fit=crop",
    "10n":
      "https://images.unsplash.com/photo-1519692933481-e162a57d6721?q=80&w=1920&auto=format&fit=crop",

    "11d":
      "https://images.unsplash.com/photo-1605727216801-e27ce1d0ce49?q=80&w=1920&auto=format&fit=crop",
    "11n":
      "https://images.unsplash.com/photo-1605727216801-e27ce1d0ce49?q=80&w=1920&auto=format&fit=crop",

    "13d":
      "https://images.unsplash.com/photo-1491002052546-bf38f186af56?w=1200&auto=format&fit=crop",
    "13n":
      "https://images.unsplash.com/photo-1491002052546-bf38f186af56?w=1200&auto=format&fit=crop",

    "50d":
      "https://images.unsplash.com/photo-1485236715568-ddc5ee6ca227?q=80&w=1920&auto=format&fit=crop",
    "50n":
      "https://images.unsplash.com/photo-1485236715568-ddc5ee6ca227?q=80&w=1920&auto=format&fit=crop",
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
      setError(null);

      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&lang=it&units=metric&appid=${key}`,
      );
      const data = await response.json();
      console.log(data);

      if (data.cod === "404" || response.status === 404) {
        setError("Città non trovata. Riprova con un altro nome.");
        setWeatherData(null);
        return;
      }

      if (!response.ok) {
        throw new Error("Errore nel recupero dei dati");
      }

      if (data.weather && data.weather[0]) {
        const weatherIconCode = data.weather[0].icon;

        const newBg = backgroundMap[weatherIconCode];
        setBackgroundUrl(newBg);
      }

      setWeatherData(data);
    } catch (error) {
      console.error("Errore nel recupero dei dati meteo:", error);
    }
  };

  const fetchFiveDaysWeatherData = async (cityName) => {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&lang=it&units=metric&appid=${key}`,
      );
      const data = await response.json();
      data.list.slice(0, 10).forEach((item) => {
        arr.push(item);
      });
      setWeatherFiveDays(arr);
    } catch (error) {
      console.error("Errore nel recupero dei dati meteo:", error);
    }
  };

  const fetchWeekDaysWeatherData = async (cityName) => {
    try {
      const response = await fetch(
        `https://api.weatherapi.com/v1/forecast.json?key=${key2}&q=${cityName}&days=6&lang=it`,
      );
      const data = await response.json();

      setWeatherWeekDays(data.forecast.forecastday);
    } catch (error) {
      console.error("Errore nel recupero dei dati meteo:", error);
    }
  };

  // Sfondo dinamico autoplay forzato

  // const videoRef = useRef(null);

  // useEffect(() => {
  //   if (videoRef.current) {
  //     videoRef.current.playbackRate = 0.5;
  //     videoRef.current.play().catch((err) => {
  //       console.error("Autoplay bloccato:", err);
  //     });
  //   }
  // }, []);

  const containerStyle = {
    backgroundImage: backgroundUrl
      ? `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url('${backgroundUrl}')`
      : "none",
    backgroundSize: "cover",
    backgroundPosition: "center",
    transition: "background-image 0.5s ease-in-out",
    minHeight: "100vh", // o l'altezza che serve alla tua app
  };

  return (
    <div style={containerStyle} id="weather-app">
      {/* <video
        id="bg-video"
        className="w-100 opacity-50"
        src={skyCloudsDay}
        ref={videoRef}
        muted
        loop
      ></video> */}
      <div className="content">
        <div>
          <nav className="navbar navbar-expand-lg container">
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
                className="collapse navbar-collapse my-2"
                id="navbarSupportedContent"
              >
                <form
                  className="bg-opacity rounded-4 w-100 d-flex justify-content-center align-items-center  w-100 py-2"
                  role="search"
                  onSubmit={handleSubmit}
                >
                  <input
                    className="form-control bg-transparent text-light"
                    type="search"
                    placeholder="Es. Londra"
                    aria-label="Search"
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
                  />
                  <button className="btn" type="submit">
                    <i className="bi bi-arrow-right-circle fs-3"></i>
                  </button>
                </form>
              </div>
            </div>
          </nav>

          {error && (
            <div
              className="error-banner"
              style={{ color: "red", textAlign: "center", margin: "20px" }}
            >
              <p>{error}</p>
            </div>
          )}

          {weatherData && !error && (
            <main className="text-center">
              <div className="container p-3 ">
                <div className="bg-opacity rounded-4 mb-3">
                  <div className="d-flex justify-content-between align-items-center">
                    <div className="-2">
                      <p className="fs-1 m-0">
                        <img
                          src={locationIcon}
                          className="locationIcon m-0 p-0"
                          alt="Location Icon"
                        />
                        {weatherData.name}{" "}
                        <span className=" fs-6 opacity-75">
                          ({weatherData.sys.country})
                        </span>
                      </p>

                      <p className="display-1 ps-3">
                        {Math.floor(weatherData.main.temp)}°
                      </p>

                      <p className="fs-5 ps-3 pb-2 capitalize-first">
                        {weatherData.weather[0].description}
                        <span className="ps-2">
                          {Math.floor(weatherData.main.temp_min)}° /{" "}
                          {Math.floor(weatherData.main.temp_max)}°
                        </span>
                      </p>
                    </div>

                    {/* Per selezionare le icone personalizzate con la funzione */}
                    <img
                      src={getCustomIcon(weatherData.weather[0].icon)}
                      alt={weatherData.weather[0].description}
                      id="weatherIcon"
                    />
                  </div>
                </div>

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
                                className="iconThreeHours"
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
          )}
        </div>
      </div>
    </div>
  );
}

export default Homepage;

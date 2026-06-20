/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";

import locationIcon from "../assets/icons/location.png";

// WHEATHER ICON
import WeatherAppIcon from "../assets/icons/meteo-icona.png";
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

import locationNotFound from "../assets/img/location-not-found.png";

import visibilityIcon from "../assets/icons/icons-visibility.png";
import humidityIcon from "../assets/icons/icons-humidity.png";
import temperatureIcon from "../assets/icons/icons-temperature.png";
import windIcon from "../assets/icons/icons-wind.png";
import pressureIcon from "../assets/icons/icons-atmospheric-pressure.png";

import cloudyIcon from "../assets/icons/icons-cloudy.png";

function Homepage() {
  const [searchInput, setSearchInput] = useState("");
  const [city, setCity] = useState("Firenze");
  const [weatherData, setWeatherData] = useState(null);
  const [weatherTrheeHours, setWeatherTrheeHours] = useState(null);
  const [weatherWeekDays, setWeatherWeekDays] = useState(null);
  const [backgroundUrl, setBackgroundUrl] = useState("");

  const [error, setError] = useState(false);

  const [sunrise, setSunrise] = useState("--:--");
  const [sunset, setSunset] = useState("--:--");

  const [tempMin, setTempMin] = useState("");
  const [tempMax, setTempMax] = useState("");

  const arr = [];

  //API KEY
  const key = import.meta.env.VITE_OPENWEATHER_API_KEY;

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

  const getMeteoIcon = (wmoCode) => {
    const icone = {
      0: clearDay,
      1: clearDay,
      2: clearDay,
      3: cloudy,
      45: mist,
      48: mist,
      51: rain2,
      53: rain1,
      55: rain1,
      56: rain2,
      57: rain2,
      61: rain2,
      63: rain1,
      65: thunderstorm,
      66: rain2,
      67: rain2,
      71: snow,
      73: snow,
      75: snow,
      77: snow,
      80: rain2,
      81: rain1,
      82: rain1,
      85: snow,
      86: snow,
      95: thunderstorm,
      96: thunderstorm,
      99: thunderstorm,
    };

    return icone[wmoCode];
  };

  // WEATHER BACKGROUNDS
  const backgroundMap = {
    "01d":
      "https://i.pinimg.com/736x/e1/3a/4d/e13a4d737425141353603f7a3edb73cd.jpg",
    "01n":
      "https://images.unsplash.com/photo-1508402476522-c77c2fa4479d?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fG5pZ2h0JTIwc2t5JTIwd2FsbHBhcGVyfGVufDB8fDB8fHww",

    "02d":
      "https://media.baamboozle.com/uploads/images/150883/1657429562_160152.jpeg",
    "02n":
      "https://t4.ftcdn.net/jpg/02/98/13/93/360_F_298139354_B8MchbDhUhOuAfcewRxZ9AUOKV9vsWAt.jpg",

    "03d":
      "https://img.magnific.com/free-photo/dramatic-landscape-view-with-sun-rays-shining-through-dark-cloudy-sky_181624-45676.jpg?semt=ais_hybrid&w=740&q=80",
    "03n":
      "https://images.unsplash.com/photo-1603288967520-f3e04381dc02?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8Y2xvdWR5JTIwbmlnaHR8ZW58MHx8MHx8fDA%3D",

    "04d":
      "https://img.magnific.com/free-photo/dramatic-landscape-view-with-sun-rays-shining-through-dark-cloudy-sky_181624-45676.jpg?semt=ais_hybrid&w=740&q=80",
    "04n":
      "https://images.unsplash.com/photo-1603288967520-f3e04381dc02?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8Y2xvdWR5JTIwbmlnaHR8ZW58MHx8MHx8fDA%3D",

    "09d":
      "https://images.unsplash.com/photo-1515694346937-94d85e41e6f0?w=1200&auto=format&fit=crop",
    "09n":
      "https://images.unsplash.com/photo-1534274988757-a28bf1a57c17?w=1200&auto=format&fit=crop",

    "10d":
      "https://t4.ftcdn.net/jpg/08/78/10/75/360_F_878107548_lSjbkU9U4E3nUWc09xVGVdhFc27Feb9L.jpg",
    "10n":
      "https://img.magnific.com/premium-photo/stunning-photo-black-background-with-heavy-rain-falling-raindrops-hitting-ground-rainy-night-sky_900706-60677.jpg?semt=ais_hybrid&w=740&q=80",

    "11d":
      "https://media.istockphoto.com/id/1098124180/photo/lightning-strike-from-a-thunderstorm.jpg?s=612x612&w=0&k=20&c=cY9qHJWG1AVtcUVWbXFFfeBxb4C7y-SrgK4nC9jU9MA=",
    "11n":
      "https://cloudfront-us-east-1.images.arcpublishing.com/gray/LARRIZM7UFJOZBL27NYSWT73JI.jpg",

    "13d":
      "https://images.unsplash.com/photo-1491002052546-bf38f186af56?w=1200&auto=format&fit=crop",
    "13n":
      "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/1805740/ss_041773b37dc1db16e8776bebfcc300ae0e16a2dd.1920x1080.jpg?t=1636470143",

    "50d":
      "https://images.unsplash.com/photo-1485236715568-ddc5ee6ca227?w=1200&auto=format&fit=crop",
    "50n":
      "https://w0.peakpx.com/wallpaper/428/576/HD-wallpaper-foggy-night-foggy-night-fog-woman-street-lights-weather-people-mood-alone.jpg",

    default:
      "https://img.magnific.com/free-vector/beautiful-dreamy-night-cloudy-sky-background_1017-62567.jpg",
  };

  const getCustomIcon = (code) => {
    return iconMap[code];
  };

  useEffect(() => {
    if (city) {
      fetchWeekDaysWeatherData(city);
      fetchWeatherData(city);
      fetchThreeHoursWeaterData(city);
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

      if (data.cod === "404" || response.status === 404) {
        setError(true);
        setWeatherData(null);
        const newBg = backgroundMap["default"];
        setBackgroundUrl(newBg);
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
      console.log(data);
      setWeatherData(data);
      sunriseSunset(data.sys.sunrise, data.sys.sunset, data.timezone);
    } catch (error) {
      console.error("Errore nel recupero dei dati meteo:", error);
    }
  };

  const fetchThreeHoursWeaterData = async (cityName) => {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&lang=it&units=metric&appid=${key}`,
      );
      const data = await response.json();
      data.list.slice(0, 12).forEach((item) => {
        arr.push(item);
      });
      setWeatherTrheeHours(arr);
      console.log(arr);
    } catch (error) {
      console.error("Errore nel recupero dei dati meteo:", error);
    }
  };

  const fetchWeekDaysWeatherData = async (cityName) => {
    try {
      const city = cityName.split(",")[0];
      const geoResponse = await fetch(
        `https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=1&language=it`,
      );

      const geoData = await geoResponse.json();

      if (!geoData.results || geoData.results.length === 0) {
        throw new Error(`Città "${cityName}" non trovata`);
      }

      const { latitude, longitude } = geoData.results[0];

      const response = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&daily=temperature_2m_max,temperature_2m_min,weather_code&timezone=auto`,
      );
      const weatherData = await response.json();
      console.log(weatherData);

      setTempMin(Math.round(weatherData.daily.temperature_2m_min[0]));
      setTempMax(Math.round(weatherData.daily.temperature_2m_max[0]));

      const forecastday = weatherData.daily.time.map((dataGiorno, index) => {
        return {
          date: dataGiorno,
          day: {
            maxtemp_c: weatherData.daily.temperature_2m_max[index],
            mintemp_c: weatherData.daily.temperature_2m_min[index],
            condition_code: weatherData.daily.weather_code[index],
          },
        };
      });

      setWeatherWeekDays(forecastday);
    } catch (error) {
      console.error("Errore nel recupero dei dati meteo:", error);
    }
  };

  const containerStyle = {
    backgroundImage: backgroundUrl
      ? `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url('${backgroundUrl}')`
      : "none",
    backgroundSize: "cover",
    backgroundPosition: "center",
    transition: "background-image 0.5s ease-in-out",
    minHeight: "100vh",
  };

  const sunriseSunset = (sunriseSec, sunsetSec, timezoneOffset) => {
    if (sunriseSec == null || sunsetSec == null || timezoneOffset == null) {
      return;
    }

    const opzioni = { hour: "2-digit", minute: "2-digit", timeZone: "UTC" };

    const sunriseObj = new Date((sunriseSec + timezoneOffset) * 1000);
    const sunsetObj = new Date((sunsetSec + timezoneOffset) * 1000);

    if (!isNaN(sunriseObj.getTime()) && !isNaN(sunsetObj.getTime())) {
      setSunrise(sunriseObj.toLocaleTimeString("it-IT", opzioni));
      setSunset(sunsetObj.toLocaleTimeString("it-IT", opzioni));
    }
  };

  return (
    <div style={containerStyle} id="weather-app p-0">
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

          {/* Errore caricamento citta  CITTà NON TROVATA */}
          {error && (
            <div
              className="error-banner"
              style={{ color: "red", textAlign: "center", margin: "20px" }}
            >
              <p className=" display-5 text-center fw-bold"> Ops!</p>
              <p className="text-center fw-bold fs-4">
                Qualcosa è andato storto
              </p>
              <img src={locationNotFound} alt="" width={300} />
            </div>
          )}

          {weatherData && !error && (
            <main className="text-center">
              <div className="container p-3 ">
                <div className="bg-opacity rounded-4 mb-3 pt-2">
                  <div className="d-flex justify-content-between align-items-center">
                    <div className="ps-4">
                      <div className="">
                        <p className="fs-1 m-0">
                          <img src={locationIcon} alt="" width={40} />
                          {weatherData.name}{" "}
                          <span className=" fs-6 opacity-75">
                            ({weatherData.sys.country})
                          </span>
                        </p>
                      </div>

                      <p className="display-1 ps-3">
                        {Math.floor(weatherData.main.temp)}°
                      </p>

                      <p className="fs-5 ps-3 mb-0 capitalize-first">
                        {weatherData.weather[0].description}
                      </p>
                      <p className="">
                        {tempMin}° / {tempMax}°
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

                <div className="container bg-opacity rounded-4 mb-4 pt-2 text-center">
                  <div className="d-flex m-auto overflow-auto weatherTrheeHours px-2">
                    {weatherTrheeHours ? (
                      weatherTrheeHours.map((a, i) => {
                        const [dateStr, timeStr] = a.dt_txt.split(" ");
                        const date = a.dt_txt.split(" ")[0].split("-");
                        const time = timeStr.slice(0, 5);

                        return (
                          <div
                            key={i}
                            className="mx-3 text-center d-flex flex-column justify-content-between "
                          >
                            <p className="m-0">{time}</p>
                            <p
                              style={{ fontSize: "0.7em" }}
                            >{`${date[2]}/${date[1]}`}</p>

                            <div className="mb-1">
                              {" "}
                              <img
                                src={getCustomIcon(a.weather[0].icon)}
                                className="iconThreeHours"
                              />
                            </div>
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

                <div className="container bg-opacity rounded-4 mb-4 py-2">
                  <div className=" weatherWeekDays mb-2">
                    {weatherWeekDays ? (
                      weatherWeekDays.slice(1).map((day, i) => {
                        const d = new Date(day.date);

                        const giorno = d.toLocaleDateString("it-IT", {
                          day: "numeric",
                        });
                        const mese = d.toLocaleDateString("it-IT", {
                          month: "short",
                        });

                        return (
                          <div
                            key={i}
                            className=" d-flex align-items-center justify-content-between"
                          >
                            <p className="m-0">{`${giorno} ${mese} `}</p>

                            <img
                              src={getMeteoIcon(day.day.condition_code)}
                              alt="Icona meteo"
                              style={{
                                width: "70px",
                                height: "70px",
                                objectFit: "contain",
                              }}
                            />

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
                  <div className="text-center mb-2">
                    <a
                      href={`https://www.ilmeteo.it/meteo/${city}`}
                      className="bg-opacity text-decoration-none text-light rounded-4 py-2 px-4"
                      id="LinkIlMeteo"
                    >
                      Visualizza dettagli
                    </a>
                  </div>
                </div>

                {/* <div className="container bg-opacity rounded-4 mb-4 ">
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
                </div> */}

                {/* CARDS Informazioni aggiuntive */}

                <div className="cardsContainer row row-cols-2 row-cols-lg-3 g-2">
                  <div className="col">
                    <div className=" text-center rounded-4 bg-opacity h-100 pt-3">
                      <div className="">
                        <img src={windIcon} alt="" width={30} />
                      </div>
                      <p className="m-0 fs-6">
                        {Math.floor(weatherData.wind.speed)} Km/h
                      </p>
                      <p className="detailsTitles opacity-75">VENTO</p>
                    </div>
                  </div>

                  <div className="col">
                    <div className=" text-center rounded-4 bg-opacity h-100 pt-3">
                      <div>
                        <img src={humidityIcon} alt="" width={30} />
                      </div>
                      <p className="m-0 fs-6 ">{weatherData.main.humidity}%</p>
                      <p className="detailsTitles opacity-75">UMIDITÀ</p>
                    </div>
                  </div>

                  <div className="col">
                    <div className=" text-center rounded-4  bg-opacity h-100  pt-3">
                      <div>
                        <img src={visibilityIcon} alt="" width={30} />
                      </div>
                      <p className="m-0 fs-6">{weatherData.visibility} m</p>
                      <p className="detailsTitles opacity-75">VISIBILITÀ</p>
                    </div>
                  </div>

                  <div className="col">
                    <div className=" text-center rounded-4 bg-opacity h-100  pt-3">
                      <div>
                        <img src={pressureIcon} alt="" width={30} />
                      </div>
                      <p className="m-0 fs-6">
                        {weatherData.main.pressure} hpA
                      </p>
                      <p className="detailsTitles opacity-75">PRESSIONE</p>
                    </div>
                  </div>

                  <div className="col">
                    <div className=" text-center rounded-4 bg-opacity h-100  pt-3">
                      <div>
                        <img src={cloudyIcon} alt="" width={30} />
                      </div>
                      <p className="m-0 fs-6">{weatherData.clouds.all} %</p>
                      <p className="detailsTitles opacity-75">NUVOLOSITÀ</p>
                    </div>
                  </div>

                  <div className="col">
                    <div className=" text-center rounded-4 bg-opacity h-100  pt-3">
                      <div>
                        <img src={temperatureIcon} alt="" width={30} />
                      </div>
                      <p className="m-0 fs-6">
                        {Math.floor(weatherData.main.feels_like)}°
                      </p>
                      <p className="detailsTitles opacity-75">PERCEPITA</p>
                    </div>
                  </div>
                </div>

                {/* Ciclo solare */}
                <div className="bg-opacity rounded-4 p-3 mt-3">
                  <p className="fw-bold mb-3">Ciclo Solare</p>

                  <div className="d-flex flex-column align-items-center text-light">
                    <svg
                      viewBox="0 0 200 100"
                      width="100%"
                      style={{ maxWidth: "250px", overflow: "visible" }}
                    >
                      <line
                        x1="10"
                        y1="90"
                        x2="190"
                        y2="90"
                        stroke="#888"
                        strokeWidth="2"
                      />

                      <path
                        d="M 20 90 A 80 80 0 0 1 180 90"
                        fill="none"
                        stroke="#ffb803c7"
                        strokeWidth="3"
                        strokeLinecap="round"
                        strokeDasharray="7 7"
                      />

                      <circle cx="100" cy="10" r="8" fill="#FFB703" />
                    </svg>

                    <div
                      className="d-flex justify-content-between w-100 mt-2"
                      style={{ maxWidth: "280px" }}
                    >
                      <div className="text-center">
                        <p className="m-0 ">Alba</p>
                        <p className="m-0 fw-bold">{sunrise}</p>
                      </div>
                      <div className="text-center">
                        <p className="m-0 ">Tramonto</p>
                        <p className="m-0 fw-bold">{sunset}</p>
                      </div>
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
